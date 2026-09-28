---
weight: 40
title: Working with alarms
layout: redirect
helpcontent:
- label: working-with-alarms
  title: Alarms
  content: "Devices can raise alarms to indicate that there is a problem. You can find an overview of the alarms across all devices here. To check the alarms of a particular device, switch to the **Alarm** tab in the details of the device.


  By default, only unresolved alarms are shown. If you turn on **Show cleared alarms** at the top right, you will see the entire alarm history.


  Alarms are classified according to their severity: CRITICAL, MAJOR, MINOR, WARNING.


  By clicking one of the buttons at the top, the corresponding section will be hidden. Click it once more to make the section visible again. Within each section, the alarms are sorted by their occurrence, displaying the most recent alarm first."
---

Devices can raise alarms to indicate that there is a problem requiring an intervention.

### To view alarms {#to-view-alarms}

{{< product-c8y-iot >}} displays alarms at the level of individual devices and across all devices:

* To check the alarms for all devices, click **Alarms** in the **Overview** menu in the navigator.
* To check the alarms of a particular device, switch to the **Alarms** tab in the details of this device.

![Alarms page](/images/users-guide/DeviceManagement/devmgmt-alarms-view.png)

By default,

* only unresolved alarms are shown. If you turn on **Show cleared alarms** in the **Filter alarms** dropdown menu at the top, you will see the entire alarm history.
* The alarms list is automatically refreshed every 30 seconds. Click **Disable auto-refresh** to stop the alarms list from refreshing automatically.

Alarms are classified according to their severity. {{< product-c8y-iot >}} includes four different alarm types:

|Severity|Description|
|:---|:--|
|CRITICAL|The device is out of service and should be fixed immediately.
|MAJOR|The device has a problem that should be fixed.
|MINOR|The device has a problem that may be fixed.
|WARNING|There is a warning.


In the top menu bar, a **Filter alarms** dropdown list is provided. Select the severities to be shown and then click **Apply**.

{{< c8y-admon-info >}}
The number provided in the filter dropdown refers to the number of active alarms for the given severity, as opposed to the counter provided as blue circle next to an active alarm, which shows the number of times this same alarm has occurred (see also the table below).
{{< /c8y-admon-info >}}

Within the **Alarms list**, the alarms are sorted by their occurrence, displaying the most recent alarm first.

In the **Alarms list**, the following information for an alarm is provided:

<table>
<thead>
<colgroup>
   <col style="width: 20%;">
   <col style="width: 80%;">
</colgroup>
<tr>
<th align="left">Info</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Severity</td>
<td align="left">One of CRITICAL, MAJOR, MINOR, WARNING (see above).</td>
</tr>
<tr>
<td align="left">Count (provided as number in a blue circle) </td>
<td align="left">The number of times this alarm was sent by the device. Only one alarm of a particular type can be active for a certain device. If another alarm of the same type is sent by the device, the number is increased by 1.</td>
</tr>
<tr>
<td align="left">Description</td>
<td align="left">An arbitrary text describing the alarm.</td>
</tr>
<tr>
<td align="left">Status</td>
<td align="left">The status of the alarm. An alarm can be: <br> <strong>Active</strong>: When it was raised and nobody is so far working on the alarm. <br><strong>Acknowledged</strong>: When someone changed the status to "Acknowledged" to indicate that someone is working on the alarm.<br><strong>Cleared</strong>: When either someone manually set the status to "clear" or when the device detected by itself that the problem has gone.</td>
</tr>
<tr>
<td align="left">Last occurrence</td>
<td align="left">Timestamp of the last occurrence of the alarm (device time).</td>
</tr>
<tr>
<td align="left">Device</td>
<td align="left">The name of the device.</td>
</tr>
</tbody>
</table>

To display further details about an alarm, click on the respective alarm in the **Alarms list**.

* **Status**: Provides further information on the alarm status and shows the type of the alarm. The type info is used for duplicating alarms and for configuring the priority of alarms in [Alarm mapping](/standard-tenant/alarm-mapping/).
* **Audit Logs**: Provides the server time when the alarm was created, which may differ from the device time.
* **First Occurrence**: Provides information about when the alarm first occurred.

### To change the status of an alarm {#to-change-the-status-of-an-alarm}

To change the status of an alarm, select the alarm and choose the desired status.
![Alarms status change button](/images/users-guide/DeviceManagement/devmgmt-alarms-status-change-btn.png)
It is also possible to change the status of all alarms to "clear" at once. Click **Clear all** in the top menu bar, to clear all alarms of the selected severities.


### Alarm permissions and inventory roles {#alarm-permissions-and-inventory-roles}

When assigning permissions to inventory roles with a **non-asterisk** value, keep the following in mind:

- These roles apply **only to custom fragments** of alarms (that is, user-defined fields).
- It is **not possible** to specify or control access to **standard alarm schema fields**, such as `status` or `severity`.

Because of this limitation, users with such roles can only update the specified custom fragments. Any attempt to modify standard fields will result in a "Security/Forbidden" error.

#### Acknowledging alarms {#acknowledging-alarms}

Acknowledging or clearing an alarm updates the `status` field, which is part of the standard schema. Therefore, the only way to allow users to perform these actions is to assign an inventory role with an asterisk (`*`) type, which grants access to all fields, including those in the standard schema.
