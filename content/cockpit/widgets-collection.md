---
weight: 55
title: Widgets collection
layout: bundle
sector:
  - app_enablement
---

The Cockpit application includes pre-set widget types. Each widget type provides different parameters to configure and different data to be displayed.


{{< c8y-admon-related >}}
- [Application enablement & solutions > Cockpit > Data explorer](/cockpit/data-explorer/) for details on visualizing your data when working with widgets.
- [Platform administration > {{< standard-tenant >}} administration > Managing the ecosystem > Managing applications](/standard-tenant/ecosystem/#managing-applications) for details on managing applications.
- Refer to the [{{< c8y-tech-community >}}]({{< c8y-tech-community-link >}}) for a tutorial on customized widgets in the {{< product-c8y-iot >}} environment.
{{< /c8y-admon-related >}}

### Alarm list {#alarm-list}

The "Alarm list" widget shows a list of alarms, filtered by objects, alarm severity and alarm status. For details on the information provided for each alarm, refer to [Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms).

![Alarm list widget](/images/users-guide/cockpit/cockpit-widget-alarm-list.png)

**Parameters to configure**

|Field|Description|
|:---|:---|
|Title|Widget title. By default, the widget type is used as title.
|Target assets or devices|Select groups or devices, optional HTML expressions which should be evaluated.
|Status|Only show devices with alarms of of the selected alarm status.
|Type|Only show alarms of the specified type(s). Details can be seen when clicking once on an alarm.
|Severities|Only show alarms of the selected alarm severity.
|Order|Alarms may be ordered by the active status (followed by severity and time, the default), by date (followed by time, either in descending or ascending order), or by severity (followed by time).
|Auto refresh|Enables you to automatically refresh the alarm list at the frequency you select.
|Show alarms from child devices|Show or hide the alarms of child devices.

### Asset notes {#asset-notes}

The "Asset notes" widget displays messages provided by the administrative user to all owners of the current widget.

![Asset notes widget](/images/users-guide/cockpit/cockpit-widget-asset-notes.png)

Only users with the permission to edit the home dashboard will be able to provide this message.

### Asset properties {#asset-properties}

The "Asset properties" widget displays a user-defined list of attributes of the current object. The current object can be a device or a group.

![Asset properties widget](/images/users-guide/cockpit/cockpit-widget-asset-properties.png)


**Parameters to configure**

|Field|Description|
|:---|:---|
|Title|Widget title. By default, the widget type is used as title.
|Target assets or devices|Select groups or devices.
|Properties|List of properties, see [Asset table](#asset-table).

{{< c8y-admon-info >}}
In the view mode, this widget only displays the properties which are not empty.
{{< /c8y-admon-info >}}

### Asset table {#asset-table}

The "Asset table" widget shows details of a selected asset and all its child devices in a table. This is a very powerful widget, allowing to arrange selected properties of objects in a table.

**Parameters to configure**

|Field|Description|
|:---|:---|
|Title|Widget title. By default, the widget type is simply used as title.
|Target assets or devices|Select for which object all child devices should be shown. This is typically a group object.
|Properties|Select properties or actions of an object to visualize them as columns in the table.

**Example**

In the following screenshot, five columns are configured. Three property columns "Name", "Owner", and "Type", which refer to the properties "name", "owner" and "type" respectively. Additionally, there are two actions, one for toggling the maintenance mode, and one for rebooting the device.

![Asset table widget](/images/users-guide/cockpit/cockpit-widget-asset-table.png)

The resulting table is visualized as follows:
![Asset table widget example](/images/users-guide/cockpit/cockpit-widget-asset-table-example.png)

#### To add properties {#to-add-properties}

Click **+Add Properties** and select one or more properties to be added.

{{< c8y-admon-info >}}
The property "Active alarm status" shows active alarms as icons in the table. If you select this property, you also must configure the renderer "Active Alarm Status" in the list of columns.
{{< /c8y-admon-info >}}

#### To add actions {#to-add-actions}

1. Click **+Add Action**.
1. Select **Toggle maintenance mode** to add the predefined action to toggle the maintenance mode.
1. Select **Create operation** to create a button that will execute a shell command. In the resulting dialog box you can then enter the label for the button and the shell command to be executed.

![Reboot device button configuration](/images/users-guide/cockpit/cockpit-widget-asset-table-buttonconfig.png)

{{< c8y-admon-info >}}
The dialog shows the predefined shell commands of the first device that supports shell commands. The list is empty if there is no such device. For more details, refer to [Shell](/device-management-application/viewing-device-details/#shell).<br>
You can also enter the JSON format for the operation that will be sent to the device. For details, contact the device vendor for supported operations.
{{< /c8y-admon-info >}}

#### To modify the table {#to-modify-the-table}

To edit the header of a column, click on its value in the **Label** column and edit the label.

You can rearrange the columns by clicking the icon <i class="dlt-c8y-icon-menu text-muted icon-20"></i> at the very left of a row and dragging and dropping the entry.

To remove a property or an action, hover over the respective row and click **Delete** at the right.

### Data point graph {#data-point-graph}

The "Data point graph" widget shows a data point (measurement) in a graph. The visualization is the same as in the [data explorer](/cockpit/data-explorer/).

![Data Point Graph widget](/images/users-guide/cockpit/cockpit-datapointsgraph-widget.png)

The easiest way to create a "Data point graph" widget is to navigate to the data explorer, click the <b>More...</b> button in the top menu bar and select <b>Send as widget to dashboard</b>.

Refer to [Changing visualization](/cockpit/data-explorer/#changing-visualization) for further details on the parameters to be configured.

### Data point list {#data-point-list}

The "Data point list" widget shows data points (measurements), one in each row, with current values and data point properties.

**Parameters to configure**

<table>
<thead>
<colgroup>
   <col style="width: 20%;">
   <col style="width: 80%;">
</colgroup>
<tr>
<th align="left">Field</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Title</td>
<td align="left">Widget title. By default, the widget type is simply used as title.</td>
</tr>
<tr>
<td align="left">Data point</td>
<td align="left">Shows a list of available data points. You must enable at least one data point. Click <strong>Add data point</strong> to add a data point to the list. For details on how to add data points see <a href="/cockpit/data-explorer/#to-add-a-data-point">To add a data point</a>.</td>
</tr>
<tr>
<td align="left">Column visibility</td>
<td align="left">Select which columns should be visible: <br><strong>Label</strong>: Label of the data point. See <a href="/cockpit/data-explorer/#changing-visualization">Changing visualization</a> for details. <br><strong>Target</strong>: Target value. Can be configured in the <a href="/cockpit/data-explorer/">data explorer</a> or the <a href="/cockpit/data-point-library/">data point library</a>.<br>Current: Current value. <br><strong>Diff</strong>: Absolute difference between current value and target value. <br><strong>Diff %</strong>: Percentage of difference between current value and target value. <br><strong>Asset</strong>: Name of the device or group of the data point.</td>
</tr>
</tbody>
</table>

### Data point table {#data-point-table}

The "Data point table" widget configuration is similar to the "Data point graph" widget, but instead of visualizing the data as a line-chart, data is visualized as a table.

The "Data point table" widget displays data based on selected data points, time interval and aggregation.

Out of range values, based on configured yellow and red ranges, are highlighted in the table.

![Data point table](/images/users-guide/cockpit/cockpit-datapointtable.png)

### Event list {#event-list}

The "Event list" widget lets you monitor events for a selected device.

![Event list widget](/images/users-guide/cockpit/cockpit-widget-event-list.png)

Additionally, a specific date range can be set and the events can be monitored in realtime.

### Fieldbus device {#fieldbus-device}

The "Fieldbus device" widget lets you see the status of a modbus device and operate it.

For details on the "Fieldbus device" widget, refer to [Monitoring the device status using the Fieldbus device widget](/device-integration/cloud-fieldbus/#monitoring-the-device-status-using-the-fieldbus-device-widget).

### Image {#image}

The "Image" widget lets you display a single image to be selected from your file system by browsing.

![Image widget](/images/users-guide/cockpit/cockpit-image-widget.png)

When the image is uploaded, it is possible to change the image size and alignment.

![Image widget configuration](/images/users-guide/cockpit/cockpit-image-widget-config.png)

### Info Gauge {#info-gauge}

The "Info gauge" widget visualizes one data point in form of a radial gauge and multiple data points as labels.

![Info gauge widget](/images/users-guide/cockpit/cockpit-widget-info-gauge.png)

You can select one data point for the gauge, and multiple data points shown with labels at the left side.

You must enable at least one data point in each section to create the "Info gauge" widget.


### HTML {#html}

The "HTML" widget displays user-defined content that can be formatted using HTML and dynamically populated with data from the selected asset or device. Additionally, you can switch the widget into advanced mode, which allows you to build complex web components with JavaScript code.

**Parameters to configure**

* **Target assets or devices**: Select the objects for which optional HTML expressions are evaluated.
* **Asset properties**: In the **Asset properties** section, you can copy the properties of the selected asset and paste them into the code editor under the **Settings** section.

The widget offers two distinct modes:

1. **Normal mode**: You can apply HTML and CSS while adding properties as template literals. You can use simple expressions such as:
   `${this.c8yContext ? this.c8yContext.name : 'No device selected'}`. The `${this.c8yContext}` variable always refers to the selected target asset.

2. **Advanced mode**: When enabled, you can build complex web components using the Lit framework. You can import supported ECMAScript modules. By default, leaflet, echarts, fetch, and lit are provided. Whatever is rendered in the web component will be displayed to the end user. Additional requests can be performed by importing the fetch library. The following shows the available imports:

   ```javascript
   import { LitElement, html, css } from 'lit';
   import { styleImports } from 'styles';
   import { L } from 'leaflet';
   import * as echarts from 'echarts';
   import { fetch } from 'fetch'; // Use this instead of default fetch to avoid potential issues
   ```

**Styling and security considerations**

When using styles, global styles can be applied if encapsulation is not enabled. Styles should always use CSS variables and tokens to ensure compatibility with dark mode and custom brandings. 

By default, the normal HTML widget is sanitized for security, while in advanced mode the developer is responsible for proper sanitization. You can modify the default sanitization behavior in the [Cockpit application configuration](/cockpit/cockpit-configuration/).

A simple example looks like this:

![HTML widget](/images/users-guide/cockpit/cockpit-widget-html.png)

**Legacy widget compatibility**

{{< c8y-admon-important >}}
Existing widgets based on AngularJS will automatically fall back to legacy mode, which maintains backward compatibility and allows these widgets to continue functioning. This fallback displays JavaScript code that enables legacy widget execution. However, it is strongly recommended to migrate these widgets to the new Lit-based framework as soon as possible, since AngularJS support is deprecated.
{{< /c8y-admon-important >}}

#### To migrate a legacy widget {#html-to-migrate-a-legacy-widget}

Migrating a legacy widget to the new format requires familiarity with JavaScript and HTML. The migration process involves replacing all AngularJS-specific code.

Depending on the complexity of your original widget, there are two migration approaches:

* **Simple mode**: Replace placeholders and template syntax. Use this mode if your widget does not contain custom JavaScript logic in a `<script>` tag.
* **Advanced mode**: Build complex web components with custom JavaScript. Use this mode if your widget contains custom JavaScript logic or event handlers.

**Step 1: Assess your widget**

Check your current widget code. If it contains specific JavaScript logic in a `<script>` tag, you need to use advanced mode. If not, use simple mode.

**Step 2: Migrate placeholders in simple mode**

The following example shows legacy widget code:
```html
<p ng-if="device.name === 'Alpine Hiker #1'">
  Hello {{device.name}}.
</p>
```

Migrated to the template syntax, this is:
```js
${ this.c8yContext.name === 'Alpine Hiker #1' ? html`<p>Hello ${this.c8yContext.name}</p>` : '' }
```

**Step 3: View the generated code**

Create a new widget with your migrated code. HTML widgets that are migrated use an AngularJS legacy mode which you can view by opening the "advanced mode" to inspect the generated code:

```js
import { angular } from 'angular';

// NOTE: This is a legacy template for the HTML widget.
// It is used to compile the HTML content in the context of the AngularJS application.
// The template is injected into the AngularJS application and compiled using the AngularJS compiler.
// The template should only be used for backward compatibility purposes.
// It is recommended to use a web component instead.

if (!angular) {
  throw new Error('AngularJS is not available. Please make sure to include AngularJS in your project.');
}

const $injector = angular.element(document.querySelector('c8y-ui-root')).injector();
if (!$injector) {
  throw new Error('AngularJS injector is not available. Maybe not an hybrid application?');
}

// defining a new scope
const $rootScope = $injector.get('$rootScope');
const $scope = $rootScope.$new(true);

// faking the old angularjs config 
$scope.child = {
  config: {
    device: { id: "2698590822", name: "Alpine Hiker #1" },
    html: `<div ng-controller="HtmlWidgetCtrl"><p ng-if="device.name === 'Alpine Hiker #1'">
  Hello {{device.name}}.
</p>
</div>`
  }
};

// load the needed services
const $compile = $injector.get('$compile');
const $controller = $injector.get('$controller');

// create the element
const htmlElement = angular.element($scope.child.config.html);

// The default controller providing the context
$controller('HtmlWidgetCtrl', { $scope });

// Compile the element
$compile(htmlElement)($scope);

// Apply the scope changes
$rootScope.$apply();

export default htmlElement[0];
``` 

The generated legacy mode code enables backward compatibility.

**Step 4: Use advanced mode for web components**

To use the new web component-based approach, copy your code to a new widget and enable the advanced mode. The following shows how the Lit-based HTML layout works:

```js

import { LitElement, html, css } from 'lit';
import { styleImports } from 'styles';

export default class DefaultWebComponent extends LitElement {
  static styles = css`
    
:host > div {
  padding: var(--c8y-root-component-padding-default);
}
span.branded { 
  color: var(--brand-primary, var(--c8y-brand-primary)); 
}
  `;

  static properties = {
    // The managed object this widget is assigned to. Can be null.
    c8yContext: { type: Object },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        ${styleImports}
      </style>
      ${this.c8yContext.name === 'Alpine Hiker #1' ? html`<p>Hello ${this.c8yContext.device}</p>` : ''}
    `;
  }
}
```

This example demonstrates the basic structure of a Lit web component.

**Step 5: Add interactivity in advanced mode**

In advanced mode, you add elements like event handlers. This allows you to migrate more complex legacy widgets with custom `<script>` tags. The following example is shortened to show only the important parts:

```js

//[…]

  static properties = {
    c8yContext: { type: Object },
    helloText: { type: String } // add this to ensure "rerendering" on changes
  };

  //[…]

  sayHello() {
   this.helloText = 'Hello world';
  }

  render() {
    return html`
      <style>
        ${styleImports}
      </style>
      ${this.c8yContext.name === 'Alpine Hiker #1' ? html`<p @click="${this.sayHello}">
         Hello ${this.c8yContext.device}</p>
      ` : ''}

      ${this.helloText}
    `;
  }
//[…]
```

This example shows how to handle click events and update the component state.

**Step 6: Verify the migration**

After migration, test the widget to ensure:

* All data displays correctly.
* Interactive elements work as expected.
* The widget responds to the device or asset selection.

By leveraging the [Lit web components](https://lit.dev/docs/v3/) framework, you migrate nearly every custom AngularJS or JavaScript implementation in a legacy widget. To request additional data, import the `fetch` library to directly request data from the platform.


### KPI {#kpi}

The "KPI" (Key Performance Indicators) widget visualizes a data point as a label, for example, a data point for the temperature of a device.

![KPI widget](/images/users-guide/cockpit/cockpit-widget-kpi.png)

**Parameters to configure**

On the left side, select the data point you want to display.
You must select only one active datapoint to create the "KPI" widget. If you select multiple data points at once, you cannot save the configuration.

On the right side, you can adjust how the data point is going to be displayed. This includes:
* Icon: The icon to be displayed next to the data point
* Number of decimal places
* Display: Allows to toggle whether the timestamp, icon and trend indicator should be displayed
* Font size of measurement value

### Linear Gauge {#linear-gauge}

The "Linear gauge" widget visualizes data points in form of a linear gauge. Min and max target values are shown on the gauge as well.

![Linear gauge widget](/images/users-guide/cockpit/cockpit-widget-linear-gauge.png)

{{< c8y-admon-info >}}
If a label is not properly readable, you can help yourself by increasing the min and max value of the data point to move the label into the readable range.
{{< /c8y-admon-info >}}

You must enable at least one data point to create the "Linear gauge" widget.

### Map {#map}

The "Map" widget shows the location of a device or all devices of a group.

![Map widget](/images/users-guide/cockpit/cockpit-widget-map.png)

You can drag the map and move its content, and you can zoom in and out by using the **Plus** and **Minus** buttons.

The icons representing the devices are color-coded. The color used follows these rules:

* Red = At least one CRITICAL alarm
* Orange = At least one MAJOR alarm
* Yellow = At least one MINOR alarm
* Blue = At least one WARNING
* Grey = No alarm

Click a device icon, to open a popup with the following information:

* The device name. When clicked, the application navigates to the device.
* The date at which the device last reported its location, if available.

**Parameters to configure**

* Target assets or devices: Select which devices are shown on the map. If a group is selected, all devices in that group (but not in any subgroups) are visible.
* Marker icon: Icon of the marker on the map.
* Zoom level: Default zoom level of the map.
* Center bound: The default map coordinates.
* Refresh interval: The refresh interval for the selected device or asset. If only one device is selected, instead of refresh interval, realtime option can be selected together with "follow selected" device toggle which would follow the device after location update.

{{< c8y-admon-info >}}
If none of the target device(s) has a known location, then the widget shows a world map without icons.
{{< /c8y-admon-info >}}

### Markdown {#markdown}

The "Markdown" widget can be used to display markdown content. Using the “Markdown” widget you can inform users, for example, on new features.

![Markdown widget](/images/users-guide/cockpit/cockpit-widget-markdown.png)

There are several ways to provide markdown content:

* Upload a markdown file.
* Provide a URL to an external source.
* Add "/README.md" as a relative file path in order to provide the README file of the current application as source.

### Message sending {#message-sending}

The "Message sending" widget sends a message to a device. The behavior of the device itself is device-dependent. Only available for devices that support the operation `c8y_Message`.

### Pie chart {#pie-chart}

The "Pie chart" widget displays data points (measurements) with current values in a pie chart presentation.

**Parameters to configure**

<table>
<thead>
<colgroup>
   <col style="width: 20%;">
   <col style="width: 80%;">
</colgroup>
<tr>
<th align="left">Field</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Title</td>
<td align="left">Widget title. By default, the widget type is simply used as title.</td>
</tr>
<tr>
<td align="left">Pie chart options</td>
<td align="left">Select from the options to show tooltips, percentages, legends in the pie chart.</td>
</tr>
<tr>
<td align="left">Data point</td>
<td align="left">Shows a list of available data points. You must enable at least one data point. Click <strong>Add data point</strong> to add a data point to the list. For details on how to add data points see <a href="/cockpit/data-explorer/#to-add-a-data-point">To add a data point</a>.</td>
</tr>
</tbody>
</table>

### Quick links {#quick-links}

The "Quick links" widget displays links in either a grid or list format.

![Quick links widget](/images/users-guide/cockpit/cockpit-widget-quick-links.png)

You can add, edit, or remove links to customize the widget according to your needs.

### Radial Gauge {#radial-gauge}

The "Radial gauge" widget visualizes data points in the form of a radial gauge, making it ideal for monitoring values like temperature, pressure, or performance metrics at a glance.

#### Presets and customization

You can choose from various preset styles such as "Default", "Pointer", "Progress bar", "Progress indicator", and "Grade rating". Each preset provides a distinct visual design.

![Radial gauge widget](/images/users-guide/cockpit/cockpit-widget-radial-gauge.png)

You must enable at least one data point to create the "Radial gauge" widget.

For full control, click **Show advanced options** to customize the gauge’s appearance and behavior.

**Advanced options reference**

| Category         | Property                                             | Description                                           |
| ---------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| **General**      | `name`                                               | Name of the gauge preset                              |
|                  | `radius`                                             | Radius of the gauge (for example, "90%")              |
|                  | `center`                                             | Center position of the gauge (for example, `["50%", "50%"]`) |
|                  | `startAngle`, `endAngle`                             | Start and end angles of the gauge arc                 |
| **Split lines**  | `splitNumber`                                        | Number of segments in the gauge                       |
|                  | `splitLineLength`, `splitLineLengthRatio`            | Length of split lines (absolute or ratio)             |
|                  | `splitLineDistance`, `splitLineDistanceRatio`        | Distance of split lines from axis (absolute or ratio) |
|                  | `splitLineColor`, `splitLineWidth`                   | Color and width of split lines                        |
| **Ticks**        | `tickShow`                                           | Whether to show ticks                                 |
|                  | `tickWidth`, `tickColor`                             | Width and color of ticks                              |
|                  | `tickDistance`, `tickDistanceRatio`                  | Distance of ticks from center (absolute or ratio)     |
|                  | `tickLength`, `tickLengthRatio`                      | Length of ticks (absolute or ratio)                   |
| **Axis**         | `axisLabelDistance`, `axisLabelDistanceRatio`        | Distance of axis labels from center                   |
|                  | `axisLabelColor`                                     | Color of axis labels                                  |
|                  | `axisLabelFontSize`, `axisLabelFontSizeRatio`        | Font size of labels (absolute or ratio)               |
|                  | `axisLabelFontSizeMin`, `axisLabelFontSizeMax`       | Minimum and maximum font size for labels              |
|                  | `axisLineWidth`, `axisLineWidthRatio`                | Width of the axis line (absolute or ratio)            |
| **Pointer**      | `showPointer`                                        | Whether to show the pointer                           |
|                  | `pointerStyle`, `pointerColor`                       | Style and color of the pointer                        |
|                  | `pointerWidth`, `pointerWidthRatio`                  | Width of pointer (absolute or ratio)                  |
|                  | `pointerLength`, `pointerLenghtRatio`                | Length of pointer (absolute or ratio)                 |
|                  | `pointerOffset`                                      | Offset of pointer from center                         |
| **Progress bar** | `progressBar`                                        | Enable progress bar                                   |
|                  | `progressBarWidth`                                   | Width of the progress bar                             |
|                  | `progressBarRoundCap`                                | Rounded caps on progress bar ends                     |
|                  | `progressBarColor`                                   | Color of the progress bar                             |
|                  | `additionalGaugeColors`                              | Extra colors for segmented gauge bars                 |
| **Typography**   | `measurementValueFontRatio`                          | Font size ratio of the measurement value              |
|                  | `measurementValueFontMin`, `measurementValueFontMax` | Min and max font size for measurement value           |
|                  | `measurementValueColor`                              | Color of the measurement value text                   |
|                  | `unitFontSize`, `unitFontRatio`                      | Font size or ratio of the unit label                  |
|                  | `unitFontMin`, `unitFontMax`                         | Min and max font size for the unit label              |
|                  | `unitColor`                                          | Color of the unit label                               |
|                  | `dateFontSize`, `dateFontRatio`                      | Font size or ratio of the timestamp                   |
|                  | `dateFontMin`, `dateFontMax`                         | Min and max font size for the timestamp               |
|                  | `dateColor`                                          | Color of the timestamp                                |
| **Details**      | `showDetail`                                         | Show detailed information like value or markers       |
|                  | `valueFontSize`                                      | Font size for the displayed value                     |
|                  | `detailOffsetCenter`                                 | Offset of detail from center                          |
|                  | `showMarkPoint`                                      | Show mark points on the gauge                         |

### Relay array control {#relay-array-control}

The "Relay array control" widget lets you switch relays on or off independently in an array of relays. Only available for devices that support this type of operation.

### Relay control {#relay-control}

The "Relay control" widget allows you to switch a device relay on or off. Only available for devices that support this type of operation.

### Rotation {#rotation}

The "Rotation" widget lets you render an object model of a device.

**Parameters to configure**

|Field|Description|
|:---|:---|
|Title|Widget title. By default, the widget type is simply used as title.
|Target assets or devices|Select group or device to be displayed.
|Object model for rendering|Select an object model type for rendering. May be one of "Box model" or "Phone model".
|Wireframe|Turn "Wireframe" on or off (default = on). The "wireframe" mode displays the object in a skeletal representation.
|Camera type|Select the type of camera to be used. May be one of "Orthographic camera" or "Perspective camera".

In the "Rotation" widget you can rotate the object by dragging and moving it around. Zoom in and out by using the mouse.

### SCADA {#scada}

The "SCADA" widget provides a graphic representation of the status of a device.

For details on the "SCADA" widget, refer to [Monitoring the device status using the SCADA widget](/device-integration/cloud-fieldbus/#monitoring-the-device-status-using-the-scada-widget).

The following code sanitization options can be selected:
 - strict - Does not allow any JS or angularjs directives.
 - lax (default) - Allows partly JS (events) and all angularjs directives.
 - none - Allows everything.

![SCADA widget](/images/users-guide/cockpit/cockpit-widget-scada.png)

### Silo {#silo}

The "Silo" widget displays data points (measurements) with current values in a silo presentation.

**Parameters to configure**

<table>
<thead>
<colgroup>
   <col style="width: 20%;">
   <col style="width: 80%;">
</colgroup>
<tr>
<th align="left">Field</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Title</td>
<td align="left">Widget title. By default, the widget type is simply used as title.</td>
</tr>
<tr>
<td align="left">Data point</td>
<td align="left">Shows a list of available data points. You must enable at least one data point. Click <strong>Add data point</strong> to add a data point to the list. For details on how to add data points see <a href="/cockpit/data-explorer/#to-add-a-data-point">To add a data point</a>.</td>
</tr>
</tbody>
</table>

### Traffic light {#traffic-light}

The "Traffic light" widget visualizes the states of a device as traffic light.

**Parameters to configure**

|Field|Description|
|:---|:---|
|Title|Widget title. By default, the widget type is simply used as title.
|Target assets or devices|Select group or device to be displayed.
|States mapping|Select a property for each light. The value of the property must be one of the following to have the respective light on: true, 1, any non-empty string, any non-null number.
