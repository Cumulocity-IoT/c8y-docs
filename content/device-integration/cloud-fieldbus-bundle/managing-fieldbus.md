---
weight: 30
title: Managing fieldbus devices
layout: redirect
---


Once connected, you can now manage your device. Switch to the **Child devices** tab of a device to list the connected fieldbus devices and navigate to a fieldbus device.

Depending on the capabilities of the device and its configuration in {{< product-c8y-iot >}}, you can:

* [Collect measurements](#collect-measurements)
* [Send alarms on coil or register changes](#monitoring-alarms)
* [Log coil and register changes as events](#logging-events)
* [Monitor the status of coils and registers](#monitoring-the-device-status)

### Collecting measurements {#collecting-measurements}

If the device protocol of the fieldbus device is configured to collect measurements, these will be visible in the **Measurements** tab. They will also be available for usage in the [Data explorer](/cockpit/data-explorer) and in [dashboards](/cockpit/working-with-dashboards/).

Data is collected according to the interval specified in the "transmit rate" property of the terminal as described above. To optimize the data traffic, data which is exactly the same as collected previously may not be sent again.

![Fieldbus measurements](/images/device-protocols/cloud-fieldbus/fieldbus-modbus-measurements.png)

### Monitoring alarms {#monitoring-alarms}

If the device protocol of the fieldbus device is configured to send alarms, these will be visible in the **Alarms** tab and usable in widgets. To determine the alarm status, the fieldbus devices are monitored for changes according to the "polling rate" setting of the terminal. If a particular coil or register is non-zero, an alarm will be raised. If the value goes back to zero, the alarm will be cleared.

![Fieldbus alarms](/images/device-protocols/cloud-fieldbus/fieldbus-modbus-alarms.png)

### Logging events {#logging-events}

Similar to alarms, changes in fieldbus devices can be monitored and logged as events. Each time, the value of the monitored coil or register changes, an event is created. You can see the events in the **Events** tab of the device or use them in widgets. You can inspect the new value of the monitored coil or register by clicking on the event and unfolding the event details.

![Fieldbus events](/images/device-protocols/cloud-fieldbus/fieldbus-modbus-events-log.png)

### Monitoring the device status {#monitoring-the-device-status}

The status of devices can be monitored in realtime using dashboard widgets in the Cockpit application. Navigate to the Cockpit application, create a dashboard or report, and add widgets as described in [Cockpit](/cockpit/).

### Monitoring the device status using the Fieldbus device widget {#monitoring-the-device-status-using-the-fieldbus-device-widget}

The "Fieldbus device" widget provides you with a tabular display of the status of a device. The status of the device can also be modified through the widget.

To use the "Fieldbus device" widget, follow these steps:

1. Select a dashboard and click **Add widget** in the top menu bar.
2. Select the "Fieldbus device" widget and edit the title of the widget.
3. Select the device that should be shown in the widget in the **Asset selection** section.
4. Select the coils and registers to be shown on the widget.

![Adding the Fieldbus Device Widget](/images/device-protocols/cloud-fieldbus/fieldbus-widget.png)

In the widget, the selected coils and registers are grouped into display categories as configured in the device protocol. The "Fieldbus device" widget updates automatically as soon as there is new data available. You do not need to click **Reload**.

![Use the Fieldbus Device Widget](/images/device-protocols/cloud-fieldbus/fieldbus-modbus-status.png)

Registers and coils that can be changed are represented by active widgets. If you click a switch, an operation to change the corresponding coil or register is sent to the terminal. Similar, if you change a value and click **Set**, an operation is created. The terminal will then carry out the configuration change on the device, as requested through the operation. While the operation is being processed, a progress indicator is shown.

### Monitoring the device status using the SCADA widget {#monitoring-the-device-status-using-the-scada-widget}

The "SCADA" widget provides you with a graphic representation of the status of a device.

To use the "SCADA" widget, follow these steps:

1. Select a dashboard and click **Add widget** in the top menu bar.
2. Select the "SCADA" widget and edit the title of the widget.
3. Select the device that should be shown in the widget in the **Asset selection** section.
4. Upload an SVG file with the graphic representation of the device. SVG files are vector graphics that must be specifically prepared with placeholders for the status information. See [Preparing SVG files for the SCADA widget](#preparing-svg-files-for-the-scada-widget) below.
5. Assign placeholders to devices. Note that multiple devices can be taken as source.
6. You now must assign each placeholder to a property of the device. Hover over each placeholder and select **Assign device property** or **Assign fieldbus property**. In the upcoming dialog box, basic device properties or fieldbus properties (that is, status coils and registers) can be selected. Select the desired property and click **Select**.
7. After assigning all placeholders, a preview of the widget with the current values of the properties is shown. Click **Save** to place the widget on the dashboard.

![Adding the SCADA Widget](/images/device-protocols/cloud-fieldbus/fieldbus-scada-edit.png)

### Preparing SVG files for the SCADA widget {#preparing-svg-files-for-the-scada-widget}

The SCADA widget accepts SVG files which use AngularJS directives, for example `ng-if`, `ng-show`, `ng-style`, `ng-repeat`, `ng-click`, for dynamic data presentation.

Moreover, JavaScript event attributes (like onclick, onmouseover) can be used in SVG files uploaded to SCADA widgets.

Data from devices (like latest measurements and other properties) are provided via placeholders. There are also predefined helper functions which can be used.

For creating SVG files, it is recommended to use [https://boxy-svg.com/](https://boxy-svg.com/). It is an easy to use, quality Chrome extension.

#### Placeholders {#placeholders}

For a placeholder to be recognized by the SCADA widget, it must occur at least once in double curly braces with no other expression, for example `{{placeholderName}}` (in a comment, attribute's value, or element's content - see example). Once annotated, the placeholder can be used within other expressions, for example `{{placeholderName * 3.1415}}`, `ng-class="{ active: placeholderName > 100 }"` or `ng-if="placeholderName === 'VALUE'"`.

#### Predefined functions {#predefined-functions}

The following predefined functions are available for use in expressions:

- `goToGroupDetails(groupId)` – takes the group ID and redirects the user to the group details view, for example, `<... ng-click="goToGroupDetails(groupId)">`,
- `goToDeviceDetails(deviceId)` – takes the device ID and redirects the user to the device details view, for example, `<... ng-click="goToDeviceDetails(deviceId)">`,
- `getActiveAlarmsStatusClass(alarmsStatus)` – takes the alarm status object and returns a CSS class that can be used for styling: `none`, `warning`, `minor`, `major`, `critical`, for example, `<... ng-class="getActiveAlarmsStatusClass(alarmsStatus)">`.

#### Example {#example}

	svg
	<?xml version="1.0" encoding="utf-8"?>
	<svg width="600px" height="600px" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
	  <!-- Annotate placeholders in comments: -->
	  <!-- {{batteryValue}} -->
	  <!-- {{alarmsStatus}} -->

	  <style>
	    .critical {
	      fill: red;
	    }
	  </style>

	  <!-- or in an attribute: -->
	  <text data-placeholder="{{batteryValue}}"
	    class="text"
	    x="50"
	    y="200"
	    width="200">
	    <!-- pass placeholder's value to a predefined function to get alarms status CSS class: -->
	    <tspan ng-class="getActiveAlarmsStatusClass(alarmsStatus)" style="font-size: 45pt;">
	      <!-- or in an element's content: -->
	      {{batteryValue}}

	      <!-- a placeholder can be also a part of expression, for example,: -->
	      {{batteryValue * 100}} %
	    </tspan>
	  </text>
	</svg>
