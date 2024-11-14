---
weight: 45
title: Updating Edge remotely
layout: bundle
sector:
  - edge_server
---

You can remotely update your Edge appliance using the {{< product-c8y-iot >}}'s firmware update feature. This process requires you to upload the Edge archive file (tar.gz) to your tenant account or a server (you must provide the location of the archive on that server). For more information about the firmware feature, see [Managing firmware](/device-management-application/managing-device-data/#managing-firmware).

{{< c8y-admon-important >}}
The Edge archive file size is about 3GB. If your tenant account has a limitation for uploading files with size over 1GB, contact {{< company-sag >}} support to increase the maximum file size for upload.
{{< /c8y-admon-important >}}

Before you update your Edge appliance remotely, you must:

- [Enable the remote-connectivity](/edge/edge-connectivity/#config-remote-connectivity) feature in your Edge appliance
- [Register your Edge appliance](/edge/edge-connectivity/#registering-the-edge-appliance-in-the-cumulocity-iot-tenant) in your {{< product-c8y-iot >}} tenant account

To remotely update your Edge appliance:

1. Log in to your {{< product-c8y-iot >}} tenant account.

2. Go to the Device Management application.

3. Click **Firmware repository** in the **Management** menu in the navigator.

   ![Firmware list](/images/users-guide/DeviceManagement/devmgmt-firmware-list.png)

4. Click **Add firmware** at the right of the top menu bar.

5. Provide a name for the firmware, add a description and its version (all required).

6. Optionally, you can define the device type filter when adding a new firmware. For example, *c8y_EdgeAgent*.

7. Select the **Provide a file path** option to specify an HTTPS URL of a server from where the archive file can be downloaded.

8. Click **Add firmware**. The firmware object appears in the firmware list.

9. Click **All devices** in the **Devices** menu in the navigator, select your Edge appliance from the device list.

10. Click **Firmware**. The **Firmware** tab shows the current Edge appliance version.

    ![Edge current version](/images/edge/edge-firmware-current-version.png)

    You can also see the current Edge appliance version in the **Info** tab.

    ![Edge version info tab](/images/edge/edge-firmware-version-info-tab.png)

11. Click **Replace firmware**.

12. Select the firmware that you just uploaded and click **Install**.
    ![Edge firmware selection](/images/edge/edge-select-firmware.png)

    - To check the status of the update, hover over the refresh icon <i class="dlt-c8y-icon-refresh text-info icon-20"></i> as shown in the figure below:
    ![Edge update status](/images/edge/edge-check-remote-update-status.png)
    - To check the details of the update, click the text outlined in red in the figure below:
    ![Edge update log](/images/edge/edge-check-remote-update-full-log.png)

13. Restart your Edge appliance after the firmware update is complete. You can remotely restart your Edge appliance from your tenant account as shown in the figure below:
    ![Edge update restart](/images/edge/edge-firmware-update-restart.png)

### Updating Edge appliances using bulk operations {#updating-edge-appliances-using-bulk-operations}

In your tenant account, you can update multiple Edge appliances using the bulk operations feature. To do so, follow the steps below:

1. Log in to your {{< product-c8y-iot >}} tenant account.

2. Go to the Device Management application.

3. Click **Device control** in the **Overviews** menu in the navigator.
   ![Edge bulk operation](/images/edge/edge-bulk-operation-page.png)

4. Click **Bulk operations** and then click **New bulk operation**.
   ![New bulk operation](/images/edge/edge-new-bulk-operation.png)

5. Click **Firmware update**.
   ![Edge bulk firmware update](/images/edge/edge-bulk-operation-firmware-update.png)

6. Select a firmware from the list. The list can be filtered by firmware name. Click **Next**.

7. Expand the version and select the archive file. Click **Next**.
   ![Edge bulk firmware selection](/images/edge/edge-bulk-operation-select-version.png)

8. Select the Edge appliances that you want to update by applying filters to the paginated list of all devices.

   You can filter by status, name, type, model, group, registration date and alarms. You may apply multiple filters. To apply a filter, click the column header,  make your filter option choices in the context menu and click **Apply**.
   ![Edge bulk operation filter](/images/edge/edge-bulk-operation-filter.png)

9. Enter a new title or use the preset title. Optionally enter a  description. Select a start date and a delay. The delay may either be in seconds or milliseconds and is the time spent between each single operation of the bulk operation. Click **Schedule bulk operation** to create the bulk operation.
   ![Edge schedule bulk operation](/images/edge/edge-schedule-bulk-operation.png)

For more information about bulk operations, see [Working with operations](/device-management-application/monitoring-and-controlling-devices/#working-with-operations).
