---
weight: 30
title: Managing fieldbus devices
layout: redirect
---


Once connected, you can now manage your device. Switch to the **Child devices** tab of a device to list the connected fieldbus devices and navigate to a fieldbus device.

Depending on the capabilities of the device and its configuration in {{< product-c8y-iot >}}, you can:

* [Collect measurements](#collecting-measurements)
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

The "SCADA" widget provides a graphic representation of the status of a device and its fieldbus properties.

{{< c8y-admon-info >}}
For the full SCADA widget documentation — including SVG authoring, display options, and migration from legacy widgets — refer to the [SCADA widget](/cockpit/widgets-collection/#scada) section.
{{< /c8y-admon-info >}}

#### Mapping fieldbus properties to SCADA placeholders {#mapping-fieldbus-properties-to-scada-placeholders}

In the **Placeholder mappings** section of the SCADA widget configuration, you can map placeholders to fieldbus coils and registers using the **Fieldbus item status** computed property. This allows the widget to display live fieldbus values directly in the SVG visualization.

To map a placeholder to a fieldbus property:

1. In the **Placeholder mappings** section, click **Assign property** next to the placeholder you want to configure, then open the **Computed properties** tab and select **Fieldbus item status**.
2. Select the **Fieldbus item** — a dropdown lists all coils and registers defined in the device's fieldbus configuration, grouped by type.
3. Select the **Result type**:
   - **Raw value** — returns the numeric value of the coil or register.
   - **Enum value** — returns the label mapped to the value in the item's enum definition. This option is only meaningful if enum values are configured for the selected item.
