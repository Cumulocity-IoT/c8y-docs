---
weight: 40
title: Using smart groups
layout: redirect
outputs:
  - html
  - json
helpcontent:
  - label: using-smart-groups
    title: Using smart groups
    content: "Smart groups are groups dynamically constructed based on filtering criteria. This type of group can be used, for example, for bulk upgrades of devices of a certain type to a new software or firmware version.

    Smart groups can be created from the device list."
---

Smart groups are groups dynamically constructed based on filtering criteria. This type of group can be used, for example, for bulk upgrades of devices of a certain type to a new software or firmware version.

{{< c8y-admon-info >}}
Smart groups are only available in the Device Management application and not visible in the Cockpit application.
{{< /c8y-admon-info >}}

Smart groups can be created from the device list.

### To create a smart group {#to-create-a-smart-group}

1. To open the device list, click **All devices** in the navigator.
2. Filter the devices in the list to select the desired devices. See [To filter devices](/device-management-application/viewing-all-devices/#to-filter-devices) for details on filtering.
3. Click **Create smart group** at the right of the top menu bar.
4. Enter a name for the group and click **Create**.

The new group will appear as a top-level group in the **Groups** menu of the navigator. Smart groups can be distinguished by a small cogwheel in the folder icon <i class="c8y-icon c8y-icon-group-smart icon-20"></i>.

Below the smart group name and description you can see the filter criteria which have been applied on building the smart group. You can edit the filter settings here and adjust your selection.

![Smart groups](/images/users-guide/DeviceManagement/devmgmt-groups-smartgroups-filter.png)

### To delete a smart group {#to-delete-a-smart-group}

Hover over the respective entry you want to delete and click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> at the right.

{{< c8y-admon-important >}}
Deleting a smart group is irreversible.
{{< /c8y-admon-important >}}
