---
weight: 10
title: Using the data broker
layout: bundle
sector:
  - platform_administration
helpcontent:
  - label: data-broker
    title: Data broker
    content: "The data broker lets you share data selectively with other tenants such as devices (and more generically, managed objects), events, alarms, measurements, or operations."
---

The data broker lets you share data selectively with other tenants. You can share:

- Devices (and more generically, managed objects)
- Events
- Alarms
- Measurements
- Operations

{{< c8y-admon-req >}}
To be able to use this feature, your tenant must be subscribed to the application “feature-broker”.
{{< /c8y-admon-req >}}

Navigate to **Data connectors** in the **Data broker** menu if you would like to send data to another tenant. Navigate to **Data subscriptions**, if you would like to receive data from another tenant.

{{< c8y-admon-important >}}
Devices that are forwarded using the data broker are charged like normal devices in the destination tenant.
{{< /c8y-admon-important >}}

### Limitations {#limitations}

Be aware of the following limitations of the data broker:

* Cloud Remote Access cannot be used on the destination tenant.
* The {{< management-tenant >}} cannot be used as data broker source tenant.
* Currently, the Fieldbus widget does not work on tenants that receive the fieldbus devices through data broker, as the corresponding data models are not synchronized.
* Event attachments are not forwarded to destination tenants.
* Data broker does not guarantee the same order of messages on destination tenants as it was on the source tenant.
* While we provide backwards compatibility, we cannot ensure that data broker can send data to {{< product-c8y-iot >}} tenants which run on earlier {{< product-c8y-iot >}} versions than the source.
