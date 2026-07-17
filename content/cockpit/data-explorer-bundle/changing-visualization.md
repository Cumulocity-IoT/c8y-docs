---
weight: 20
title: Changing the visualization
layout: bundle
sector:
  - app_enablement
---

To change the visualization in the data explorer, you can modify several properties.

### Time range {#time-range}

You can change the time range being shown. By default, you see the values for the last hour.

To change the time range on the x-axis, use one of the following options:

- Select a different time range from the dropdown list in the top menu bar.
- Enter a custom time range into the **From** and **To** fields in the data explorer.
- Drag the chart and move left or right to move the time period.
- Use the mouse wheel to zoom in or out.
- Align the zoom slider beneath the graph to select a different time range. You can drag the edges to zoom in or out or drag the whole slider to move the x-axis.

{{< c8y-admon-info >}}
Real-time updates will be switched off if you set a time range in the past.
{{< /c8y-admon-info >}}

### Aggregation {#aggregation}

You may aggregate the data being displayed to get an efficient overview over larger time periods.

By default, aggregation is set to "None". This value may be changed in the **Aggregation** field in the top menu bar. Available values are "Minutely", "Hourly", "Daily" or "Auto", depending on the selected time range.

With "Auto", the aggregation interval is calculated automatically from the selected time range and the **Data points per chart** value (2 - 2000, default 300), so you always see a readable number of values regardless of the time range. When zooming into the chart, data is loaded at a finer interval to keep this number of data points; disable **Keep loading data when zooming in** to reuse the already loaded data instead.

{{< c8y-admon-info >}}
The "Auto" option is only available on tenants using [Enhanced time series support](/standard-tenant/enhanced-time-series-support/).
{{< /c8y-admon-info >}}

When aggregation is activated, the timestamp which is displayed in data graphs or data point tables changes slightly as follows to improve transparency:

- If no aggregation is selected the date, hour, minute and second are shown:<br> 27 Jan 2020 17:26:55
- If minutely aggregation is selected, the second indication will not be shown:<br> 27 Jan 2020 17:27-17:28
- If hourly aggregation is selected, the minute and second indication will not be shown:<br> 27 Jan 2020 05:00-06:00
- If daily aggregation is selected, only the day will be shown:<br> 27 Jan 2020-28 Jan 2020.

### Aggregation functions {#aggregation-functions}

While aggregation is active, you can select which aggregation functions are displayed for the data points: Minimum, Maximum, Average, Count and Sum.

Use the **Aggregation display** checkboxes above the data point list to select the functions for all data points at once. At least one function must remain selected.

Each selected function is drawn as a separate line in a shade of the data point color and appears as a separate entry in the legend, so you can compare, for example, minimum, maximum and average of the same data point in parallel.

To configure the functions per data point, expand the data point entry. There you can set the display, ranges, chart type and Y-axis per function. When both Minimum and Maximum are selected, enable **Render as band** to replace the two lines with a shaded area between them.

{{< c8y-admon-info >}}
If the aggregation interval is too coarse to differentiate the functions (all return the same values), the chart collapses them into a single line and shows a hint. Aggregation functions are only available on tenants using [Enhanced time series support](/standard-tenant/enhanced-time-series-support/).
{{< /c8y-admon-info >}}

### Realtime updating {#realtime-updating}

By default, realtime updating is enabled which means that the data being shown is updated as new data flows into the system from the connected devices.

To turn realtime updating on or off, click **Realtime** in the top menu bar. A green light indicates, that realtime updating is enabled.

### Data point visibility {#data-point-visibility}

For each data point, its visibility can be switched on or off by using the toggle left from the data point name.

### Interactive legend (available only for the Data graph widget)

The legend, located above the chart, provides quick control over what's visible in your chart. You can toggle visibility of individual data points or alarms/events by clicking their name.

### Changing the chart options {#changing-the-chart-options}

You can customize the chart options to control how your data is visualized, including settings like line type, aggregation, and display preferences. These options can be adjusted directly in the data explorer (below the chart) or in the configuration of the "Data graph" widget.

| **Category**        | **Option**                                  | **Description**                                                                                                  |
| ------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Axis**            | Y-axis helper lines                         | Displays horizontal guide lines along the Y-axis for easier value alignment.                                     |
|                     | X-axis helper lines                         | Displays vertical guide lines along the X-axis for easier time alignment.                                        |
|                     | Merge matching data points into single axis | Groups data points with the same min/max values onto one Y-axis for clarity. The min and max values must be set. |
| **Alarms & events** | Show vertical line on every occurrence      | Displays a vertical line on the chart at each alarm or event timestamp.                                          |
|                     | Show icon when triggered                    | Shows an icon on the chart where alarms or events have occurred.                                                 |
| **Chart**           | Display labels and units on Y-axis          | Displays axis labels and measurement units for each data point on the Y-axis.                                    |
|                     | Show slider                                 | Toggles the visibility of the data slider below the chart. See section below for more info.                      |

### Working with the data slider {#working-with-the-data-slider}

The data slider, located at the bottom of the chart, provides an overview of a longer time range than the currently selected one - offering a summarized view to help navigate large datasets. For example, if "Last hour" is selected, the slider might display data from the past 24 hours.
You can zoom into any portion of the slider and pan across the range to adjust the visible data in the main chart, making it easier to explore and focus on specific periods of interest.
