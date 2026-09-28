---
weight: 10
title: Managing firmware
layout: redirect
helpcontent:
- label: managing-firmware
  title: Firmware repository
  content: "In the firmware repository, you can collect reference firmware for devices. At the top left, you can filter the firmware items by name, description, or device type.


  See the user documentation for details on managing firmware, firmware versions and patches, and on how to install or update them on devices."
---

In the firmware repository, {{< product-c8y-iot >}} offers to collect reference firmware for devices.

Only one firmware package version can be applied per device.

### To view firmware {#to-view-firmware}

Click **Firmware repository** in the **Management** menu in the navigator.

The available firmware objects will be displayed as a list.

![Firmware list](/images/users-guide/DeviceManagement/devmgmt-firmware-list.png)

Each entry shows the firmware name, the device type it is applicable for (if set), and a label indicating if and how many versions are available for a particular firmware.
At the left in the top menu bar, you can filter the repository entries by name, description or device type. For details on the filtering functionality, see [Search and filter functionality](/get-familiar-with-the-ui/gui-features/#search-and-filter-functionality).

When clicking on an entry, the details for this firmware are displayed along with all available versions and patches.

![Firmware details](/images/users-guide/DeviceManagement/devmgmt-firmware-details.png)

At the top, the firmware name, a description, and optional device type filter(s) are shown. If a filter is set, the firmware will show up for installation only for devices of that type. If no filter is set, it will be available for all devices.

The list of versions and patches shows the version name and the name of the firmware binary. Moreover, the list indicates if a firmware version has patches, which can be viewed by expanding the version entry. The versions and patches are ordered by their creation time (descending).

### To add a new firmware or firmware version {#to-add-a-new-firmware-or-firmware-version}

1. In the **Firmware repository** page, click **Add firmware** at the right of the top menu bar.
2. In the resulting dialog box,
	* to add a new firmware, enter a name for the firmware (and confirm it by clicking **Create new** in the resulting window), add a description and its version (all required).
	* to add a new version, select the firmware for which you want to add a new version from the dropdown list in the **Firmware** field and enter a version.
3. Optionally, you can define the device type filter when adding a new firmware.
4. Select one of the following options to define the patch binary:
   - **Upload a binary** from your file system.
   - **Provide a file path (URL)** to download the binary from.
   - **Provided** – Select this option if the device is expected to resolve the binary itself. No file or URL will be defined, and an empty string is stored as the value of the `url` attribute.
5. Click **Save**.

![Add firmware](/images/users-guide/DeviceManagement/devmgmt-firmware-add.png)

The firmware object will be added to the firmware list or the firmware version will be added to the firmware details and the version label will be updated accordingly.

If you click **Add firmware** from within the details of a specific firmware, the dialog box looks slightly different as the firmware is already selected. Enter the new version number and upload a binary or provide a file path.

### To add a new firmware patch {#to-add-a-new-firmware-patch}

1. In the **Firmware repository** page, click **Add firmware patch** at the right of the top menu bar.
2. In the resulting dialog box, select the firmware, for which you want to add a patch, from the dropdown list in the **Firmware** field.
3. in the **Version** field, select the version, for which you want to add a patch.  
4. In the **Patch** field, enter a name for the patch.
5. Select one of the following options to define the patch binary:
   - **Upload a binary** from your file system.
   - **Provide a file path (URL)** to download the binary from.
   - **Provided** – Select this option if the device is expected to resolve the binary itself. No file or URL will be defined, and an empty string is stored as the value of the `url` attribute.
6. Click **Save**.

As with adding versions, if you click **Add firmware patch** from within the details of a specific firmware, the dialog box looks slightly different as the firmware is already selected.

The firmware patch will be added to the version details within the firmware details.

### To edit a firmware {#to-edit-a-firmware}

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of a specific firmware entry and in the context menu click **Edit**.
2. Update the name, description or device type filter by clicking the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> next to it. Make the desired changes and click **Save**.

The firmware will be updated accordingly.

### To delete a firmware {#to-delete-a-firmware}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of a specific firmware entry and in the context menu click **Delete**.

The object will be deleted from the firmware repository.

### To delete a firmware version or patch {#to-delete-a-firmware-version-or-patch}

In the details of a specific firmware, hover over the version or patch entry you want to delete and click the delete icon. The firmware version or patch will be deleted from the firmware details.

### To manage firmware on a device {#to-manage-firmware-on-a-device}

In the **Firmware** tab of a device you can manage the installed firmware for the device.

{{< c8y-admon-info >}}
The **Firmware** tab shows up for a device if the device supports `c8y_Firmware` operations.
{{< /c8y-admon-info >}}

Click **All devices** in the **Devices** menu in the navigator, select the desired device from the device list and open its **Firmware** tab.

The **Firmware** tab shows the current firmware installed on the device.

![Firmware tab](/images/users-guide/DeviceManagement/devmgmt-firmware-tab.png)

Additionally, it shows the operation status for the last operation (one of SUCCESSFUL, PENDING, EXECUTING, FAILED). Clicking on the operation will show you the operation details.

##### To install/replace firmware on a device {#to-installreplace-firmware-on-a-device}

1. In the **Firmware** tab, click **Install firmware** (or **Replace firmware** if there is already firmware installed on the device).
2. Select a firmware and the desired version from the list, which contains all firmware available for the particular device type (or the ones that have no device type) in the firmware repository.
3. Click **Install**.

The install operation to be executed by the device will be created. The firmware installation is completed as soon as the device has executed the operation.

Click on the operation to view its details. The status of the last operation is also shown on the **Firmware** tab.

##### To install/update firmware on multiple devices {#to-installupdate-firmware-on-multiple-devices}

{{< product-c8y-iot >}} offers the option to execute firmware updates for multiple devices at once.

1. Execute the firmware operation (install or replace) on a single device to test that the new version works.
2. Navigate to the operation in the **Control** tab and in the context menu select **Schedule as bulk operation**.
3. Fill in the fields to schedule the bulk operation and click **Create**. For details on bulk operations, see [Monitoring and controlling devices](/device-management-application/monitoring-and-controlling-devices).

The status of the bulk operation is shown in the **Bulk operations** tab under **Device control**.

Moreover, the operation details are shown in the **Control** tab of the selected devices.
