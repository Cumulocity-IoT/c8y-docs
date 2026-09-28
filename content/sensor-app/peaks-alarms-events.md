---
weight: 77
title: Simulating peaks and sending alarms and events
layout: bundle
sector:
  - getting_started
---

![Sensor buttons](/images/users-guide/csa/csa-sensor-buttons.png)

In order to simulate peak values, tap the 3rd button on the card for that sensor. The application will ask if you wish to start simulating peak values. Select **Simulate** to begin. If the phone is connected to {{< product-c8y-iot >}}, then it will send these values to the platform instead of the measurements coming from the selected sensor.

Sending alarms and events requires the phone to be connected to {{< product-c8y-iot >}}. If the device is not connected, the icons are greyed out. Tap the bell icon to send an alarm.

![Alarm dialog](/images/users-guide/csa/csa-alarm-dialog.png)

This will open a dialog in which you can select the alarm text, its type, and its severity. Tap **Create** to generate the alarm and send it to the {{< product-c8y-iot >}} platform.

To generate an event, tap the 2nd button on the card for that sensor.

![Event dialog](/images/users-guide/csa/csa-event-dialog.png)

This will open a dialog where the user can set the event text and type. Tap **Create** to generate the event and send it to {{< product-c8y-iot >}} platform.
