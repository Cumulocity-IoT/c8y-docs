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

* Cloud Fieldbus functionality to collect data from fieldbus devices and remotely manage them. For example, Modbus protocol. With the release of {{< product-c8y-iot >}} Edge version {{< c8y-edge-current-version-alt >}}, we are announcing the deprecation of the {{< company-c8y >}} Linux Agent included in the {{< product-c8y-iot >}} Edge offering. For further details see the **Deprecation of {{< company-c8y >}} Linux Agent in {{< product-c8y-iot >}} Edge** section in the [{{< c8y-edge-current-version-alt >}} release notes](https://cumulocity.com/docs/2024/change-logs/?component=.component-edge-appliance-vm).

{{< c8y-admon-info >}}
Currently, only OPC UA protocols are supported.
{{< /c8y-admon-info >}}
