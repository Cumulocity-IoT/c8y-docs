---
weight: 30
title: Availability
layout: redirect
helpcontent:
- label: availability
  title: Availability monitoring
  content: "Availability shows the availability across all devices for the last 24 hours, last 7 days and last 30 days. The availability is based on raised and cleared alarms and shown in percentage."
---

{{< c8y-admon-info >}}
The **Availability** tab on device detail pages and the **Devices > Availability** page are deprecated and planned for removal before the y2028 release. See the [deprecation announcement](/change-logs/#ui-c8y-DM-7021-deprecate-availability-donut-charts) for details.
{{< /c8y-admon-info >}}

{{< product-c8y-iot >}} distinguishes between connection monitoring and availability. Connection monitoring, as described in the previous section, only indicates if the device is communicating with {{< product-c8y-iot >}}, it does not automatically indicate if it is functional or not.

Availability indicates if a device is in service. For example, a vending machine is in service if it is ready to sell goods. A vending machine can sell goods using cash money without a connection to {{< product-c8y-iot >}}. From the perspective of a merchant, it is in service. Similar, if you switch off the power on a gateway, the devices behind the gateway can still continue to work.

{{< product-c8y-iot >}} considers a device to be in service while there is no critical, unresolved alarm present for the machine. This is displayed as a share of time such an alarm was present. If a machine didn't have any critical alarms whatsoever during a time period, it was 100% in service. If half of the time there was some critical, unresolved alarm, the machine was 50% in service.

While a machine is offline, {{< product-c8y-iot >}} assumes by default

* that the machine continues to stay in service during the connection outage, if this was the status before it lost connection.
* that the machine continues to stay out of service, if this was the status before it lost connection.

There may be exceptions from this rule. If your vending machines rely exclusively on cashless payment, losing the connection to the network means that your machine is out of service and stops selling. In this case, unavailability alarms must be set in the [Administration application](/standard-tenant/alarm-mapping) which have CRITICAL severity instead of MAJOR severity.

{{< product-c8y-iot >}} displays service availability at the level of individual devices and across all devices.

### To view the availability of a particular device {#to-view-the-availability-of-a-particular-device}

Click the **Availability** tab in the details of a particular device to check the availability of this device.

### To view the availability across all devices {#to-view-the-availability-across-all-devices}

Click **Availability** in the **Device** menu in the navigator to display the overall service across all devices.

![Availability](/images/users-guide/DeviceManagement/devmgmt-devices-availability.png)

The **Availability** page shows the availability of devices for the last 24 hours, last 7 days and last 30 days in percentage.
