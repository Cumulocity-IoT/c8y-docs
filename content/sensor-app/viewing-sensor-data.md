---
weight: 50
title: Viewing sensor data
layout: bundle
sector:
  - getting_started
---


You can find an overview of all sensor data on the main page of the app.
Your smartphone's internal sensors, such as its gyroscope, barometer, location and magnetic field, are shown in cards at the top of the page.
Swipe left and right to inspect them.

Some sensors are only available if the permission is granted (for example microphone) and the sensor is enabled (for example location). Tap **Allow** in the first sensor card to grant these permissions or enable the sensors.

![Sensor data](/images/users-guide/csa/csa-application-main-page.png)

Some supported Bluetooth devices provide more than one sensor.
In these cases, the card for this device also reacts to left and right swipes, changing the sensor that is displayed.

{{< c8y-admon-info >}}
Your smartphone allows you to view sensor data without being connected to {{< product-c8y-iot >}}. Ensure that your smartphone is connected to {{< product-c8y-iot >}} when you wish to have sensor data sent to the server.
{{< /c8y-admon-info >}}

Tap a card to show some sensor details, including when the last measurement was last updated.

Most sensors provide new measurements within a second. Others, such as location, might provide updates only on a significant change. Use the update time to find out if measurements are received.
