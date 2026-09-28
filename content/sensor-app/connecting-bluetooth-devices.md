---
weight: 60
title: Connecting new Bluetooth devices to the Sensor App
layout: bundle
sector:
  - getting_started
---

The {{< sensor-app >}} connects to a range of Bluetooth sensor devices.
Additional devices will be added in the future.

To connect a device, click the plus button at the bottom right of the screen.
If Bluetooth is enabled and all required permissions are granted, your smartphone starts scanning for any new supported Bluetooth devices in the area that are not already paired. If Bluetooth is not enabled, select **Enable Bluetooth** on the scanning screen and follow the instructions.

New devices will be added to the list as the smartphone discovers them.

![Bluetooth connection](/images/users-guide/csa/csa-available-bluetooth-devices.png)

{{< c8y-admon-info >}}
If there are no supported devices in range, there is an option to see a list of all currently supported device types.
{{< /c8y-admon-info >}}

Ensure that the device you wish to connect to is switched on and in pairing mode. For most devices, this automatically happens when they are switched on and not paired with any other device. Refer to the manufacturer's instructions if you are unsure.

Bring the device close to your smartphone, 30cm or less is ideal.

When the Bluetooth device appears in the list, tap **Pair Device** to start pairing. The Bluetooth device will then be connected to your smartphone and start sending data to {{< product-c8y-iot >}} if you are currently connected.

{{< c8y-admon-info >}}
{{< sensor-app >}} supports Bluetooth simulation if you want to connect Bluetooth sensor devices without a physical device.
{{< /c8y-admon-info >}}

To enable or disable the simulation in {{< sensor-app >}}, follow the instructions at the beginning of the section to scan for connected Bluetooth devices. During the scan use the **Enable simulation** button to enable the simulation mode. Once enabled, {{< sensor-app >}} will present devices supporting the simulation mode. Continue from here as with real physical devices.

There are two ways to disable the simulation:

 * Click **Disable simulation** to end the simulation for all connected simulated devices.
 * End the simulation via the {{< sensor-app >}} settings. On Android the settings are available via the main menu. On iOS, find {{< sensor-app >}} in the System Preferences app, select **Connectivity** and disable **Simulate devices**. By disabling the simulation mode, you disconnect and remove all simulated devices.
