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
2. In the resulting dialog box, enter a unique name.
3. In the **Device type** field, enter a device type. The device type can be found in the **Info** tab of the target device.
4. Optionally enter a description for the configuration.
5. Enter the configuration type, for example "ssh".
6. Select how to provide the configuration content:
   - To upload an existing file, upload it from the file system, specify a URL from where the configuration snapshot can be obtained, or select a file from the repository.
   - To create a configuration directly in the browser, open the bottom drawer editor and enter the content in the **Codex editor** component. If required, use full-screen mode in the drawer for larger files.
7. Click **Add configuration**.

The configuration snapshot will be added to the configuration repository.

### To edit a configuration snapshot {#to-edit-a-configuration-snapshot}

To edit a configuration snapshot, click on the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the row and then click **Edit**.

You can update the metadata fields and edit the configuration content directly in the browser. The configuration opens in the bottom drawer editor with the **Codex editor** component. You can work in place and use full-screen mode for better visibility.

For details on the fields, see [To add a configuration snapshot](#to-add-a-configuration-snapshot).

![Configuration Repository](/images/users-guide/DeviceManagement/devmgmt-management-configrepoedit.png)

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

Once retrieved, you can save or download the snapshot in the **Preview** section. The snapshot will be added to the **Configuration repository**, accessible from the **Management** menu in the navigator.

![Retrieve Configuration Snapshot](/images/users-guide/DeviceManagement/devmgmt-devices-config-getnewsnapshot.png)

{{< c8y-admon-info >}}
Clicking **Get snapshot from device** creates a new operation. If the operation is in status PENDING or EXECUTING, it is not possible to trigger another configuration request for the configuration type. Navigate to the **Control** tab of a device to cancel the operation or view the history of operation changes.
{{< /c8y-admon-info >}}

To apply a configuration snapshot to a device which supports multiple configuration types:

1. Navigate to the desired device and open its **Configuration** tab.
2. Under **Device-supported configurations**, select the desired configuration type.
3. Under **Available supported configurations**, select a configuration file.
4. Click **Send configuration to device** at the right to apply the selected snapshot to the device.

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
