---
weight: 20
title: Managing software
layout: redirect
helpcontent:
- label: managing-software
  title: Software repository
  content: "In the software repository, you can collect reference software for devices. Multiple software packages can be installed on a device. At the top left, you can filter the repository entries by name, description, or device type.


  See the user documentation for details on managing software and software versions and on how to install or update them on devices."

---

In the software repository, {{< product-c8y-iot >}} offers to collect reference software for devices. Multiple software packages can be installed on a device.

### To view software {#to-view-software}

Click **Software repository** in the **Management** menu in the navigator.

The available software objects will be displayed as a list.

![Software list](/images/users-guide/DeviceManagement/devmgmt-software-repository.png)

Each entry shows the software name, the device type it is applicable for (if set), the software type (if set), and a badge indicating if and how many versions are available for a particular software.
The values in every column except for the **Versions** column can be filtered and sorted by clicking the filter <i class="dlt-c8y-icon-filter icon-20"></i> and sort <i class="dlt-c8y-icon-sort-arrow icon-20"></i> icons in the column header.

When clicking on an entry, the details for this software are displayed along with all available versions.

![Software details](/images/users-guide/DeviceManagement/devmgmt-software-details.png)

At the top, the software name, a description, an optional device type filter(s), and a software type are shown.
If a device type filter is set, the software will show up for installation only for devices of that type.
If no filter is set, it will be available for all devices.
The software type will make the software installable only on devices that specifically support the particular software type.

{{< c8y-admon-info >}}
The **Software type** field suggests you a list of types already used in your software repository. Before you consider defining a new software type (the field accepts new values directly) check if the type you need has already been defined before for another software by looking at the suggestions in the dropdown. This will help you keep software types consistent within your organization. If you use, for example, container images you may look for `container` or `image`, or try to search for more specific types like `docker`, `lxc`, and so on. This may prevent you from scattering your software types and using different names for effectively the same software type.
{{< /c8y-admon-info >}}

The list of versions shows the version name and the name of the software binary.
The versions are ordered by their creation time (descending).

### To add a new software or software version {#to-add-a-new-software-or-software-version}

1. In the **Software repository** page, click **Add software** at the right of the top menu bar.
2. In the resulting dialog box,
	* to add a new software, enter a name for the software (and confirm it by clicking **Create new** in the resulting window), a description, and its version (all required).
	* to add a new version, select the software for which you want to add a new version from the dropdown list in the **Software** field and enter a version.
3. Optionally, you can define the device type filter when adding a new software.
4. Define the software type. It will make the software installable only on devices that have declared to support the particular software type.
5. Select one of the following options to define the binary:
   - **Upload a binary** from your file system.
   - **Provide a file path (URL)** to download the binary from.
   - **Provided** – Select this option if the device is expected to resolve the binary itself. No file or URL will be defined, and an empty string is stored as the value of the `url` attribute.
6. Click **Add software**.

![Add software](/images/users-guide/DeviceManagement/devmgmt-software-add.png)

The software object will be added to the software list or the software version will be added to the software details and the version count label will be updated accordingly.

If you click **Add software** from within the details of a specific software, the dialog box looks slightly different as the software is already selected. Enter the new version number and upload a binary or provide a file path.

### To edit a software {#to-edit-a-software}

1. Click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> at the right of a specific software item.
2. Update the name, description, device type filter or software type by hovering over the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> next to it. Make the desired changes and click **Save**.

The software will be updated accordingly.


### To delete a software {#to-delete-a-software}

Click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> at the right of a specific software item and in the context menu click **Delete**.

The software and all its versions will be deleted from the software repository.

### To delete a software version {#to-delete-a-software-version}

In the details of a specific software, hover over the version entry you want to delete and click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i>. The software version will be deleted from the software details.

If the last version of a software is deleted, the software is entirely removed from the repository.

### To manage software on a device {#to-manage-software-on-a-device}

In the **Software** tab of a device you can manage the software for the particular device.

{{< c8y-admon-info >}}
The **Software** tab shows up for a device if the device supports one of the following operations: c8y&#95;SoftwareUpdate, c8y&#95;SoftwareList, c8y&#95;Software.
{{< /c8y-admon-info >}}

Click **All devices** in the **Devices** menu in the navigator, select the desired device from the device list and open its **Software** tab.

The **Software** tab shows a list of all available software installed on the device. If a given software has a type, it will be displayed next to its name. You can search for a particular software by its name or filter the list by software type.

![Software tab](/images/users-guide/DeviceManagement/devmgmt-software-tab.png)

Additionally, it shows the operation status for the last operation (one of SUCCESSFUL, PENDING, EXECUTING, FAILED). Clicking on the operation will show you the operation details.

#### To install software on a device {#to-install-software-on-a-device}

1. In the **Software** tab, click **Install software**.

    {{< c8y-admon-info >}}
The **Install software** dialog will only display software items which match the device type or have no device type specified. Additionally, if the device has any `c8y_SupportedSoftwareTypes` declared the dialog will only display the software items matching the supported software types.
    {{< /c8y-admon-info >}}

2. Select one or multiple software items by selecting the respective version from the list which contains all software items for the particular device type available in the software repository.  
For devices supporting advanced software management features, already installed software items cannot be pre-filtered from the list of available software items. Thus, after a particular software version has been selected, a check is done if the selected software is already installed on the device. If this is the case, a warning next to the selected version indicates that this software version is already present on the device.  
You can remove the already installed software item under **Software changes** or leave it and apply it as part of the changes. It is up to the device agent to decide how to handle such an update.

3. Click **Install**.

4. Under **Software changes** at the right, review your planned changes and confirm the software update operation by clicking **Apply changes**.

The install operation to be executed by the device will be created. The software installation is completed as soon as the device has executed the operation.

Click on the operation to view its details. The status of the last operation is also shown on the **Software** tab.


#### To update software on a device {#to-update-software-on-a-device}

Hover over the software item which you want to update and click **Update**.
Select a version from the list and click **Update** again.

The software will be updated with the selected version.

#### To delete software from a device {#to-delete-software-from-a-device}

Hover over the software item which you want to delete and click the delete icon.

#### To install software on multiple devices {#to-install-software-on-multiple-devices}

{{< product-c8y-iot >}} offers the option to execute software updates for multiple devices at once.

1. Execute the software operation (install or update) on a single device to test that the new version works.
2. Navigate to the operation in the **Control** tab and in the context menu select **Schedule as bulk operation**.
3. Fill in the fields to schedule the bulk operation and click **Create**. For details on bulk operations, see [Monitoring and controlling devices](/device-management-application/monitoring-and-controlling-devices).

The status and details of the bulk operation are shown in the **Bulk operations** tab under **Device control**.

Moreover, the operation details are shown in the **Control** tab of the selected devices.
