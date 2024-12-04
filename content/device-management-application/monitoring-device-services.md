---
weight: 45
title: Monitoring device services
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
There you can see detailed information about measurements, events and alarms sent for every service.

![Service details](/images/users-guide/DeviceManagement/devmgmt-service-details.png)

The following tabs make up the service details view, each described in detail in a separate sector:
<table>
<thead>
<colgroup>
   <col style="width: 20%;">
   <col style="width: 80%;">
</colgroup><thead>
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
<td align="left"><a href="#events">Events</a></td>
<td align="left">Displays events related to a service. Available for each service.</td>
</tr>
<tr>
<td align="left"><a href="#measurements">Measurements</a></td>
<td align="left">Provides a default visualization of numeric data of the service in the form of charts.</td>
</tr>
</tbody>
</table>

### Alarms {#alarms}

The **Alarms** tab provides information on the alarms of a service.
See [Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms) for detailed information on alarms.

{{< c8y-admon-info >}}
The service details **Alarms** tab displays only alarms which have the particular service as a source. It does not display any alarms sourced by the device itself.
{{< /c8y-admon-info >}}

### Events {#events}

The **Events** tab displays events related to a service.
See [Troubleshooting devices](/device-management-application/monitoring-and-controlling-devices/#troubleshooting-devices) for detailed information.

{{< c8y-admon-info >}}
The service details **Events** tab displays only events which have the particular service as a source. It does not display any events sourced by the device itself.
{{< /c8y-admon-info >}}

### Measurements {#measurements}

The **Measurements** tab provides a default visualization of numeric data for the service in the form of charts.

{{< c8y-admon-info >}}
The service details **Measurements** tab displays only measurements which have the particular service as a source. It does not display any measurements sourced by the device itself.
{{< /c8y-admon-info >}}

For more information about how to use the **Measurements** tab see [Measurements](/device-management-application/viewing-device-details/#measurements).
