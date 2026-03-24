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

The documentation describes the expected state of the MQTT Service when it becomes Generally Available.
Some behaviour may not yet be exactly as described in the documentation.
{{< /c8y-admon-preview >}}

{{< c8y-admon-req >}}
To use the MQTT Service your tenant must be subscribed to the `Mqtt-service` microservice.
This may have been done automatically, depending on how your {{< product-c8y-iot >}} environment was configured.
To check the subscription, open the Administration application and navigate to **Ecosystem** > **Microservices**.
If you do not see the `Mqtt-service` microservice listed, contact [product support](/additional-resources/contacting-support/) (for public environments) or your {{< product-c8y-iot >}} administrator (for dedicated environments) to request the subscription for your tenant.
{{< /c8y-admon-req >}}

The MQTT Service provides a single, unified endpoint for integrating MQTT devices with the {{< product-c8y-iot >}} platform.
It is not a general-purpose MQTT broker.
It is optimized for scenarios where there are a large number of connected devices, and a high aggregate throughput of messages from devices into the platform.

This documentation is aimed at developers who want to integrate MQTT devices with {{< product-c8y-iot >}}, or to build clients that communicate with their devices.
It does not describe the basics of MQTT communication.
If you are unfamiliar with MQTT, there are numerous introductions available, starting with the <a href="https://mqtt.org/mqtt-specification/" target="_blank" rel="noopener noreferrer">MQTT website</a>.
