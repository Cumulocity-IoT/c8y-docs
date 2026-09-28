---
weight: 20
title: Connection monitoring
layout: redirect
---

In the Device Management application you can monitor the connections to your devices.

This can be done at the level of individual devices (see below) or across multiple devices in a list.

### To monitor the connection for multiple devices {#to-monitor-the-connection-for-multiple-devices}

Open a device list to monitor the connections for multiple devices.

The connection status is represented by arrows in the **Status** column in the device list.

<img src="/images/users-guide/DeviceManagement/devmgmt-devices-connectionstatus.png" alt="Connection Status">

**Send connections**

The top arrow represents the send connection (traffic from the device to {{< product-c8y-iot >}}). The status for the send connections may be one of:

* Online (data was sent within the required interval)- indicated by a green arrow <i class="dlt-c8y-icon-long-arrow-right text-success-dark icon-20"></i>.
* Offline (data was not sent within the required interval) - indicated by a red arrow <i class="dlt-c8y-icon-long-arrow-right text-danger icon-20"></i>.
* Unknown or not monitored (no interval configured) - indicated by a grey arrow <i class="dlt-c8y-icon-long-arrow-right text-muted icon-20"></i>.

Hovering over the arrow displays the timestamp of the last request from the device to the server.

When a device is detected to be offline (stops sending data within required interval and top arrow changes to red color), an unavailability alarm is created for the device: "No data received from device within required interval".

Send connections are updated when something is sent from the device, such as alarms, events, measurements or if a blank update is sent to the device itself. For details see [Device availability](/device-integration/fragment-library/#device-availability).

{{< c8y-admon-info >}}
Empty PUT requests to the managed object of the device will also update a send connection. Such requests are the recommended way of implementing a heartbeat service that monitors the server status.
{{< /c8y-admon-info >}}

**Push connections**

The bottom arrow represents the push connection (from {{< product-c8y-iot >}} to the device). The status for the push connections may be one of:

* Online (connection established)- indicated by a green arrow <i class="dlt-c8y-icon-long-arrow-left text-success-dark icon-20"></i>.
* Offline (connection not established) - indicated by a red arrow <i class="dlt-c8y-icon-long-arrow-left text-danger icon-20"></i>.
* Not monitored - indicated by a grey arrow <i class="dlt-c8y-icon-long-arrow-left text-muted icon-20"></i>.

A push connection is an active HTTPS long poll connection to the <kbd>/notification/operations</kbd> API endpoint or an active MQTT connection to the MQTT endpoint of {{< product-c8y-iot >}}.
It is always green if the device is connected, even without data.

{{< c8y-admon-info >}}
Connection monitoring is not real time. This means that the displayed connection status will not change immediately after switching off a device. Depending on the used protocol for push connection monitoring this can take a couple of minutes.
{{< /c8y-admon-info >}}

**Maintenance mode**

Moreover, the device may be in "Maintenance" mode, indicated by the tool icon <i class="dlt-c8y-icon-wrench1 text-warning icon-20"></i> in the **Status** column. This is a special connection status indicating that the device is currently being maintained and cannot be monitored. While a device is being maintained, no alarms for that device are raised.

You can turn the maintenance mode on or off for a device through a toggle in the **Connection monitoring** card in its **Info** tab, see below.


### To monitor the connection of a particular device {#to-monitor-the-connection-of-a-particular-device}

Navigate to the **Info** tab of a particular device to monitor the connections of this device. Under **Device status**, the connection status for the device is displayed.

<img src="/images/users-guide/DeviceManagement/devmgmt-devices-deviceinfostatus.png" alt="Device Status">

Below the send connection and push connection status, the time of the last communication is displayed.

{{< c8y-admon-info >}}
"Last communication" and "Last updated" are two entirely different time stamps. "Last communication" indicates when a device has last sent data. "Last updated" indicates when the inventory entry of the device was last updated. This update may have originated from the device, from the web user interface or from another application.
{{< /c8y-admon-info >}}

In the  **Required interval** field you can specify an interval. This parameter defines how often you expect to hear from the device. If, for example, you set the required interval to 60, you expect the device at least to communicate once in an hour with {{< product-c8y-iot >}}. The interval is either set by the device itself, based on the device's knowledge how often it will try to send data, or it is set manually by you.

If an interval is set, you will find the **Maintenance** toggle below it.

With the **Maintenance** toggle you can turn the maintenance mode for the device on or off which is immediately reflected in the connection status.
