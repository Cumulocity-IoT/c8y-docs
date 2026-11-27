---
weight: 40
title: Connecting Protocol Gateway to thin-edge.io
layout: redirect
---

After the container runs, open the web interface of Protocol Gateway, check the license, and connect Protocol Gateway to the MQTT broker of thin-edge.io.

### To access the web interface {#to-access-the-web-interface}

The web interface answers on port 80 (HTTP) and 443 (HTTPS) of the device. On a trusted network, open `http://<device-ip>`.

To reach it from {{< product-c8y-iot >}}, use Cloud Remote Access. In Device Management, open the device, click **Remote access**, and add an endpoint of type **Passthrough** with the host “127.0.0.1” and the port “443” (or “80” for HTTP). Open the endpoint with a local proxy, such as the go-c8y-cli:

```bash
c8y remoteaccess server --device <device-name> --configuration <endpoint-name> --listen 127.0.0.1:8443 --browser --scheme https
```

For details, see [Setting up Cloud Remote Access](https://cumulocity.com/docs/cloud-remote-access/setting-up-cloud-remote-access/).

![Remote access endpoint](/images/device-protocols/protocol-gateway/remote-access-endpoint.png)

Sign in with the default login:

- **User name:** “administrator”
- **Password:** “admin”

Click **Change password** in the top right and set a new password.

![Sign-in page](/images/device-protocols/protocol-gateway/gateway-login.png)

{{< c8y-admon-important >}}
The Protocol Gateway configuration file contains the password of the web interface in plain text. A configuration snapshot stores the file in the {{< product-c8y-iot >}} configuration repository. Change the default password first, restrict access to the repository, and treat every copy of the file as a secret.
{{< /c8y-admon-important >}}

{{< c8y-admon-info >}}
Changes in the web interface take effect in two stages. The check mark confirms a change on screen. **Save** in the top toolbar writes the configuration file and restarts the Protocol Gateway functions, which briefly disconnects applications that use Protocol Gateway.
{{< /c8y-admon-info >}}

### To check the license {#to-check-the-license}

Go to **Management > Information > Version**. **Serial** shows your license, for example `License(Validity period 2026/11/24 - 2026/12/24)`. If it does not, check that the license file is in the license folder with the file name from [Set up the license and configuration files](/device-integration/protocol-gateway/#set-up-the-license-and-configuration-files), and restart the service.

![License check](/images/device-protocols/protocol-gateway/gateway-license-version.png)

### To create the MQTT client {#to-create-the-mqtt-client}

1. Open **IoT Interface** and click the **MQTT** icon.
2. Enter the name “thin-edge” and click the check mark.
3. Open the client and its **Connection Configuration**, and set:
   - **Host (Host name:Port number):** “127.0.0.1”. The default port is 1883, so you do not need to enter it. To set it explicitly, enter “127.0.0.1:1883”.
   - **Client ID:** “tkb-ras” (any fixed name). This field is required.
4. Leave **MQTT Version** at “auto”, **User name** and **Password** empty, and **Use TLS** at “Invalid”. The local thin-edge.io broker accepts connections from the same device without credentials.
5. Click the check mark, then click **Save**.
6. Open **Summary** and start the client with the play button.

![MQTT client](/images/device-protocols/protocol-gateway/gateway-mqtt-client.png)

{{< c8y-admon-important >}}
Create and save the MQTT client first. Until then, the **Destination server** list in the **Event** tab is empty.
{{< /c8y-admon-important >}}
