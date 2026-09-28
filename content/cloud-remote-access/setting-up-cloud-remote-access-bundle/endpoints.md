---
title: Managing endpoints
weight: 30
layout: bundle
---

The "endpoint" is the IP address and port of the VNC, SSH or Telnet server running on the remote device. The IP address and port must be reachable from the gateway. 	

#### To configure a new remote device {#to-configure-a-new-remote-device}

1. Click **Add endpoint** at the right of the top menu bar.
2. Enter a name for the new endpoint and select the protocol to be used.
3. Follow the descriptions below for the protocol-specific settings.

{{< c8y-admon-info >}}
To be able to configure an endpoint, you must have a role that includes ADMIN permission for "Remote access" and "Device control". To read data, READ permission is sufficient. For more information on permissions, refer to [Managing permissions and roles](/standard-tenant/managing-permissions/).
{{< /c8y-admon-info >}}

#### To add a remote access endpoint via VNC {#to-add-a-remote-access-endpoint-via-vnc}

1. Enter the host (IP address or hostname) and the port of the server.
2. Select a sign-in method. If you select "Password only", provide the password for the VNC server.
3. Click **Save** to add the endpoint.

![Remote access endpoint](/images/cra/cra-endpoint-vnc.png)

Once the connection is established, a new browser tab will open displaying the front screen or operating panel of the remote device you are connected to. The top bar of the screen will show "starting VNC handshake" when the process is starting.

{{< c8y-admon-info >}}
The following versions of the VNC protocol are currently supported:
* RFB 003.003
* RFB 003.007
* RFB 003.008

The functionality has been tested on the following VNC servers:
* Real VNC 5.3.2
* Tiger VNC 1.6.0/1.7.0
* TightVNC 1.3.9
* EfonVNC 4.2
* Vino
{{< /c8y-admon-info >}}


#### To add a remote access endpoint via SSH {#to-add-a-remote-access-endpoint-via-ssh}

1. Enter the host (IP address or hostname) and the port of the server.
2. Select a sign-in method.<br>

	Username and password: If this method is selected, it is mandatory to enter a username and password.

	![SSH username and password sign in](/images/cra/cra-endpoint-ssh-username.png)

	Public/private keys: Automatically generate public and private keys or simply paste pre-generated keys. The keys can also be uploaded from a file.

	![SSH public/private keys sign in](/images/cra/cra-endpoint-ssh-publicprivatekeys.png)

	{{< c8y-admon-info >}}
The public key must be installed on the remote device as authorized key.
	{{< /c8y-admon-info >}}

	Optionally, you can also add a host key to ensure connection to the correct device. This key can also be uploaded from a file.

3. Click **Save** to add the endpoint.


The following formats are supported when adding new keys:

- OpenSSHv1
- OpenSSHv2
- PEM
- SSH2

The following algorithms are supported when adding new keys:

- RSA
- DSA
- ECDSA
- ED25519

{{< c8y-admon-info >}}
Limitations:
* Character support:
International characters are not supported.
Only a limited set of control characters is functional.
* Input restrictions:
Mouse movements are not supported.
* Protocol compatibility:
SSH version 1 is not supported; only SSH version 2 is available.
* Display behavior:
Text reflow does not occur when the window width changes.
{{< /c8y-admon-info >}}

#### To add a remote access endpoint via Telnet {#to-add-a-remote-access-endpoint-via-telnet}

1. Enter the host (IP address or hostname) and the port of the server.
2. Click **Save** to add the endpoint.
![Remote access Telnet endpoint](/images/cra/cra-endpoint-telnet.png)

{{< c8y-admon-important >}}
Telnet is considered to be an insecure protocol lacking built-in security measures. For network communication in a production environment we highly recommend you to use the SSH protocol instead.
{{< /c8y-admon-important >}}

#### To add a remote access endpoint via Passthrough {#to-add-a-remote-access-endpoint-via-passthrough}
1. Enter the host (IP address or hostname) and the port of the server.
2. Click **Save** to add the endpoint.
![Remote access Passthrough endpoint](/images/cra/cra-endpoint-passthrough.png)

Visit the [Cumulocity CLI](https://goc8ycli.netlify.app/docs/examples/remoteaccess/) documentation to learn more about how to set up the passthrough connection from the device to your local machine using the local proxy that is embedded in the CLI.

#### To edit an endpoint {#to-edit-an-endpoint}

To edit an endpoint, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective entry and select **Edit** from the context menu.

#### To delete an endpoint {#to-delete-an-endpoint}

To delete an endpoint, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective entry and select **Remove** from the context menu.

{{< c8y-admon-info >}}
An active connection will not be terminated automatically after the endpoint was deleted.
{{< /c8y-admon-info >}}

#### To connect to an endpoint {#to-connect-to-an-endpoint}

To connect to configured endpoints, select an endpoint in the **Remote access** tab and click **Connect**.
The connection to the configured remote device is established and the screen is shared in the client area.

![Telnet connection](/images/cra/cra-connect-telnet.png)

To terminate the connection, click **Disconnect**.


#### Auto-saving host key functionality {#auto-saving-host-key-functionality}

A host key is a public key of the server which is generated when an SSH server is installed. It is used to verify the identity of the server.

The host-key handling for SSH endpoints is controlled by the `hostkey-autosave` tenant option in the `remoteaccess` category.

* When `hostkey-autosave` is `false`, which is the default value, connecting to a remote access endpoint that has no host key stored yet first probes the server and shows you its host key fingerprint. The connection continues only after you confirm the fingerprint, and the confirmed host key is then saved for later connections.
* When `hostkey-autosave` is `true`, the server host key is instead trusted and saved automatically on the first successful connection, without asking you to enter or confirm it.

In both cases, once a host key is stored, it is used to verify the server identity on every following connection.
