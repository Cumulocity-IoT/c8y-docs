---
weight: 110
title: Operations
layout: redirect
---

{{< product-c8y-iot >}} operations tell the device what to do.

### Service control {#service-control}

Start, stop, and restart Protocol Gateway from the **Services** tab, as described in [To start, stop, or restart Protocol Gateway](/device-integration/protocol-gateway/#to-start-stop-or-restart-protocol-gateway).

### Configuration management {#configuration-management}

The thin-edge.io configuration plugin retrieves and replaces files on the device. Register the license file and the Protocol Gateway configuration first, as described in [To prepare the device](/device-integration/protocol-gateway/#to-prepare-the-device). Open the device and click **Configuration**.

![Configuration tab](/images/device-protocols/protocol-gateway/configuration-tab.png)

#### To change the Protocol Gateway configuration {#to-change-the-protocol-gateway-configuration}

Use the configuration repository to change the Protocol Gateway configuration:

1. Click **Get snapshot from device** for “protocol-gateway.dxg”. {{< product-c8y-iot >}} stores a copy in the configuration repository.
2. Download the file, edit it, and send the new version back to the device.
3. Restart the Protocol Gateway service from the **Services** tab, because the container reads the file only at start.

The container does not overwrite the file when it stops, so a delivered file stays in place. **Save** in the web interface writes the same file, so a snapshot shows the current configuration.

**Get snapshot from device** also saves a copy of the license file in the configuration repository. This applies only to a license file.

### To deploy the same configuration to many devices {#to-deploy-the-same-configuration-to-many-devices}

1. Configure one reference device in the web interface.
2. Click **Get snapshot from device** for “protocol-gateway.dxg”, so that the repository holds the reference configuration.
3. Prepare each new device as described in [To prepare the device](/device-integration/protocol-gateway/#to-prepare-the-device), install the software item, and send the reference configuration to the device.
4. Restart the service.

Replace the web interface password in the file before you send it, so that each device has its own password.

### Remote access {#remote-access}

Cloud Remote Access gives you access to the device from Device Management. Open the device and click **Remote access**.

#### To open an SSH session {#to-open-an-ssh-session}

Add an endpoint with these values and click **Connect** to open the web terminal:

- **Name:** “SSH”
- **Host:** “127.0.0.1”
- **Port:** “22”
- **Protocol:** “SSH”

#### To open the web interface {#to-open-the-web-interface}

Add an endpoint of type **Passthrough** with host “127.0.0.1” and port “443” for HTTPS (or “80” for HTTP), and open it with the go-c8y-cli:

```bash
c8y remoteaccess server --device <device-name> --configuration <endpoint-name> --listen 127.0.0.1:8443 --browser --scheme https
```

![Remote access endpoint](/images/device-protocols/protocol-gateway/remote-access-endpoint.png)

The browser warns about the self-signed certificate of Protocol Gateway. If you cannot install the go-c8y-cli, forward the port through the SSH endpoint instead:

```bash
ssh -L 8443:127.0.0.1:443 <user>@<device>
```

Then open `https://localhost:8443`.
