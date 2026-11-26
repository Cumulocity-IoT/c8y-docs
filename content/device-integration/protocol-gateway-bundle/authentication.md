---
weight: 70
title: Authentication
layout: redirect
---

Protocol Gateway has 3 security-relevant settings: the web interface login, the MQTT client, and the license.

**Web interface.** The default login is “administrator” with the password “admin”. Change the password at the first sign-in. The HTTPS port uses a self-signed certificate, so the browser shows a warning. The connection is encrypted, but the certificate is not trusted until you install your own.

**MQTT client.** The local thin-edge.io broker accepts connections from the same device without credentials. Leave **User name**, **Password**, and **Use TLS** unchanged.

**License.**

- A trial license is the file *DeviceGateway.lic* in */etc/takebishi/sd_card*. You can retrieve it through the {{< product-c8y-iot >}} configuration management. See [Operations](/device-integration/protocol-gateway/#operations).
- A commercial license uses the Takebishi license management server. Order it in the [Takebishi web store](https://www.faweb.net/en/support/order-online/#dgw). The license file entry in the configuration plugin does not apply to it.

{{< c8y-admon-important >}}
*setting.dxg* contains the password of the web interface in plain text. A configuration snapshot stores the file in the {{< product-c8y-iot >}} configuration repository. Change the default password first, restrict access to the repository, and treat every copy of the file as a secret.
{{< /c8y-admon-important >}}
