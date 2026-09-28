---
weight: 20
title: To replace a device
layout: redirect
---

The device list supports the replacement of a physical device with another by preserving the original device representation in the platform including all its generated data. A wizard guides you through this process. Access the wizard by hovering over the device you want to replace in the device list and click the **Replace device** button.

{{< c8y-admon-info >}}
Currently LWM2M devices are not supported and the **Replace device** button is not available for this type of devices.
{{< /c8y-admon-info >}}

In the **Replacement device** step you can see the list of devices available in the platform excluding the device which you are going to replace. Select a replacement device from the list.

{{< c8y-admon-info >}}
In order for a particular replacement device to show up in the list, you must register it through the corresponding [registration process](/device-management-application/registering-devices/) for this device.
{{< /c8y-admon-info >}}

The **Select external IDs** step lists the external IDs assigned to the replacement device. Select those you want assigned to the device representation of the replaced device. You must select at least one external ID. This links the data which your new physical devices sends to the original device representation object.

Before proceeding with the actual replacement, you must confirm this action. Click **Replace** in the **Replace device** dialog.

{{< c8y-admon-important >}}
The replacement process removes the replacement device from the {{< product-c8y-iot >}} database including all the data generated for it so far.
{{< /c8y-admon-important >}}

The **Replace** step displays the progress of the replacement process and the result of every step executed.

![Replace device](/images/users-guide/DeviceManagement/devmgmt-replace-device-wizard.png)<br>

If a step has been skipped you will find an icon with a tooltip which contains the reason why the step has been skipped.

If the execution of a given step has failed, you can see the error details by expanding the step details. Note that an error in one of the steps will not prevent the next steps from being executed. The wizard will try to execute as many steps as possible and provide information about failed steps. If you are able to resolve the reason for the failure(s), you can retry all failed steps by clicking the **Retry** button in the bottom bar. If you wish to retry a single failed step you can only do so by clicking the **Retry this step** button form the step actions dropdown.

The **Close** button brings you back the the updated device list. The replacement device will have been removed from {{< product-c8y-iot >}} while all data sent by the new physical device will be linked to the platform representation of the original device. This ensures that the physical replacement remains transparent to users.

In order to keep track of the replacements done for a given device an [event](/device-management-application/viewing-device-details/#events) and an [audit log](/standard-tenant/monitoring/#audit-logs) are created for every replacement.
