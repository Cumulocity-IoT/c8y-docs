---
weight: 60
title: Managing device profiles
layout: redirect
helpcontent:
- label: managing-device-profiles
  title: Device profiles
  content: "Device profiles represent a set of a firmware version, one or multiple software packages, and one or multiple configuration files which can be deployed on a device. Based on device profiles, you can easily deploy a specific target configuration on devices by using bulk operations.


  See the user documentation for details on managing device profiles and on applying device profiles to devices."

---

Device profiles represent a combination of a firmware version, one or multiple software packages, and one or multiple configuration files which can be deployed on a device. Based on device profiles, users can deploy a specific target configuration on devices by using bulk operations.

### To view device profiles {#to-view-device-profiles}

Click **Device profiles** in the **Management** menu in the navigator to access the **Device profiles** page, which lists all available device profiles.

![Device profiles list](/images/users-guide/DeviceManagement/devmgmt-device-profile-list.png)

Each device profile entry shows the profile name and the selected device type(s), if any.

Click a device profile name to view its details.

The **Name and device type** section shows the name of the profile and optionally selected device types.

The sections below list the firmware version, software packages, and configuration files for this particular device profile.

![Device profile details](/images/users-guide/DeviceManagement/devmgmt-device-profile-details.png)

### To add a device profile {#to-add-a-device-profile}

Click **Add device profile** at the right of the top menu bar, to add a new device profile.

In the **Add device profile** window, provide a name for the profile and optionally enter one or more device types. If a device type is provided, the device profile can only be assigned to devices of the specified type. If left empty, it will be available for all device types.

### To add items to a device profile {#to-add-items-to-a-device-profile}

In the device profile details, you can add firmware versions, software packages, and configuration files.

Click **Add firmware** to add a firmware version to the profile. Select a firmware and a version from the list and click **Save** to add the selection to the profile. If a device type has been defined for the profile, only those firmware versions can be selected that match the device type. Only one firmware version can be added to a profile.

For details on firmware, see [Managing firmware](#managing-firmware).

Click **Add software** to add a software package to the profile. Select a software and a software version from the list and click **Save** to add the selection to the profile. If a device type has been defined for the profile, only those software versions can be selected that match the device type. You can add multiple software packages to a profile.

For details on software, see [Managing software](#managing-software).

Click **Add configuration** to add a configuration file to the profile. Select a configuration file from the list and click **Save** to add the selection to the profile. You can add multiple configuration files to a profile.

For details on configuration snapshots, see [Managing configurations](#managing-configurations).

### To update device profiles {#to-update-device-profiles}

To update a device profile click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective device profile entry and then click **Edit**.

You may edit the name and the device types by clicking the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> next to the respective fields. Make the desired changes and click **Save** to save your edits.

Moreover, you can delete firmware, software or configuration items or add new ones.

To delete an item, hover over it and click the delete icon.

See [To add items to a device profile](#to-add-items-to-a-device-profile) for details on how to add firmware, software or configuration items.

Note that in case of firmware, only one item is allowed in a profile at a time.


### To duplicate device profiles {#to-duplicate-device-profiles}

To duplicate a device profile, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective device profile entry and then click **Duplicate**.

Duplicating a profile creates another instance of the profile with the same content. Per default, the original profile name is extended with "Copy of". You may give the profile a more appropriate name by clicking the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> next to the name field and editing it.

### To delete device profiles {#to-delete-device-profiles}

To delete a device profile, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective device profile entry and then click **Delete**.

{{< c8y-admon-info >}}
Deleting a profile deletes the entry from the device profile repository. It has no affect towards the devices that currently use the profile.
{{< /c8y-admon-info >}}

### To apply device profiles to devices {#to-apply-device-profiles-to-devices}

Device profiles can be assigned to:

* [Individual devices](#to-apply-device-profiles-to-a-single-device)
* [Multiple devices through bulk operations](#to-apply-device-profiles-to-multiple-devices)

The **Device profile** tab of a particular device shows the details of the currently installed profile on a device.

![Currently installed profile](/images/users-guide/DeviceManagement/devmgmt-device-profile-tab.png)

{{< c8y-admon-info >}}
The **Device profile** tab shows up for a device if the device supports `c8y_DeviceProfile` operations.
{{< /c8y-admon-info >}}

#### To apply device profiles to a single device {#to-apply-device-profiles-to-a-single-device}

Device profiles can be applied to individual devices in the **Device Profile** tab of the particular device.

1. In the **Device profile** tab, select a device profile from the dropdown list. Only profiles that match the device type (if specified) or have no device type specified are displayed.
2. Click **Assign device profile** to start the update operation.

#### To apply device profiles to multiple devices {#to-apply-device-profiles-to-multiple-devices}

Device profiles can be applied to multiple devices by using bulk operations.

1. Click **Device control** in the **Overview** menu to navigate to the **Device control** page. In the **Device control** page, a new bulk operation can be created to apply a device profile.
2. In the **Bulk operations** tab, click **New bulk operation** at the right of the top menu bar and in the resulting dialog select **Apply device profile**.
3. Follow the steps described in [To add a bulk operation](/device-management-application/monitoring-and-controlling-devices/#to-add-a-bulk-operation) to schedule a bulk operation which applies a device profile.

The devices will install the firmware, software, and configurations items of the profile and report back the status of the operation. After applying the profile, the device objects in the platform are updated accordingly with the new profile information.

{{< c8y-admon-info >}}
When creating bulk operations, it is possible to use filters, and by this create bulk operations only for those devices where a profile has not been applied yet.
{{< /c8y-admon-info >}}
