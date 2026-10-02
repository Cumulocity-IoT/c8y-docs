---
weight: 45
title: Managing device services
layout: bundle
sector:
  - device_management
---

{{< c8y-admon-related >}}
* The [alarms API](https://{{< domain-c8y >}}/api/core/#tag/Alarms) for REST API methods concerning alarms.
* [Device management & connectivity > Device integration > Fragment library > Alarms](/device-integration/fragment-library/#alarms) for details on how to raise and clear alarms.
* The [events API](https://{{< domain-c8y >}}/api/core/#tag/Events) for REST API methods concerning events.
* The [measurements API](https://{{< domain-c8y >}}/api/core/#tag/Measurements) for REST API methods concerning measurements.
* [Device management & connectivity > Device integration > Fragment library > Measurements](/device-integration/fragment-library/#measurements) for details on measurements.
{{< /c8y-admon-related >}}

The Device Management application lets you monitor the data that your devices send about the services they are running.

The [Services](/device-management-application/viewing-device-details/#services) tab on the device details view provides an overview of the services running on a given device and acts as an entry point to the service details view.
There you can see detailed information about the alarms, events, and measurements sent for every service, and use the device functionality that the service supports, such as logs, location, or remote access.

For services that support commands, actions like **Start**, **Stop**, **Restart**, or custom commands appear in the menu of each service. This allows users to quickly send commands without opening the full service details.

![Services list](/images/users-guide/DeviceManagement/devmgmt-services-list.png)

The service details view is divided into tabs. Like on the device details view, the number of tabs is dynamic. A tab is only displayed if the service supports the related functionality. Every service shows at least the **Info**, **Alarms**, **Events**, and **Commands** tabs.

The following tabs are described in detail in separate sections below:
<table>
<thead>
<colgroup>
   <col style="width: 20%;">
   <col style="width: 80%;">
</colgroup>
</thead>
<tr>
<th align="left">Tab</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><a href="#alarms">Alarms</a></td>
<td align="left">Provides information on the alarms for a service. See <a href="/device-management-application/monitoring-and-controlling-devices/#working-with-alarms">Working with alarms</a>. Available for each service.</td>
</tr>
<tr>
<td align="left"><a href="#events">Events</a></td>
<td align="left">Displays events related to a service. Available for each service.</td>
</tr>
<tr>
<td align="left"><a href="#measurements">Measurements</a></td>
<td align="left">Provides a default visualization of numeric data of the service in the form of charts.</td>
</tr>
<tr>
<td align="left"><a href="#service-commands">Commands</a></td>
<td align="left">Allows users to send command actions to a service and view the history of executed commands. Available for each service.</td>
</tr>
</tbody>
</table>

![Service details](/images/users-guide/DeviceManagement/devmgmt-service-details.png)

### Tabs shared with devices {#tabs-shared-with-devices}

The service details view also shows the tabs of the [device details view](/device-management-application/viewing-device-details/) that apply to a service. Each tab appears under the same conditions as on a device. That means, the service must declare the same fragments that a device requires for the tab. For example, the **Location** and **Tracking** tabs require the `c8y_Position` fragment, and the **Shell** tab requires `c8y_Command` in the supported operations of the service.

The following tabs work the same way as on the device details view:

* [Info](/device-management-application/viewing-device-details/#info)
* [Logs](/device-management-application/viewing-device-details/#logs)
* [Shell](/device-management-application/viewing-device-details/#shell)
* [Tracking](/device-management-application/viewing-device-details/#tracking)
* [Location](/device-management-application/viewing-device-details/#location)
* [Network](/device-management-application/viewing-device-details/#network)
* [Software](/device-management-application/viewing-device-details/#software)
* [Firmware](/device-management-application/viewing-device-details/#firmware)
* [Configuration](/device-management-application/viewing-device-details/#configuration)
* [Device profile](/device-management-application/viewing-device-details/#device-profile)
* Diagnostics
* [Remote access](/device-integration/fragment-library/#remote-access)

{{< c8y-admon-info >}}
The following tabs are only available for devices and do not appear on the service details view: **Control**, **Services**, **Child devices**, **Identity**, **Availability**, and tabs that plugins add only for devices, such as **Parameters**. To send operations to a service, use the [Commands](#service-commands) tab.
{{< /c8y-admon-info >}}

### Service commands {#service-commands}

The **Commands** tab allows users to send available service commands and track their execution history. If a service supports commands, they will appear as action buttons in the services list and as selectable options in the service **Commands** tab.

#### Sending commands to services
For a service to support commands, it must include the `c8y_ServiceCommand` fragment in its supported operations.

Supported services may provide specific command actions, such as:
- Start/stop
- Restart
- Custom commands (for example, "Flush cache", "Update", "Reset settings")

If a service does not specify commands, a default set (Start, Stop, Restart) is available.

#### Tracking service command history
The **Commands** tab displays a history of executed commands, including:
- The command type (Start, Stop, and so on).
- The execution status (Pending, Completed, Failed).
- Timestamps for sent and completed actions.

### Alarms {#alarms}

The **Alarms** tab provides information on the alarms of a service.
See [Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms) for detailed information on alarms.
When you click an alarm, its details open within the service details view.

{{< c8y-admon-info >}}
The service details **Alarms** tab displays only alarms which have the particular service as a source. It does not display any alarms sourced by the device itself.
{{< /c8y-admon-info >}}

### Events {#events}

The **Events** tab displays events related to a service.
See [Troubleshooting devices](/device-management-application/monitoring-and-controlling-devices/#troubleshooting-devices) for detailed information.
When you click an event, its details open within the service details view.

{{< c8y-admon-info >}}
The service details **Events** tab displays only events which have the particular service as a source. It does not display any events sourced by the device itself.
{{< /c8y-admon-info >}}

### Measurements {#measurements}

The **Measurements** tab provides a default visualization of numeric data for the service in the form of charts.

{{< c8y-admon-info >}}
The service details **Measurements** tab displays only measurements which have the particular service as a source. It does not display any measurements sourced by the device itself.
{{< /c8y-admon-info >}}

For more information about how to use the **Measurements** tab see [Measurements](/device-management-application/viewing-device-details/#measurements).
