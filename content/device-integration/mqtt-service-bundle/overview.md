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
The design of the service is optimised for this use case, which has some highly asymmetric properties:
* A large number (up to tens of millions) of simultaneously connected devices publishing messages into the IoT platform
* A large number (up to tens of millions) of unique MQTT topics
* A high aggregate throughput (up to millions per second) of unique messages published into the IoT platform
* A small number of high-throughput message consumers within the IoT platform
* Individual devices have a smaller message throughput (up to hundreds per second)
* Smaller aggregate message throughput from the IoT platform to devices (up to thousands per second)
* No direct peer-to-peer device communication
* Ensuring endpoint security for widely distributed devices can be challenging

Other, more symmetric _server-to-server_ or _application integration_ use cases may exceed the [limits](/service-terms/quotas/#mqtt-service) enforced by the MQTT Service.
For optimal performance, these use cases should be implemented using a more traditional publish/subscribe architecture with direct connections to the Messaging Service.

### Key features {#key-features}

#### Protocols and clients {#protocols-clients}

* MQTT v3 and v5 support
  * Durable sessions not currently supported (possible message loss)
* Core MQTT protocol support is still in preview and should be considered experimental
  * No automatic device registration for generic-only devices
* Pulsar
* Supported by Thin Edge

#### Security and isolation {#security-isolation}

* Multi-tenant
* Device isolation on the device side
* Direct Pulsar access on the platform side (tenant isolated!)
* Bi-directional TLS including client certificates

#### Performance and scaling {#performance-scaling}

* Horizontal scaling independently of the core
* Tested with 100M concurrent connections
* Tested with 1M messages/second


### Architecture {#architecture}

The diagram below illustrates the MQTT Service data flows within a tenant.

All messages published by MQTT devices are forwarded to the Messaging Service, where they are persisted until they are consumed.
{{< product-c8y-iot >}} domain model messages published to the MQTT topics used by the Core MQTT protocols are consumed directly by the {{< product-c8y-iot >}} core.
Messages published to other MQTT topics are consumed by microservices and/or external clients that are responsible for mapping the messages to the {{< product-c8y-iot >}} domain model.
Similarly, the {{< product-c8y-iot >}} core and clients can publish messages to the Messaging Service that will be consumed by the MQTT Service and forwarded to devices.

<p align="center" width="100%">
    <img width="80%" src="/images/mqtt-service/mqtt-service-architecture.svg" alt="MQTT Service architecture">
</p>

### MQTT Service compared to Core MQTT {#mqtt-service-vs-cumulocity-iot-mqtt}

The table below presents a basic comparison between the {{< product-c8y-iot >}} Core MQTT functionality and that of the MQTT Service.

|                              | Core MQTT                                               | MQTT Service                                                                        |
|:-----------------------------|:--------------------------------------------------------|:------------------------------------------------------------------------------------|
| QoS                          | 0, 1, 2                                                 | 0, 1                                                                                |
| Clean session                | Starting with clean session is recommended              | Starting with clean session is required                                             |
| Retained flag                | Not supported                                           | Not supported                                                                       |
| Last will                    | Supported                                               | Supported                                                                           |
| MQTT 5.0 features            | Not supported                                           | MQTT 5.0 clients can connect. Partial support for MQTT 5.0 features                 |
| Authentication               | Basic and TLS device certificates                       | Basic and TLS device certificates                                                   |
| Scalability                  | Horizontal                                              | Currently a single instance. Horizontal scaling will be available in the GA release |
| Topic format                 | Determined by the SmartREST 2.0 protocol                | Unrestricted. SmartREST topic names are reserved and cannot currently be used       |
| Payload                      | Determined by the SmartREST 2.0 protocol                | Unrestricted. The maximum message size is 128 KiB including all headers             |
| Extensibility                | Limited by SmartREST 2.0 custom templates               | Streaming Analytics apps or custom mapping microservices can support arbitrary MQTT-based protocols             |
| Message processors/consumers | Built-in message processor for each SmartREST 2.0 topic | Streaming Analytics apps or custom mapping microservices can support multiple processors for a topic            |
| JSON via MQTT                | Limited feature set                                     | Streaming Analytics apps or custom mapping microservices can support arbitrary JSON payloads                    |
