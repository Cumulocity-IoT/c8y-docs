---
weight: 10
title: Introduction
layout: bundle
sector:
  - edge_server
---

Edge uses REST and MQTT as protocols for external communication. Both protocols may be used to interface devices with Edge. For more information, see [Device integration using REST](/device-integration/device-integration-rest/) and [SmartREST 2.0](/smartrest/smartrest-two/).

Additionally, Edge offers:

* OPC UA protocol. OPC UA protocols support through the OPC UA device gateway and OPC UA management service.

* Cloud Fieldbus functionality to collect data from fieldbus devices and remotely manage them. For example, Modbus protocol. With the release of {{< product-c8y-iot >}} Edge version 10.18, we are announcing the deprecation of the {{< product-c8y-iot >}} Linux Agent included in the {{< product-c8y-iot >}} Edge offering. For further details, see the announcement in the [10.18 release notes](https://cumulocity.com/docs/2024/change-logs/?productarea=.productarea-edge#edge-appliance-vm-10-18-0-0-Deprecation-of-cumulocity-linux-agent-included-in-the-cumulocity-edge).

{{< c8y-admon-info >}}
Currently, only OPC UA protocols are supported.
{{< /c8y-admon-info >}}
