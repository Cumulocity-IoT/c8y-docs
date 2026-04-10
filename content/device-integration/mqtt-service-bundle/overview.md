---
weight: 10
layout: redirect
title: Overview and architecture
---

The MQTT Service works together with the Messaging Service to quickly and securely integrate MQTT devices with the {{< product-c8y-iot >}} platform.
Devices that already understand the {{< product-c8y-iot >}} domain model can use the [Core MQTT](/device-integration/mqtt/) protocols (SmartREST and JSON-over-MQTT) to communicate directly with {{< product-c8y-iot >}}.
Alternatively, devices can send and receive messages with arbitrary payloads on arbitrary MQTT topics.
For these _generic_ devices, the tenant is responsible for converting between the device's protocol and the {{< product-c8y-iot >}} domain model.
This conversion can be implemented in a microservice running inside the platform, or in an external client application.

The MQTT Service should be regarded as an MQTT _endpoint_ rather than a full MQTT _broker_.
It is optimized for the _IoT device integration_ use case, which has some highly asymmetric properties:
* A large number (up to tens of millions) of simultaneously connected devices publishing messages into the {{< product-c8y-iot >}} platform
* A large number (up to tens of millions) of unique MQTT topics
* A high aggregate throughput (up to millions per second) of messages published into the {{< product-c8y-iot >}} platform
* A small number of high-throughput message consumers within the {{< product-c8y-iot >}} platform
* Individual devices have a smaller message throughput (up to hundreds per second)
* Smaller aggregate message throughput from the {{< product-c8y-iot >}} platform to devices (up to thousands per second)
* No direct peer-to-peer device communication
* Devices are geographically distributed, often with limited physical security
* The {{< product-c8y-iot >}} platform is deployed on secure, managed, highly available infrastructure

Other, more symmetric _server-to-server_ or _application integration_ use cases may exceed the [limits](/service-terms/quotas/#mqtt-service) enforced by the MQTT Service.
For optimal performance, these use cases should be implemented using a more traditional publish/subscribe architecture with direct connections to the Messaging Service.

### Key features {#key-features}

#### Protocols and clients {#protocols-clients}

|                                             |                                                                                                                                 |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| Connection protocols                        | TCP only.                                                                                                                       |
| MQTT protocol versions                      | 3.1.1 and 5.0. See [MQTT protocol implementation](#implementation) for more details.                                            |
| Generic MQTT device protocols               | MQTT devices can publish and subscribe arbitrary payloads on arbitrary MQTT topics.                                             |
| {{< product-c8y-iot >}} Core MQTT protocols | **Preview** support for the SmartREST 1.0, SmartREST 2.0 and JSON-over-MQTT protocols. See [Core MQTT device support](#core-mqtt-support) for more details. |
| Apache Pulsar                               | Microservices and external clients [connect directly to the Messaging Service](#pulsar-client) to convert between device protocols and the {{< product-c8y-iot >}} domain model.<br>Messaging Service clients are also responsible for registering devices as {{< product-c8y-iot >}} Managed Objects if required. |
| Thin Edge                                   | Out of the box support in <a href="https://thin-edge.io/" target="_blank" rel="noopener noreferrer">Thin Edge</a> for generic and Core MQTT protocols on the same device. |

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
| Benchmark results  | Validated to scale up to 100 million concurrent device connections, with throughput of 1 million unique messages per second.                        |
| Limits and quotas  | Per-tenant and per-client [limits and quotas](/service-terms/quotas/#mqtt-service) ensure service stability and prevent "noisy neighbour" problems. |


### Architecture {#architecture}

The diagram below illustrates the MQTT Service data flows within a tenant.

All messages published by MQTT devices are forwarded to the Messaging Service, where they are persisted until they are consumed.
{{< product-c8y-iot >}} domain model messages published to the MQTT topics used by the Core MQTT protocols are consumed directly by the {{< product-c8y-iot >}} core.
Messages published to other MQTT topics are consumed by microservices and/or external clients that are responsible for mapping the messages to the {{< product-c8y-iot >}} domain model.
Similarly, the {{< product-c8y-iot >}} core and clients can publish messages to the Messaging Service that will be consumed by the MQTT Service and forwarded to devices.

<p align="center" width="100%">
    <img width="80%" src="/images/mqtt-service/mqtt-service-architecture.svg" alt="MQTT Service architecture">
</p>

#### Device isolation {#device-isolation}

Because of the _device isolation_ feature, there is no interaction between topics with the same name used by different clients.
Effectively, every device has its own private topic space that can only be accessed by that device.
This can be seen in the diagram where _device 1_ and _device N_ are both publishing and subscribing on _topic A_.
Because devices are isolated, _device 1_ cannot see any of the messages published by _device N_, and vice-versa.
However, a microservice or external application client [connecting directly to the Messaging Service](#pulsar-client) has full access to the topics used by all devices, and can forward messages between clients if required.
