---
weight: 50
title: LWM2M device details
layout: redirect
---

{{< c8y-admon-info >}}
In the Device management application, you can view all details of a device. The following details are specific to LWM2M devices. For information on general details refer to [Viewing device details](/device-management-application/viewing-device-details) in the Device management section.
{{< /c8y-admon-info >}}

### Objects {#objects}

In the **Objects** tab of a LWM2M device, you can view all objects, resources and instances of the device. Additionally, you can create new operations, see all currently pending operations and view the history of all previous operations.

![Objects view](/images/device-protocols/lwm2m/lwm2m-objects.png)

{{< c8y-admon-info >}}
In order to see resources in the **Objects** tab, the resources first must be added in the **Device Protocols** page.
{{< /c8y-admon-info >}}

The following operations may be available in each instance after clicking the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the end of each object row:

- Read Object: Reads all instances for the selected object and lists all available resources for each instance.
- Read Instance: Reads the current instance of the given object and lists all available resources.
- Create Instance: Creates a new instance for the selected object.
- Delete Instance: Deletes the selected instance.

{{< c8y-admon-info >}}
Some instances do not have all of the listed operations.
{{< /c8y-admon-info >}}

Some object cards show additional operations which can be performed. These operations become available after reading the object/instance. The possible options are **Write**, **Execute** and **Execute with parameters**. For example, after reading device **Firmware update** in order to perform the operation **Execute** without parameters, find the **Update** section on the object card and click **Execute**. To perform an operation with parameters click **Execute with parameters** and enter a value.

More information can be acquired for each resource by hovering over the help icon <i class="dlt-c8y-icon-help-outline text-info icon-20"></i> present on the right of the field name.

Additional information on recent operations can be viewed by clicking the operations button located at the right side of an instance card. The button is only visible if any operation has been performed. The number of unread operations can be seen on the top right of the button. In the example below there are two.

![Operations view](/images/device-protocols/lwm2m/lwm2m-devices-operations.png)

To view the history of all operations, click **View history**. Note, that you will be redirected to the **Control** tab.

#### Audit Configuration {#audit-configuration}

{{< c8y-admon-important >}}
As announced in the release notes for [release 10.18](https://{{< domain-c8y >}}/releasenotes/release-10-18-0/announcements-10-18-0), the LWM2M device audit configuration feature is deprecated. This feature will be disabled by default in a future version.
{{< /c8y-admon-important >}}

In the **Audit configuration** page you can audit the current device by comparing it to a selected reference device. It is also possible to sync properties to the values of the referenced device.

Click **Audit configuration** in the right of the top menu bar to navigate to the **Audit configuration** page.

To sync properties, select the desired reference device from the dropdown list. Check the properties that you wish to sync and click **Sync selected properties**.

{{< c8y-admon-info >}}
The numbers in the green circles represent the number of properties in the instance which have the same value in both devices. Respectively, the numbers in the red circles represent the number of properties which have different values compared to the values of the referenced device. If an instance is expanded, you can select only specific properties which can be synced.
{{< /c8y-admon-info >}}

### LWM2M configuration {#lwm2m-configuration}

The **LWM2M configuration** tab displays all LWM2M settings related to the device. These settings are grouped logically by the function they affect.

* **Device settings** - General device parameters:
  * Endpoint ID
  * Awake time
  * Request timeout
  * Serialization format
  * Binary format
  * Timestamp resources
  * Objects tab behavior (keep old values)
  * Disable the default behavior for object instances of objects 3 (device), 4 (connectivity monitoring) and 6 (location)
  * Automatic setting of required interval
* **Bootstrap settings** - related to LWM2M bootstrap
  * Bootstrap server ID
  * Security instance offset
* **Servers to write during bootstrap** - list of servers that will be written to the device when it bootstraps. Each server has:
  * Server URI
  * Server ID
  * Registration lifetime
  * Default min period
  * Default max period
  * Binding mode
  * Disable timeout
  * Security mode
    * depending on the selected mode there are additional settings for PSK and X.509
  * Notifications flag
* **Connectivity settings** - security configuration for bootstrap and regular LWM2M connection.
* **Firmware update settings**
  * Disable automated firmware update support
  * Firmware URL
  * Delivery method
  * Delivery protocol
  * Reset state machine settings

For a detailed description of the parameters above, see [Registering LWM2M devices](#registering-lwm2m-devices).

### LWM2M client awake time {#lwm2m-client-awake-time}

LWM2M client awake time specifies how long a device can be expected to be listening for incoming traffic before it goes back to sleep. The LWM2M server uses the client awake time to determine if the operations are passed down to a device.
The operations are sent during the awake time after the registration or after the registration update request is received by the LWM2M server.
After the awake time has passed, the operations are being queued and will be sent to the device on the next registration or registration update.
This applies to all operations that can be applied to the device.

LWM2M client awake time is determined based on the following priority:
1. (If provided) Device managed object &ldquo;awakeTimeRegistrationParameter&rdquo; fragment.
2. (If provided) Registration awake time attribute &ldquo;at&rdquo; in the registration request by the LWM2M client.
3. Global setting of the LWM2M microservice.

Device managed object &ldquo;awakeTimeRegistrationParameter&rdquo; fragment can be provided during the device registration as explained in [Registering LWM2M devices](/protocol-integration/lwm2m/#registering-lwm2m-devices) or set with the managed object update request as in the example:
```
PUT /inventory/managedObjects/<device-managed-object-id>

{
    "awakeTimeRegistrationParameter": 180000
}
```
The value is in milliseconds. If set to 0, the device will be considered as always online.
