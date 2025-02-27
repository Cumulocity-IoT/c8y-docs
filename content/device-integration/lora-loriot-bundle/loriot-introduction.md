---
weight: 10
title: Introduction
layout: redirect
---

{{< product-c8y-iot >}} can interface with LORIOT Network Server through the Loriot agent microservice. You can:

* Register the device in two ways:
  - Create a Loriot LNS connection and register the device using {{< product-c8y-iot >}}.
  - Configure the Loriot Agent endpoint via Loriot Network Server and register the device via uplink message. In order to be able to send downlink messages, the devices created using this method must be re-registered via {{< product-c8y-iot >}} to be associated with a connection and device type.  
* Assign a device protocol for the LoRa device for payload processing.
* Decode upstream payload packets using a web-based user interface.
* Post-process raw device data through {{< product-c8y-iot >}} events.
* Make use of existing {{< product-c8y-iot >}} features with LoRa devices, for example: connectivity monitoring, device management, data visualization with dashboards, real-time analytics and more.

The following illustration gives an overview of the {{< product-c8y-iot >}} Loriot LoRa integration.

![{{< product-c8y-iot >}} Loriot LoRa integration](/images/device-protocols/lora-loriot/loriot-cumulocity-integration.png)


{{< c8y-admon-info >}}
Your subscription must include this feature to be able to use it. If you do not see the functionality described in this document please contact [product support](/additional-resources/contacting-support/).
{{< /c8y-admon-info >}}
