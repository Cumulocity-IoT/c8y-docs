---
weight: 10
layout: redirect
title: Overview
---

The MQTT Service works together with the Messaging Service to quickly and securely integrate MQTT devices with the {{< product-c8y-iot >}} platform.
Devices that already understand the {{< product-c8y-iot >}} domain model can use the [Core MQTT](/device-integration/mqtt/) protocols (SmartREST and JSON-over-MQTT) to communicate directly with {{< product-c8y-iot >}}.
Alternatively, devices can send and receive messages with arbitrary payloads on arbitrary MQTT topics.
For these so-called _generic_ devices, a _mapping_ must be provided by the tenant to convert between the device message format and the {{< product-c8y-iot >}} domain model.
A mapping can be implemented by a microservice running inside the platform, or by an external client application.

_IoT device integration_ is the main intended use case for the MQTT Service.
The design of the service is optimized for this use case, which has some highly asymmetric properties:
* A large number (up to tens of millions) of simultaneously connected devices publishing messages into the IoT platform
* A large number (up to tens of millions) of unique MQTT topics
* A high aggregate throughput (up to millions per second) of unique messages published into the IoT platform
* A small number of high-throughput message consumers within the IoT platform
* Individual devices have a smaller message throughput (up to hundreds per second)
* Smaller aggregate message throughput from the IoT platform to devices (up to thousands per second)
* No direct peer-to-peer device communication
* Endpoint security for widely distributed devices can be challenging

Other, more symmetric _server-to-server_ or _application integration_ use cases may exceed the [limits](/service-terms/quotas/#mqtt-service) enforced by the MQTT Service.
For optimal performance, these use cases should be implemented using a more traditional publish/subscribe architecture with direct connections to the Messaging Service.

### Key features {#key-features}

#### Protocols and clients {#protocols-clients}

|                                             |                                                                                                                      |
|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Connection protocols                        | TCP only.                                                                                                            |
| MQTT protocol versions                      | 3.1, 3.11 and 5.0. See [MQTT protocol implementation](#implementation) for more details.                             |
| Generic MQTT device protocols               | MQTT devices can publish and subscribe arbitrary payloads on arbitrary MQTT topics.                                  |
| {{< product-c8y-iot >}} Core MQTT protocols | SmartREST 1.0, SmartREST 2.0, JSON-over-MQTT are supported.<sup>(1)</sup>                                            |
| Apache Pulsar                               | Microservices and external clients [connect directly to the Messaging Service](#pulsar-client) to map between device protocols and the {{< product-c8y-iot >}} domain model.<sup>(2)</sup> |
| Thin Edge                                   | Out of the box support in [Thin Edge](https://thin-edge.io/) for generic and Core MQTT protocols on the same device. |

Notes:
1. Core MQTT protocol support is in preview and should be considered experimental.
2. Client applications are also responsible for registering devices as {{< product-c8y-iot >}} Managed Objects if required.
<br><br>

#### Security and isolation {#security-isolation}

|                    |                                                                                                                                     |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Multi tenancy      | MQTT devices from multiple tenants connect to the same endpoint. Each tenant's connections, topics and messages are fully isolated. |
| Device isolation   | MQTT devices within a tenant cannot communicate directly with each other. Each device effectively has its own private topic space.  |
| Client access      | Microservices and external applications connecting to the Messaging Service have access to all topics and messages within a tenant. |
| Bi-directional TLS | Certificate trust anchors are managed within {{< product-c8y-iot >}}. Certificates are tightly bound to individual MQTT devices.    |

#### Performance and scaling {#performance-scaling}

|                    |                                                                                                                                                     |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Horizontal scaling | The MQTT Service can be scaled independently from the {{< product-c8y-iot >}} core.                                                                 |
| Benchmark results  | TBC                                                                                                                                                 |
| Limits and quotas  | Per-tenant and per-client [limits and quotas](/service-terms/quotas/#mqtt-service) ensure service stability and prevent "noisy neighbour" problems. |


### Architecture {#architecture}

The diagram below illustrates the MQTT Service data flows within a tenant.

<p align="center" width="100%">
    <img width="80%" src="/images/mqtt-service/mqtt-service-architecture.svg" alt="MQTT Service architecture">
</p>

All messages published by MQTT devices are forwarded to the Messaging Service, where they are persisted until they are consumed.
{{< product-c8y-iot >}} domain model messages published to the MQTT topics used by the Core MQTT protocols are consumed directly by the {{< product-c8y-iot >}} core.
Messages published to other MQTT topics are consumed by microservices and/or external clients that are responsible for mapping the messages to the {{< product-c8y-iot >}} domain model.
Similarly, the {{< product-c8y-iot >}} core and clients can publish messages to the Messaging Service that will be consumed by the MQTT Service and forwarded to devices.

_Device isolation_ means there is no interaction between topics with the same name used by different clients.
Effectively, every device has its own private topic space that can only be accessed by that device.
This can be seen in the diagram where _device 1_ and _device N_ are both publishing and subscribing on _topic A_.
Because devices are isolated, _device 1_ cannot see any of the messages published by _device N_, and vice-versa.
However, a microservice or external application client has full access to the topics used by all devices, and can forward messages between clients if required.
