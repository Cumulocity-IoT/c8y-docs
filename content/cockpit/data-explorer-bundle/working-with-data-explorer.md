---
weight: 10
title: Working with the data explorer
layout: bundle
sector:
  - app_enablement
helpcontent:
  - label: data-explorer
    title: Data explorer
    content: "In the data explorer, data points (measurements or sensor data) can be visualized. On the right, you see a list of available data points. On the left, you see its visualization.


    Click **Add data point** to add more data points to the data explorer. In addition, you can also add alarms or events.


    You can modify the visualization of the data explorer, for example change the time range being shown or aggregate the data being displayed to get an efficient overview over larger time periods.


    The data explorer can be sent as widget to a dashboard or downloaded as CSV or Excel file."
---

### Overview

In the data explorer, data points (measurements or sensor data) can be visualized.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view and select all available data points: READ permission for permission type "Inventory" or READ permission for "Inventory" in the inventory roles
- To visualize already selected data points: READ permission for permission type "Measurements" or READ permission for "Measurements" in the inventory roles
- To send as widget to report/dashboard: ADMIN permission for permission type "Inventory"

Note that data points existing in the data point library are visible by anyone without the need of any permission.
{{< /c8y-admon-req >}}

The data explorer is available for all assets at once or just for a particular asset. To access the data explorer:

- Click **Data explorer** in the navigator to visualize all data points of all assets.

- Navigate to a particular asset and switch to the **Data explorer** tab to visualize all data points of this particular asset and its subassets.

