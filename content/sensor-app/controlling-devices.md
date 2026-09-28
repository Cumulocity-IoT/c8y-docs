---
weight: 80
title: Controlling devices
layout: bundle
sector:
  - getting_started
---

The {{< sensor-app >}} can receive real-time control commands from {{< product-c8y-iot >}}.

You can create a dashboard for your smartphone device as described in [Working with dashboards](/cockpit/working-with-dashboards/).

For details on how to add new widgets to the dashboard, see [Widgets collection](/cockpit/widgets-collection).

The "Message sending" widget can be used to send simple text notifications to a smartphone. Simply enter the required text into the widget and click **Send**. The message will appear as a pop-up alert on the device.

The "Vibration" widget can be used to activate and deactivate the vibration motor on the device. When the vibration switch is activated, the smartphone continuously vibrates until it is switched off again.

![Device widget](/images/users-guide/csa/csa-messaging-and-vibration-widget.png)

{{< c8y-admon-info >}}
The smartphone must remain connected to {{< product-c8y-iot >}} to receive these commands. On the device's own dashboard, online devices are shown with a green map-marker. You can also determine if the device is connected in the Device Management application. On the **All Devices** page two green arrows indicate that a device is online. Moreover, the individual device info pages contain a "Device status" widget.
{{< /c8y-admon-info >}}
