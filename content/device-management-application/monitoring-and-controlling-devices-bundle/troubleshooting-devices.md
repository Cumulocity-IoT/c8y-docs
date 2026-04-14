---
weight: 60
title: Troubleshooting devices
layout: redirect
helpcontent:
- label: troubleshooting-devices
  title: Events
  content: "Troubleshooting devices at a more detailed level can be done with the help of events. Events are low-level messages sent by devices that are usually used for application-specific processing. For example, a vending device sends its real-time sales in the form of events.


   You can find an overview of the events across all devices here. To view the operations of a particular device, switch to the **Events** tab in the details of the device.


  Since devices may send large amounts of event data, you can filter the data to be displayed by date or type, using the fields at the top left."
---

Troubleshooting devices at a more detailed level can be done with the help of events. Events are low-level messages sent by devices that are usually used for application-specific processing. For example, a vending device sends its real-time sales in the form of events.

### To view events {#to-view-events}

{{< product-c8y-iot >}} displays events at the level of individual devices and across all devices:

* To view the events for all devices, click **Events** in the **Overview** menu in the navigator.
* To view the events of a particular device, switch to the **Events** tab in the details of this device.

![Events](/images/users-guide/DeviceManagement/devmgmt-events.png)

By default, events are displayed as they come in from the devices at selected intervals (30 seconds by default). To pause pooling updates, click the button with the countdown timer next to the **Auto refresh** label.

For each event, the following information is provided:

|Info|Description|
|:---|:---|
|Timestamp|Timestamp when the event has been executed.
|Name|Name of the event.
|Device|The name of the device sending the event. Clicking the name leads you to the detailed view of the device.

In the event list, the latest entry is displayed on top.

Clicking a row opens the details of the selected event and displays further details on the event (such as the type and position of the device). 

Since devices may send large amounts of event data, you can filter the data to be displayed by date.

To do this, select the date filter in the top menu bar and choose one of the predefined date ranges or create a custom one. After selecting and filling in a custom date range, click *Apply**.
