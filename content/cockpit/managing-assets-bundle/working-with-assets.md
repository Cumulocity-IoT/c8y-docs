---
weight: 20
title: Working with assets
layout: bundle
sector:
  - app_enablement
---

### To navigate assets {#to-navigate-assets}

In the asset hierarchy, {{< product-c8y-iot >}} distinguishes between top-level groups and subassets. Subassets can either be other groups or devices.

In the navigator, top-level groups are shown in the **Groups** menu at top-level. Subassets are shown under its higher-level group.

Moreover, subassets are shown in the **Subassets** tab of the particular group which is initially displayed when you click on the group in the navigator.

<img src="/images/users-guide/cockpit/cockpit-groups-subassets.png" name="Subassets"/>

{{< c8y-admon-info >}}
The count displayed on top of the table on the **Subassets** tab shows the total number of child assets assigned to the current group. Any type of managed object can be a child asset. For more details on the counting of objects refer to the operation [Retrieve all child assets of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectChildAssetsResource) in the {{< openapi >}}.

If you add a gateway device, the child devices are not shown. To show child devices, you must add them to the related asset. Details related to the child hierarchy are visible and editable in the Device Management application.
{{< /c8y-admon-info >}}

Use the navigator, to navigate through the asset hierarchy.

### Asset details {#asset-details}

Depending on the asset type (group or device), various tabs are available with detailed information.

Groups show the following tabs:

- **Subassets** - Shows group details and all subassets of a group, see also [Viewing all devices](/device-management-application/viewing-all-devices/).
- **Smart rules** - Shows smart rules specified for the group, see also [Smart rules](/cockpit/smart-rules/).
- **Data explorer** - Shows all data points of the children. For details refer to [Changing visualization](/cockpit/data-explorer/#changing-visualization).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS in groups context:

- To view all groups: READ permission for permission type "Inventory"
- To add new groups: CREATE permission for permission type "Inventory"
- To delete any group: ADMIN permission for permission type "Inventory"
- To rename a group or change group description: ADMIN permission for permission type "Inventory"
- To view specific groups: READ permissions for "Inventory" in the inventory roles
- To manage or delete specific groups: READ and CHANGE permissions for "Inventory" in the inventory roles

Note that global inventory permissions override inventory role permissions.
{{< /c8y-admon-req >}}

Devices show the following tabs:

- **Smart rules** - Shows smart rules specified for the device, see also [Smart rules](/cockpit/smart-rules/).
- **Alarms** - Displays alarms for the device, see also [Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms).
- **Data explorer** - Shows all data points of the children. For details refer to [Changing visualization](/cockpit/data-explorer/#changing-visualization).
- **Location** - Shows the current location of a device (only available with `c8y_Position`).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS in devices context:

- To view all devices within a group: READ permission for permission type "Inventory"
- To assign or unassign devices within a group: ADMIN permission for permission type "Inventory"
- To delete any device within a group: ADMIN permission for permission type "Inventory"
{{< /c8y-admon-req >}}

If dashboards have been created for a group or device, they will also be added as a tab. See [Working with dashboards](/cockpit/working-with-dashboards/) for details.

Moreover, additional tabs may be displayed here in case the application has been extended with a custom Web SDK extension. Refer to the [{{< sag-dev-community >}}]({{< link-sag-tech-forum >}}) for a tutorial on adding custom tabs.



### To add a group {#to-add-a-group}

1. Click **Add group** at the right of the top menu bar.
2. In the resulting dialog box, enter a unique group name and an optional description and click **Next**.
3. In the list, select the devices you want to add. You may apply filters to reduce the number of displayed devices.
4. Click **Create** to create the new group.

The new group will be added to the groups list.

{{< c8y-admon-info >}}
A group can be created with "0" devices in it.
{{< /c8y-admon-info >}}

To add a new group as a child of an existing asset, navigate to its **Subassets** tab and click **Add Group** in the top menu bar.

### To edit a group {#to-edit-a-group}

1. In the navigator, click a group to open it.
2. In the **Subassets** tab, you can edit the name and description of the group.

### To delete a group {#to-delete-a-group}

To delete a group either on top-level from the **Groups** page or from the **Subassets** tab of another group, hover over the respective entry you want to delete and click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> at the right.

In the resulting dialog box, you can select to also delete all devices inside the selected asset and all its subassets.

### To assign devices to a group {#to-assign-devices-to-a-group}

Before adding a device to the asset hierarchy, it must be connected to {{< product-c8y-iot >}}. Connecting devices to the platform is done in the Device Management application. For details on connecting devices refer to [Device Management application](/device-management-application/registering-devices/).

To assign devices to a group, follow these steps:

1. In the navigator, select a group from the **Group** menu and then open the **Subassets** page.
2. Click **Assign devices** at the right of the top menu bar.
3. In the list, select the devices you want to add. You may apply filters to reduce the number of displayed devices.
4. Click **Assign** to assign the selected devices.

The devices will be assigned to the selected group and shown as subassets in the **Subassets** page.

### To remove a device from a group {#to-remove-a-device-from-a-group}

1. Navigate to the **Subassets** tab of the group.
2. Hover over the respective device you want to remove and click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> at the right.

Removing a device does not delete the device, subdevices or any associated data. The device is only removed from its location in the asset hierarchy. It can be assigned to this group or other groups later.
