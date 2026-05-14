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
{{< c8y-admon-preview-feature >}}
{{< c8y-admon-related >}}
* [Device management & connectivity > Device integration > Fragment library > Device parameters](/device-integration/fragment-library/#device-parameter) explains how to integrate devices with this capability.
{{< /c8y-admon-related >}} 

### Introduction to device parameters {#introduction-to-device-parameters}

Basically every IoT device carries some kind of dynamic state. Typical examples are the On/Off state of electromechanical relays, health indicators, for example the battery level, or the status of the network connection.

In addition, most IoT devices are equipped with some sort of configuration options that control the behavior of the device. Examples here include the control of reporting intervals or domain-specific technical configuration options like Modbus registers.

The **device parameters** feature of {{< product-c8y-iot >}} allows you to monitor, inspect, and modify such settings, independent of a particular device implementation.

### Viewing and modifying device parameters {#viewing-and-modifying-device-parameters}

The **Parameters** tab in the device details shows the list of device parameters for a given device. 

![Parameter Tab - List of parameters](/images/users-guide/DeviceManagement/devmgmt-parameters-list.png)

Each entry in this view can be expanded into a detailed view. This view shows the history of operations used to change this parameter. You can also investigate the parameter event history that shows corresponding value changes. In the depicted example, no recent parameter change event has been recorded.

![Parameter Tab - List of parameters](/images/users-guide/DeviceManagement/devmgmt-parameters-detail.png)

If the parameter itself is defined as editable and the device supports updating its parameters, the corresponding **Edit** action is available in the row actions column and in the parameter details view. Editing a parameter value results in a corresponding operation towards the device.

#### Modeling device parameters {#modeling-device-parameters}

To manipulate a device state via the **Parameters** tab, first model the parameter as an asset property in the **Property Library** of the [Digital Twin Manager (DTM)](/dtm/) application.

![DTM - Property Libary with Parameters](/images/users-guide/DeviceManagement/devmgmt-paramters-dtm-properties-library-new.png)

The image above depicts the property library with the three example parameters from before.

To model a device parameter, open the **Property Library** of DTM and create a new assert property.

- To create a device parameter that can only be inspected from the UI, set **Applicable To** (Context) to "asset" and "event".
- To create device parameter that can be changed using operations, set **Applicable To** (Context) to "asset", "event", and "operation".

{{< /c8y-admon-preview-feature >}}