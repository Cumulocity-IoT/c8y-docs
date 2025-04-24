---
weight: 60
title: Connecting the gateway to the server
layout: redirect
---

Next, establish a connection between the gateway and the OPC UA server.

1. In the **OPC UA server** tab of the respective gateway, click **Add server**. <br>
   ![Add new server](/images/device-protocols/opcua/opcua-new-server.png)
2. Use the **Server connection** toggle, to enable or disable the server connection.
3. Enter the **Server URL** which is used to establish a connection between the server and the gateway.
4. Enter the **Timeout value** in seconds. The timeout value is calculated for each request. If the timeout value is exceeded the request will be unsuccessful.
5. Enter the **Status check interval** in seconds. The status check interval specifies how often the gateway actively checks if the server status has changed. These periodic checks are carried out by reading the *ServerStatus* variable on the OPC UA server.
6. Select the **Security mode** and **Security policy** depending on the server configuration. For more info, see [Security modes](#security-modes).
7. Select the desired authentication method. For more info, see [Authentication](/device-integration/opcua/#authentication).
8. Click **Save**.

{{< c8y-admon-info >}}
Once a connection is established, the servers will be located in the **Child devices** tab. In there, the servers will contain additional data such as access to the address space.
{{< /c8y-admon-info >}}

### Security modes {#security-modes}

The security mode settings tell the gateway how it should secure the connection between itself and the OPC UA server. When a mode other than NONE is selected, the gateway will auto-generate a self-signed application instance certificate and will use it to connect to the server. Possible security mode options are:

- NONE
- BASIC128RSA15_SIGN
- BASIC128RSA15_SIGN_ENCRYPT
- BASIC256_SIGN
- BASIC256_SIGN_ENCRYPT
- BASIC256SHA256_SIGN
- BASIC256SHA256_SIGN_ENCRYPT

{{< c8y-admon-info >}}
The security modes have nothing to do with authorization or authentication! The security mode tells the gateway how the connection should be secured and whether the connection should be encrypted or not.
{{< /c8y-admon-info >}}
