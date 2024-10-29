---
weight: 20
title: Data connectors
layout: bundle
sector:
  - platform_administration
helpcontent:
  - label: data-connectors
    title: Data connector
    content: "The **Data connectors** page shows a list of all currently defined data connectors with their status. A data connector describes the subset of the data that you would like to send to a destination tenant as well as the URL of that destination tenant. To add a data connector, click **Add data connector** at the top right."
---


A data connector describes the subset of the data that you would like to send to a destination tenant as well as the URL of that destination tenant.


### To view data connectors {#to-view-data-connectors}

Click **Data connectors** in the navigator to see a list of all currently defined data connectors with their status.

![Data broker connectors list](/images/users-guide/enterprise-tenant/et-data-broker-connector-list.png)

For each data connector, the following information is provided:

* The data connector's name
* Its destination tenant
* Description if provided, "None" displayed otherwise
* The status of the connector
* The number of filters set for the data connector

Use the toggle to enable and disable data forwarding to the destination tenant. If data is being forwarded, the toggle reads "Active". If data is not being forwarded, the toggle reads "Suspended" or "Pending". "Suspended" means that you have disabled forwarding. "Pending" means that the destination tenant has disabled forwarding.

{{< c8y-admon-info >}}
If the source tenant has been suspended all its data broker connectors will be suspended as well.
{{< /c8y-admon-info >}}

### To add a data connector {#to-add-a-data-connector}

1. Click **Add data connector** in the top menu bar.
2. In the **Settings** tab, provide the following information to create a new data connector:

   <table>
   <col width = 150>
   <thead>
   <tr>
   <th style="text-align:left">Field</th>
   <th style="text-align:left">Description</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td style="text-align:left">Title</td>
   <td style="text-align:left">The name of the data connector.</td>
   </tr>
   <tr>
   <td style="text-align:left">Target URL for data connector</td>
   <td style="text-align:left">The URL of the tenant to which data will be forwarded. Once saved, you cannot edit this value anymore.</td>
   </tr>
   <tr>
   <td style="text-align:left">Description</td>
   <td style="text-align:left">A textual description of the configuration. Both the name and the description will be visible on the destination side after accepting the subscription.</td>
   </tr>
   <tr>
   <td style="text-align:left">Data filters</td>
   <td style="text-align:left">A set of filters that define what is copied to the destination. You must configure at least one filter.</td>
   </tr>
   </tbody>
   </table>





3. Click **Add filter** to configure a new filter.

	![Data broker configure filter](/images/users-guide/enterprise-tenant/et-data-broker-connector-filter.png)

4. Each data filter contains the following information:

   <table>
	 <col width = 150>
	 <thead>
	 <tr>
	 <th style="text-align:left">Field</th>
	 <th style="text-align:left">Description</th>
	 </tr>
	 </thead>
	 <tbody>
	 <tr>
	 <td style="text-align:left">Group or device</td>
	 <td style="text-align:left">The group or device that is forwarded. If you select a group here all subgroups and subdevices of this group will be forwarded. <b>See the warning below on the usage of All objects.</b> </td>
	 </tr>
	 <tr>
	 <td style="text-align:left">API</td>
	 <td style="text-align:left">The type of data being forwarded (alarms, events, measurements, managed objects) or being received (operations).</td>
	 </tr>
	 <tr>
	 <td style="text-align:left">Fragments to filter</td>
	 <td style="text-align:left">The fragments that must be present in a device to be forwarded.</td>
	 </tr>
	 <tr>
	 <td style="text-align:left">Fragments to copy</td>
	 <td style="text-align:left">The fragments that are copied to the destination. If nothing is specified here, only standard properties of managed objects, alarms, events and measurements are forwarded (see below). Select <strong>Copy all fragments</strong> to forward the entire object.</td>
	 </tr>
	 <tr>
	 <td style="text-align:left">Type filter</td>
	 <td style="text-align:left">Forwarded data must have this value in its "type" property.</td>
	 </tr>
	 </tbody>
	 </table>

5. Click **Save** to save the configuration.

{{< c8y-admon-important >}}
The option **All Objects** is left in the UI to ensure backward compatibility with older versions. We intend to deprecate it and we strongly recommend to not use this option.
<br><br>
When selected, {{< product-c8y-iot >}} will synchronize all types of objects, system as well as user-defined, and might override, or create out of context, objects in the destination tenant. Such objects may contain references to other objects and also configuration information. It is the user's responsibility to check and ensure consistency of such information in the transferred objects in the target environment.
<br><br>
This concerns items such as SmartREST templates, device protocols, smart rule configurations and dashboards.
<br><br>
For example, when you create a smart rule on the source tenant and you synchronize all objects, then the data broker creates a smart rule managed object on the destination tenant. The rule itself is not copied, because a synchronized smart rule would perform the same action on the same device for the same configuration. That would create duplicate emails for the same recipients when an alarm occurs.
{{< /c8y-admon-important >}}


If the **Group or device** field is filled in, the entire descendant structure of the inventory is forwarded to the destination as soon as the connector stays active. if the **Group or device** field is empty or set to  "all" the descendant structure of the inventory is not forwarded; in this case the filter works in "lazy" mode, meaning it forwards the device or asset along with its first event/measurement/alarm.

If operation API is checked in filters, operations created in the target tenant will be forwarded to the source tenant. This applies only to operations that meet the following conditions:

* The operation's device itself is a result of forwarding data.
* The operation matches other filter criteria.

Updates of the operation status coming from the source tenant will be forwarded to the destination tenant.

The heading of a data filter summarizes the configuration in one line. The standard properties that are copied by default are:

* **For created alarms**: type, text, time, severity, status
* **For updated alarms**: status, text, severity
* **For created events**: type, text, time
* **For created measurements**: type, text, time
* **For created and updated devices**: type, name, c8y&#95;IsBinary, c8y&#95;IsDeviceGroup, c8y&#95;IsDevice, c8y&#95;DeviceGroup, c8y&#95;DeviceSubgroup, c8y&#95;SmartRule, c8y&#95;DynamicGroup, c8y&#95;DeviceQueryString
* **For updated operations**: status

After saving the configuration, you will see a security code displayed below your configuration. The security code prevents unintended forwarding of data. You must communicate this security key separately to an administrative user of the destination tenant. You can click the copy icon next to the security code to copy the code to your clipboard.

### To edit a data connector {#to-edit-a-data-connector}

Click the connector title, or click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of a data connector entry and then click **Edit**.

In the **Settings** tab, edit the data connector configuration.

See [To add a data connector](#to-add-a-data-connector) for details on the settings.

### To duplicate a data connector {#to-duplicate-a-data-connector}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of a data connector entry and then click **Duplicate** to create another data connector with the same configuration.

### To delete a data connector {#to-delete-a-data-connector}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of a data connector entry and then click **Delete** to stop data forwarding and delete the data connector.

{{< c8y-admon-info >}}
A data connector can also be deleted from the **Settings** tab of a connector configuration.
{{< /c8y-admon-info >}}

### To view alarms for a data connector {#to-view-alarms-for-a-data-connector}

Open a data connector and switch to the **Alarms** tab to display current alarms for the data connector.

For details on data broker alarms, see [Troubleshooting](#data-broker-troubleshooting).

For details on alarms in general, see [Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms).
