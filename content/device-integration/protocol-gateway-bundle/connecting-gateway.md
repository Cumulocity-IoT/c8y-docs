---
weight: 60
title: Connecting the gateway to thin-edge.io
layout: redirect
---

After the container runs, open the web interface of the gateway, check the license, and connect the gateway to the MQTT broker of thin-edge.io.

### To access the web interface {#to-access-the-web-interface}

The web interface answers on port 80 (HTTP) and 443 (HTTPS) of the device. On a trusted network, open `http://<device-ip>`. To reach it from {{< product-c8y-iot >}}, use [Remote access](/device-integration/protocol-gateway/#remote-access).

Sign in with the default login:

- **User name:** “administrator”
- **Password:** “admin”

Click **Change password** in the top right and set a new password.

![Sign-in page](/images/device-protocols/protocol-gateway/gateway-login.png)

{{< c8y-admon-info >}}
Changes in the web interface take effect in two stages. The check mark confirms a change on screen. **Save** in the top toolbar writes the configuration file and restarts the gateway functions, which briefly disconnects applications that use the gateway.
{{< /c8y-admon-info >}}

### To check the license {#to-check-the-license}

Go to **Management > Information > Version**. **Serial** shows your license, for example `License(Validity period 2026/11/24 - 2026/12/24)`. If it does not, check that the file is */etc/takebishi/sd_card/DeviceGateway.lic* and restart the service.

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

Check on the device that the broker accepted the client:

```bash
sudo journalctl -u mosquitto --since "-5min" --no-pager | grep tkb-ras
```

The output contains `New client connected from 127.0.0.1:<port> as tkb-ras`.

{{< c8y-admon-important >}}
Create and save the MQTT client first. Until then, the **Destination server** list in the **Event** tab is empty.
{{< /c8y-admon-important >}}
