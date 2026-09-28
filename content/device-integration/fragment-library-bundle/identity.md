---
weight: 110
title: Identity
layout: bundle
sector: 
  - device_management
---

The **Identity** tab shows all identities associated with the device. If no identities are available the tab is not shown. Identities map from a unique device identifier (for example, IMEI or SN) to the device’s managed object in {{< product-c8y-iot >}}. This allows the device to find its managed object.

#### REST {#rest}

![REST](/images/reference-guide/rest.png)

#### MQTT (SmartREST 2.0) {#mqtt-smartrest-20}

In the context of MQTT the client ID is used as the device’s external ID. Upon connecting the MQTT client ID is used to automatically associate the connection to a device in the inventory. No additional identity bindings must be created by the device. They are created internally when the 100 and 101 templates are used. All messages to create data are automatically associated with the device context.

Creating a device by a device connected to {{< product-c8y-iot >}}:

`100,createdDeviceName,deviceType`

Creating a child device for a device connected to {{< product-c8y-iot >}}:

`101,uniqueChildId,myChildDevice,myChildType`
