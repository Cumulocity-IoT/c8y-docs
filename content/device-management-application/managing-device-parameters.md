---
weight: 65
title: Managing parameters
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
---

{{< c8y-admon-related >}}
* [Device management & connectivity > Device integration > Fragment library > Device Parameters](/device-integration/fragment-library-bundle/device-parameter) explains how to integrate devices with this capability.
{{< /c8y-admon-related >}} 


## Introduction to device parameters

Basically every IoT device carries some kind of dynamic state. Typical examples are the On/Off state of electromechanical relays, health indicators, for example the battery level, or the status of the network connection.

In addition, most IoT devices are equipped with some sort of configuration options that control the behavior of the device. Examples here include the control of reporting intervals or domain-specific technical configuration options like Modbus registers.

The **Device Parameters** feature of {{< product-c8y-iot >}} allow one to conveniently monitor, to inspect and to modify such settings, independent of a particular device implementation.

### Viewing and modififying Device Parameters

The **Parameters** tab in the device details shows the list of Device Parameters for a given device. 

![Parameter Tab - List of parameters](/images/users-guide/DeviceManagement/devmgmt-parameters-list.png)

Each entry in this view can be expanded into a detailed view. In this screen, you can see history of operations used to change this parameter. In addition, you also can investigate the parameter event history that show corresponding value changes. In the depicted example, no recent parameter change event has been recorded.

![Parameter Tab - List of parameters](/images/users-guide/DeviceManagement/devmgmt-parameters-detail.png)

If a parameter can be changed from the {{< product-c8y-iot >}} UI, the correspondig *Edit* button allows the user to set a new parameter value. This will result in a corresponding operation towards the device.

## Modeling Device Parameters

In order to manipulate a device state via the Parameters tab the parameter needs to be modeled first as an asset propert in the [Digital Twin Manager (DTM)](/dtm/) application. This happens in the **Property Libary** of DTM.

![DTM - Property Libary with Parameters](/images/users-guide/DeviceManagement/devmgmt-paramters-dtm-properties-library-new.png)

The screen above depicts the property libary with the three example parameters from before.

To model a device parameter, open the **Property Library** of *DTM* and create a new assert property.

- To create a device parameter that can only be inspected from the UI, set "Applicable To" (Context) to "asset" and "event".
- To create device parameter that can be changed using operations, set "Applicable To" (Context) to "asset"," "event" and "operation".

