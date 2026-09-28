---
weight: 90
title: Data reporting
layout: redirect
---

There are three data reporting mechanisms which can be applied to read all mapped browse paths:

- **None** - The gateway will not read values automatically. The mappings will be applied only when manual read operations are performed on mapped nodes.
- **Cyclic Read** - The gateway reads values from mapped nodes at specified interval rates in milliseconds. The minimum allowed rate is 50 milliseconds.
- **Subscription** - The gateway retrieves values by using OPC UA's own subscription mechanism.

![OPC UA device protocol](/images/device-protocols/opcua/opcua-data-reporting-subscription.png)

Possible parameters:

* **Sampling interval** (required) - Defines a time interval individually for each mapped node. This is the rate at which the server checks the data source for changes.
* **Queue size** - The size of the queue where it holds the samples before reporting. If you wish to record samples at a faster rate than reporting interval, you will also need to reserve a longer queue size, to be able to keep all the samples in the server. The reporting interval is defined for the gateway and the value is configurable with the YAML file (see gateway.subscription.reportingRate).
* **Discard** - Select whether to discard the **oldest** or the **newest** item if the samples are exceeding the queue size.
* **Data change trigger**:
	* **Status** - Triggers notification if node's status has changed.
	* **Status/Value** - Triggers notification if node's status or value has changed.
	* **Status/Value/Timestamp** - Triggers notification if node's status, value or timestamp has changed.
* **Deadband filter** - Deadband filter makes notified data values to be filtered.
	* **None** - No filter will be applied. This option is selected by default.
	* **Absolute** - Contains the absolute change in a data value which causes the generation of a notification. This parameter applies only to variables with any number data type.
	* **Percent** - The value is defined as the percentage of the EU range. It applies only to analog items with a valid EU range property. This range is multiplied with the deadband value and is then compared to the actual value change in order to determine the need for a data change notification.

{{< c8y-admon-important >}}
Very low interval rates (for example 50 ms) for cyclic read and subscription types will result in huge amounts of data being created.
{{< /c8y-admon-important >}}

### Applying constraints {#applying-constraints}

Specifying auto-apply constraints allows you to limit the scope in which the device protocols are applied, for example by specifying a set of possible servers or node IDs. If no constraints are set, device protocols are applied at any fitting location on the OPC UA server.

The following constraints can be applied:

- **Limit device protocol to a set of servers** - Limit the device protocols to a particular set of servers. This is useful if you want to have 1 device type for each OPC UA server. Simply click on the dropdown menu and select the desired servers.
- **Limit device protocol scope in the address space** - Limit the scope to servers which have the entered path in their address space.
- **Limit device protocol to servers with a certain fragment** - The device protocol will only be available to the servers which have the entered fragment.
- **Limit device protocol to specific root nodes ID** - A list of "root" node IDs (from which your browsePath is defined) to which the device protocol should be applied. For example, if there is only one server and the device protocol is applied to two node IDs, two child devices of the server will be created. Note that if the device protocol variables do not exist in the root nodes, the device protocol will not be applied to the root node server.

![OPC UA device protocol](/images/device-protocols/opcua/opcua-auto-constraints.png)
