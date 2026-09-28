---
weight: 20
title: Managing devices in groups
layout: redirect
---

### To assign devices to a group {#to-assign-devices-to-a-group}

You can assign devices to groups in several ways.

**From the group perspective**

You can quickly assign devices to groups by using the drag and drop functionality in the navigator, see [Restructuring groups and devices](#restructuring-groups-and-devices).  

Moreover, you can assign devices performing the following steps:

1. In the navigator, select a group from the **Group** menu and then open the **Subassets** page.
2. Click **Assign devices** at the right of the top menu bar.
3. In the list, select the devices you want to add. You may apply filters to reduce the number of displayed devices.
4. Click **Assign** to assign the selected devices.

![Assign devices](/images/users-guide/DeviceManagement/devmgmt-group-assign.png)

The devices will be assigned to the selected group and shown as subassets in the **Subassets** page.

**From the device perspective**

1. Select a device from the device list and open it.
2. In the **Info** tab, scroll down to the **Groups assignment** card. From the dropdown field, select the group you want to assign the device to. You can also directly enter a group name here or you can enter just parts of a name to filter the list for it and only show the matching group names.
3. Click **Assign**.

The device will be assigned to the selected group.

If you search for a group by its name which does not exist yet, a **New** button will appear so that you can create a new group with this name from here and assign the device to that group.

{{< c8y-admon-info >}}
In order to create a new group, the user must have the permissions ROLE&#95;INVENTORY\_CREATE and ROLE&#95;INVENTORY\_ADMIN.
{{< /c8y-admon-info >}}


### To unassign a device {#to-unassign-a-device}

Hover over the respective device you want to unassign and click the unassign icon <i class="dlt-c8y-icon-link-off text-primary"></i> at the right.

Unassigning a device does not delete the device, subdevices or any associated data. The device is only removed from this group.

### To delete a device {#to-delete-a-device}

Hover over the respective device you want to delete and click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> at the right.

The device will be permanently deleted.

### To view the device details {#to-view-the-device-details}

To display the details of a particular device, click its name.

The device details for the device will be displayed.
