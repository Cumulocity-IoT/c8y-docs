---
weight: 60
title: Troubleshooting devices
layout: redirect
helpcontent:
- label: troubleshooting-devices
  title: Events
  content: "Troubleshooting devices at a more detailed level can be done with the
    help of events. Events are low-level messages sent by devices that are usually
    used for application-specific processing. For example, a vending device sends
    its real-time sales in the form of events.\n\nYou can find an overview of the
    events across all devices here. To view the operations of a particular device,
    switch to the **Events** tab in the details of the device.\n\nSince devices may
    send large amounts of event data, you can filter the data to be displayed by date
    or type, using the fields at the top left."
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:40Z'
---
Troubleshooting devices at a more detailed level can be done with the help of events. Events are low-level messages sent by devices that are usually used for application-specific processing. For example, a vending device sends its real-time sales in the form of events.

### To view events {#to-view-events}

{{< product-c8y-iot >}} displays events at the level of individual devices and across all devices:

* To view the events for all devices, click **Events** in the **Overview** menu in the navigator.
* To view the events of a particular device, switch to the **Events** tab in the details of this device.

![Events](/images/users-guide/DeviceManagement/devmgmt-events.png)

Per default, events are shown as coming in from the devices in real time. To disable real-time updates, click **Realtime** at the right of the top menu bar.

For each event, the following information is provided:

|Info|Description|
|:---|:---|
|Timestamp|Timestamp when the event has been executed.
|Name|Name of the event.
|Device|The name of the device sending the event. Clicking the name leads you to the detailed view of the device.

In the event list, the latest entry is displayed on top.

Clicking a row expands it and displays further details on the event (as type and position of the device).

Since devices may send large amounts of event data, you can filter the data to be displayed by date.

Select a start date and an end date from the fields in the top menu bar and click **Apply** to apply the filter. Click **Clear** to clear the filter again.
