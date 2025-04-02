---
weight: 40
title: Child devices
layout: bundle
sector: 
  - device_management
---

The **Child Devices** tab shows a list of all child devices. It will be available only if the device has any child devices assigned to it.

### Assign child device to parent device {#assign-child-device-to-parent-device}

In order to link a device the parent device must post to its inventory API the following request containing the ID of the child device.

```http
POST /inventory/managedObjects/<deviceId>/childDevices
```
```json
{
   "managedObject": {
      "id": "28067400"
   }
}
```

|Field|DataType|Mandatory|Details|
|----|----|----|----|
|managedObject.id|string|Yes|ID of the child device to link|


**SmartREST example**

To add a child device to an existing device you must connect the connected device and call the child create template:

`101,uniqueChildId,myChildDevice,myChildType`

The child create template includes a Boolean device marker parameter, which turns the child device into a device by adding the `c8y_IsDevice` fragment. As a result, all aspects of devices are also applicable to child devices. This enables the querying and filtering of child devices. Moreover, child devices are also shown in the device lists (such as the **All devices** list, and in groups and during the creation of bulk operations). 

If the device marker parameter is not provided, the `c8y_IsDevice` fragment is added by default. 

Examples of the device marker parameter in use:

`101,uniqueChildId,myChildDevice,myChildType,true` - `c8y_IsDevice` fragment is added to the child device

`101,uniqueChildId,myChildDevice,myChildType,false` - `c8y_IsDevice` fragment is not added to the child device

`101,uniqueChildId,myChildDevice,myChildType` - Default behaviour. `c8y_IsDevice` fragment is added to the child device

`101,uniqueChildId,myChildDevice,myChildType,marker_fragment` - If anything else than true or false is provided, `c8y_IsDevice` fragment is added to the child device

### Operating a gateway for child devices {#operating-a-gateway-for-child-devices}
Using the agent marker fragment ```com_cumulocity_model_Agent``` on the parent device but not on child devices effectively declares the device as a connected gateway for its children. The children are not directly connected to {{< product-c8y-iot >}} but send and receive data through the device and its integration.

In this case operations for the child devices are delivered to the connected parent device. The parent device then must determine the addressed child device based on the included device ID or other information. Then the command must be forwarded to the correct child.

The built-in static SmartREST response templates of {{< product-c8y-iot >}} always include a device identifier as first parameter to determine the targeted child device. Here is an example of the 510 static response template for the ```c8y_Restart``` operation with the device identifier highlighted.

`510,DeviceSerial`

Custom response templates also contain the targeted device's external ID as first parameter. We recommend you to implement a similar mechanism there as well.