In the data explorer, you see a list of available data points at the right. The first five data points of the selected device or group are shown by default. For details on how to add data points see [To add a data point](#to-add-a-data-point).

On the left, in the main card, you see its visualization.

![Data explorer](/images/users-guide/cockpit/cockpit-dataexplorer-v2.png)

The visualization is generated based on data point properties.

The data points properties are pre-filled as follows:

- If these properties have been customized previously, these values are used, see [To customize data point properties](#to-customize-data-point-properties).
- If the data points have a matching definition in the data point library, the values from the data point library are used.

There can be more than one matching data point entry in the data point library. In this case, the first one is selected automatically by the system.

For details on modifying the visualization in general, see [Changing data explorer visualization](#changing-visualization). For details on customizing the properties of a particular data point, see [To customize data point properties](#to-customize-data-point-properties).

**Example:**

Let's assume you have a temperature data point defined in the library and a device which sends temperature measurements (matching by fragment and series with the data point in the library). If you create an "On measurement threshold create alarm" smart rule and select the data point from the library, then it will use the settings from the library to decide whether to create an alarm.

{{< c8y-admon-info >}}
Data points are visible to all authenticated users of the tenant, regardless of their inventory role permission.
{{< /c8y-admon-info >}}

{{< c8y-admon-related >}}

- [Measurements](https://{{< domain-c8y >}}/api/core/#tag/Measurements) in the _{{< openapi >}}_ for further details on uploading data to {{< product-c8y-iot >}}.

{{< /c8y-admon-related >}}

### To add a data point {#to-add-a-data-point}

To add a data point to the data explorer, click **Add data point** at the bottom of the **Data points** card.

![Add data point](/images/users-guide/cockpit/cockpit-dataexplorer-adddatapoint.png)

On the left hand side of the dialog, select a device from the asset hierarchy. Only the asset hierarchy below the objects selected in the navigator is visible. If **Data explorer** in the navigator was selected, the complete asset hierarchy is visible.

The center of the dialog shows all data points of the selected object. Select the data points you want to show in the data explorer. Click **Add** to add all selected data points to the list of data points.

The right hand side shows all of the selected data points.

For further information on the data point library refer to [Data point library](/cockpit/data-point-library/).

To remove a data point from the data point list, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> and select **Remove from list**.

### To customize data point properties {#to-customize-data-point-properties}

You can customize the visualization of a particular data point to your preferences. To do so, expand the data point entry in the data point list.

The following fields may be modified:

<table>
<col style="width:15%">
<col style="width:85%">
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Label</td>
<td style="text-align:left">Name of the data point, displayed on the y-axis to identify the data point. Below the label, the target is displayed, showing the name of the asset and the internal name of the data point (measurement fragment and series). This information is not editable.</td>
</tr>
<tr>
<td style="text-align:left">Unit</td>
<td style="text-align:left">Unit used on the y-axis. </td>
</tr>
<tr>
<td style="text-align:left">Min/Max</td>
<td style="text-align:left">Range shown on the y-axis. If not specified, the y-axis is scaled based on measurement values retrieved per specified time range.</td>
</tr>
<tr>
<td style="text-align:left">Target</td>
<td style="text-align:left">The target value is currently not shown in the diagram. The value is used in the "Data point list" widget.</td>
</tr>
<tr>
<td style="text-align:left">Yellow range min/max</td>
<td style="text-align:left">Defines the range when MINOR alarms should be raised by threshold rule.  </td>
</tr>
<tr>
<td style="text-align:left">Red range min/max</td>
<td style="text-align:left">Defines the range when CRITICAL alarms should be raised by threshold rule.</td>
</tr>
<tr>
<td style="text-align:left">Display</td>
<td style="text-align:left">Value displayed when data is aggregated. May be "Minimum", Maximum", Minimum and maximum".</td>
</tr>
<tr>
<td style="text-align:left">Chart type</td>
<td style="text-align:left">The type of chart used for the visualization. May be one of "Line", "Points", "Line and points", "Bars", "Step before" (alternating between vertical and horizontal segments, as in a step function) or "Step after" (alternating between horizontal and vertical segments). Default value is "line".</td>
</tr>
<tr>
<td style="text-align:left">Y axis</td>
<td style="text-align:left">Defines where the y-axis is shown. May be one of "Auto", "Left", "Right". Default value is "Auto". </td>
</tr>
</tbody>
</table>

### To add or clone a configuration{#to-add-or-clone-a-configuration}

Configurations in the data explorer let you create, save, and manage different configurations tailored to your specific needs - whether for individual devices, projects, or use cases. Each configuration stores your selected data points, chart layout, time range, and all visual customizations. Configurations are saved automatically in your browser's local storage, so any updates (like adding or removing data points or changing the visualization) are preserved instantly.

You can switch between multiple configurations using the configuration menu, located at the top left of the **Data explorer** page. This menu provides the following actions:

- Create new configuration – Start from a blank configuration with no data points or settings applied.
- Clone a configuration – Duplicate the current configurations to use it as a starting point for a new setup.
- Delete all configurations (except the active one) – Clean up your saved configurations by removing all others, keeping only the currently active configuration.

Each configuration has a unique URL that can be shared with other users. To use the shared configuration URL, those users must have access to the referenced devices and data points.

![Data explorer configurations](/images/users-guide/cockpit/cockpit-dataexplorer-workspaces.png)

{{< c8y-admon-info >}}
Since configurations are stored locally, they are tied to your browser and device. Clearing browser data will remove them.
{{< /c8y-admon-info >}}

### Y-axis behaviour {#y-axis-behaviour}

Per default, the first data point is positioned to the left y-axis and the remaining data points to the right. This behavior can be changed by modifying the respective value "Y-axis" for a particular data point (to "Left" or "Right", see above).

Each data point is shown on its own y-axis, unless the following condition is met:

- Two data points having the same minimum and the same maximum value.

In this case, both data points share the same y-axis. This y-axis only shows the unit (or multiple units, in case they are different). The label is not shown.

### To add alarms or events {#to-add-alarms-or-events}

In addition to data points you can also add alarms or events to the data explorer.

In the **Alarms/Events** card, click **Add alarm/event** to add an alarm or event.

In the upcoming dialog, you can select an alarm or event from the list of recent alarms and events. Click **Add** to add your selection.

Expand an event, to modify its properties.

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> and in the context menu select **Remove**, to remove the entry from the list.

As with data points, you can turn the visibility of an alarm/ event in the data explorer on and off by using the toggle.

### To export measurement data {#to-export-measurement-data}

You may download measurement data as CSV or Excel files. The exported data shows the following information, divided into columns:

- Time when the specific measurement was taken
- Source of the measurement
- Name of the device being used
- Fragment series (for example `c8y_SpeedMeasurement`)
- Value of the measurement
- Unit used for a particular measurement (for example "C", "km/h", "sec")

To export measurement data, click the **Generate export** button in the top menu bar and select your desired time range, data scope and file type.

Click **Download** to generate and save the file to your computer.
