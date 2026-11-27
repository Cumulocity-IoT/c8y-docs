---
weight: 70
title: Configuration management
layout: redirect
---

Protocol Gateway keeps all its configuration in one JSON file, *setting.dxg*. The container reads the file when it starts. The web interface writes the same file when you click **Save**. Two folders on the host hold the data, so that the data stays in place when you replace the container.

| Host folder | Container folder | Content |
|-------------|------------------|---------|
| */etc/takebishi/sd_card* | */mnt/sdcard* | License file, logs, offline buffering, and file actions. |
| */etc/takebishi/data* | */etc/dxpgateway* | Protocol Gateway configuration (*config/setting.dxg*) and certificates. Back up this folder. |

The thin-edge.io configuration plugin retrieves and replaces files on the device. Register the license file and the Protocol Gateway configuration first, as described in [Set up the license and configuration files](/device-integration/protocol-gateway/#set-up-the-license-and-configuration-files). Open the device and click **Configuration**.

![Configuration tab](/images/device-protocols/protocol-gateway/configuration-tab.png)

### To change the Protocol Gateway configuration {#to-change-the-protocol-gateway-configuration}

1. Click **Get snapshot from device** for “protocol-gateway.dxg”. {{< product-c8y-iot >}} stores a copy in the configuration repository.
2. Download the file, edit it, and send the new version back to the device.
3. Restart Protocol Gateway as described in [To start, stop, or restart Protocol Gateway](/device-integration/protocol-gateway/#to-start-stop-or-restart-protocol-gateway), because the container reads the file only at start.

The container does not overwrite the file when it stops, so a delivered file stays in place. **Save** in the web interface writes the same file, so a snapshot shows the current configuration.

**Get snapshot from device** also saves a copy of the license file in the configuration repository.

### To deploy the same configuration to many devices {#to-deploy-the-same-configuration-to-many-devices}

1. Configure one reference device in the web interface.
2. Click **Get snapshot from device** for “protocol-gateway.dxg”, so that the repository holds the reference configuration.
3. Prepare each new device as described in [Preparing the device](/device-integration/protocol-gateway/#preparing-the-device), install the software item, and send the reference configuration to the device.
4. Restart Protocol Gateway.

Replace the web interface password in the file before you send it, so that each device has its own password.
