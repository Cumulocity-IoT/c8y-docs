---
weight: 30
title: Managing configurations
layout: redirect
helpcontent:
- label: managing-configurations
  title: Configuration repository
  content: "In the configuration repository, you can store and manage configuration data retrieved from your devices as 'configuration snaphots'. The configuration data contains the parameters and the initial settings of a device. Such configuration snapshots help you, for example, to apply the same configuration to multiple devices.


  See the user documentation for details on how to retrieve configuration data, and how to store and manage it in the configuration repository as snapshot."

---

{{< product-c8y-iot >}} allows to retrieve configuration data and store and manage it in a configuration repository. The configuration data contains the parameters and the initial settings of your device.

Configuration snapshots help you, for example, to apply the same configuration to multiple devices as described below.

Click **Configuration repository** in the the **Management** menu in the navigator. In the **Configuration repository** page, all available configuration snapshots are listed. Each entry shows the configuration name, the description of the configuration, the device type, and the configuration type.

![Configuration Repository](/images/users-guide/DeviceManagement/devmgmt-management-configrepo.png)

### To add a configuration snapshot {#to-add-a-configuration-snapshot}

1. Click **Add configuration snapshot** at the right of the top menu bar.
2. In the panel that opens, enter a unique name.
3. In the **Device type** field, enter a device type. The device type can be found in the **Info** tab of the target device.
4. Optionally enter a description for the configuration.
5. Enter the configuration type, for example "ssh".
6. Under **Configuration file**, provide the configuration content in one of the following ways:
   - **Upload a binary**: Drag a file into the drop area or browse for a file on your file system. When you upload a text file, its content opens in the code editor so that you can review and adjust it before saving.
   - **Provide a file path**: Enter a URL from which the device can obtain the configuration snapshot. External URLs only work with devices that support typed file-based configuration, not with devices using legacy configuration.
   - **Edit inline**: Enter a filename and write the configuration content directly in the built-in code editor. This lets you create a configuration snapshot without preparing a file outside the application.
7. Click **Add configuration**.

The configuration snapshot will be added to the configuration repository.

{{< c8y-admon-info >}}
When a text file is opened in the editor, its syntax highlighting is detected automatically from the file extension. Use the **Language** selector to override the detected highlighting or set it manually.
{{< /c8y-admon-info >}}

### To edit a configuration snapshot {#to-edit-a-configuration-snapshot}

To edit a configuration snapshot, click on the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the row and then click **Edit**.

For details on the fields, see [To add a configuration snapshot](#to-add-a-configuration-snapshot).

![Configuration Repository](/images/users-guide/DeviceManagement/devmgmt-management-configrepoedit.png)

If the configuration content is a text file, it opens in the code editor so that you can adjust it inline. If the content is sourced from a remote URL, it cannot be edited inline; only the file URL is shown.

Click **Update configuration** to save your changes.

### To delete a configuration snapshot {#to-delete-a-configuration-snapshot}

To delete a configuration snapshot, click on the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the row and then click **Delete**.

The configuration snapshot will be deleted from the configuration snapshot repository.

### To retrieve and apply a configuration snapshot {#to-retrieve-and-apply-a-configuration-snapshot}

Managing configurations, that is requesting a configuration from a device and sending a configuration to a device, can be done in multiple ways. Depending on user permissions and device settings, you can work with text based, typed file-based or legacy file-based configuration. Refer to [Configuration](/device-integration/fragment-library/#configuration) for more detailed and technical information.

### To retrieve and apply a configuration snapshot to a device which supports typed file-based configuration {#to-retrieve-and-apply-a-configuration-snapshot-to-a-device-which-supports-typed-file-based-configuration}

We recommend you to use typed file-based configuration. With typed file-based configuration, devices can manage multiple configurations at the same time. You can upload or retrieve different configurations for different types. Using this approach is more versatile because the configurations are handled as events rather than as files, which is more efficient.

1. Navigate to the desired device in **Devices** > **All devices** and open its **Configuration** tab.
2. Under **Device-supported configurations**, select the desired configuration type and click
   **Get snapshot from device** at the right.

Once retrieved, the snapshot is shown in the **Preview** section in a read-only editor with automatic syntax highlighting. From there you can:

- Click **Download** to save the snapshot as a file.
- Click **Save to repository** to store the snapshot in the **Configuration repository**, accessible from the **Management** menu in the navigator. This opens the configuration in a drawer, prefilled with the retrieved content, where you can review and adjust it before saving.

![Retrieve Configuration Snapshot](/images/users-guide/DeviceManagement/devmgmt-devices-config-getnewsnapshot.png)

{{< c8y-admon-info >}}
Clicking **Get snapshot from device** creates a new operation. If the operation is in status PENDING or EXECUTING, it is not possible to trigger another configuration request for the configuration type. Navigate to the **Control** tab of a device to cancel the operation or view the history of operation changes.
{{< /c8y-admon-info >}}

To apply a configuration snapshot to a device which supports multiple configuration types:

1. Navigate to the desired device and open its **Configuration** tab.
2. Under **Device-supported configurations**, select the desired configuration type.
3. Under **Available supported configurations**, select a configuration file.
4. Click **Send configuration to device** at the right to apply the selected snapshot to the device.

When you select a configuration from **Available supported configurations**, an **Edit in repository** button is also shown next to **Send configuration to device**. Click it to open the corresponding entry in the **Configuration repository** directly in a drawer for editing, without having to navigate to the **Configuration repository** page.

![Apply new snapshot to a device](/images/users-guide/DeviceManagement/devmgmt-devices-config-putsnapshot.png)

{{< c8y-admon-info >}}
Under **Available supported configurations**, only configuration files with a matching configuration type property or without a configuration type defined are displayed. Also, configuration files are filtered based on the device type (ones that match the device type or have no device type specified).
{{< /c8y-admon-info >}}

### To retrieve and apply a configuration snapshot to a device which supports legacy file-based configuration {#to-retrieve-and-apply-a-configuration-snapshot-to-a-device-which-supports-legacy-file-based-configuration}

Devices managing configuration as files can do so in a basic form using legacy file-based configuration. Legacy file-based configuration only allows a single configuration to be set per a device.

![Retrieve Configuration Snapshot](/images/users-guide/DeviceManagement/devmgmt-devices-config-old-getnewsnapshot.png)

### To retrieve and apply a configuration snapshot to a device which supports text-based configuration {#to-retrieve-and-apply-a-configuration-snapshot-to-a-device-which-supports-text-based-configuration}

The most basic form of configuration is text-based configuration. A text command can be sent or received from a device. We recommend you to use text-based configuration for short human readable configuration files only.

![Send Text Configuration](/images/users-guide/DeviceManagement/devmgmt-devices-config-text-getnewsnapshot.png)
