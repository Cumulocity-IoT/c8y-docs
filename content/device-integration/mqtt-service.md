---
weight: 26
title: MQTT Service
layout: bundle
sector:
  - device_management
---

{{< c8y-admon-preview >}}
This feature is in **Public Preview**.
That is, it is not yet generally available and may be subject to change in the future.
{{< /c8y-admon-preview >}}

{{< c8y-admon-req >}}
To use the MQTT Service your tenant must be subscribed to the `Mqtt-service` microservice.
This may have been done automatically, depending on how your {{< product-c8y-iot >}} environment was configured.
To check the subscription, open the Administration application and navigate to **Ecosystem** > **Microservices**.
If you do not see the `Mqtt-service` microservice listed, contact [product support](/additional-resources/contacting-support/) (for public environments) or your {{< product-c8y-iot >}} administrator (for dedicated environments) to request the subscription for your tenant.
{{< /c8y-admon-req >}}

The MQTT Service provides a single, unified endpoint for integrating MQTT devices with the {{< product-c8y-iot >}} platform.
Devices that understand the {{< product-c8y-iot >}} domain model can use the [Core MQTT](/device-integration/mqtt/) protocols (SmartREST and JSON-over-MQTT) to communicate directly with {{< product-c8y-iot >}}.
Alternatively, devices can send and receive messages with arbitrary payloads on arbitrary MQTT topics.
For these _generic_ devices, a _mapping_ must be provided by the tenant to convert between the device message format and the {{< product-c8y-iot >}} domain model.
A mapping can be implemented by a microservice running inside the platform, or by an external client application.

The MQTT Service is not a general-purpose MQTT broker.
Its main use case is integrating IoT devices with the {{< product-c8y-iot >}} platform, and it is optimized for scenarios where there are a large number of connected devices, and a high aggregate throughput of messages from devices into the platform.
The volume of messages from from the platform to devices, for example to trigger device operations, is expected to be much lower.

### Documentation roadmap

This documentation is aimed at developers who want to integrate MQTT devices with {{< product-c8y-iot >}}, or to build clients that communications with their devices.
It does not describe the basics of MQTT communication.
If you are unfamiliar with MQTT, there are numerous introductions available, starting with the <a href="https://mqtt.org/mqtt-specification/" target="_blank">MQTT website</a>.

The documentation is structured as follows:
* [Overview](#overview) presents the high-level architecture and key features of the service
* [MQTT protocol implementation](#implementation) discusses the supported MQTT protocol versions and features
* [Connecting MQTT devices](#devices) shows how to integrate devices with the service, using either the Core MQTT protocols or generic MQTT messaging
* [Connecting microservice and applications](#pulsar-client) explains how to develop clients that communicate with generic MQTT devices

Finally, see [service quotas](/service-terms/quotas/#mqtt-service) for details of the limits and quotas that are enforced by the MQTT Service.

