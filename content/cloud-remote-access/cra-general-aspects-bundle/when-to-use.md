---
title: When to use Cloud Remote Access
weight: 30
layout: bundle
---

To provide the best level of control, remote devices should be represented as devices in the [Device Management application](/device-management-application) of {{< product-c8y-iot >}}, with the corresponding reporting, remote control and real-time functionality.

In some cases however, it is not possible or not economic to implement every aspect of a machine or remote device in a {{< product-c8y-iot >}} agent. For example, in case of a legacy device that does not have APIs for accessing certain parts of the functionality, or in case of a device that has many very low-level configuration parameters that would be very involved to map to {{< product-c8y-iot >}}.

In these cases, you can use Cloud Remote Access to securely manage remote devices. The benefit is that you manage the device in the same way as if you had it physically close to you.

{{< c8y-admon-important >}}
Be aware that using Cloud Remote Access includes administrative intervention:

* Often, devices have no detailed permission management, so you give a user very fundamental access to the device.
* When using {{< product-c8y-iot >}} to remotely operate machinery, make sure that all remote operations follow the safety standards.
{{< /c8y-admon-important >}}
