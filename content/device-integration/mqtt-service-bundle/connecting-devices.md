---
weight: 25
layout: redirect
title: Connecting MQTT devices
---

<font color="red" size="24">**Placeholder -- ignore this section for now**</font>

MQTT connections to the MQTT Service must use TCP.
Use your tenant domain as the target host for the connection, for example `{my-tenant}.cumulocity.com`.

Available ports:

| &nbsp; | TCP  |
|:-------|:-----|
| TLS    | 9883 |
| no TLS | 2883 |

Port 9883 (TLS) is the default port and should be used for secure, encrypted communication.
Both one-way (server certificate only) and two-way (both client and server certificates) TLS are supported.
When client certificates are not used, the server authenticates the client using standard username and password credentials.
Port 2883 (no TLS) is not enabled in {{< product-c8y-iot >}} shared public environments due to the security risks of unencrypted traffic.
To enable port 2883 in a dedicated environment, please contact [Product support](/additional-resources/contacting-support/).

#### Authentication and authorization {#authentication-and-authorization}

The MQTT Service supports the following authentication methods:

*   **Username and password**
    The MQTT username must include the tenant ID and username in the format `<tenantID>/<username>`.
*   **Device certificates**
    For secure communication, devices must contain the entire chain of certificates leading to the trusted root certificate, or if only the device certificate is provided, then the immediate issuer certificate must be uploaded to the platform’s truststore. You can do this via [the **Trusted certificates** page in the UI](/device-certificate-authentication/managing-trusted-certificates/) or via [REST](https://{{< domain-c8y >}}/api/core/#tag/Trusted-certificates). Moreover, the devices must contain the server certificate in their truststore. 
    <br/>
    If the trust anchor (that is, the trusted root or intermediate certificate) used to validate the device certificate is trusted by multiple tenants, the device must also specify the tenant ID in the **MQTT username** field. This ensures that the platform can correctly identify which tenant the device is attempting to connect to. While multi-tenant trust anchors are not currently supported in {{< product-c8y-iot >}}, this feature may be introduced in the future. If the tenant ID is provided, it must correspond to a tenant that trusts the given certificate; otherwise, the connection will be rejected.

### MQTT TLS certificates {#mqtt-tls-certificates}

#### Server certificates {#server-certificates}

The MQTT Service uses the same server certificates that are assigned to the main {{< product-c8y-iot >}} environment domain.
It always sends these certificates during TLS handshake to devices.
Moreover, {{< enterprise-tenant >}}s are not able to customize those certificates via the SSL Management feature.

#### Device (client) certificates {#device-certificates}

Using device certificates with the MQTT Service shares the same requirements as outlined in [Device certificates](/device-certificate-authentication/device-certificates#general-requirements-for-connecting-devices-with-certificates).
<br/>
If the trust anchor (that is, the trusted root or intermediate certificate) used to validate the device certificate is trusted by multiple tenants, the device must also specify the tenant ID in the **MQTT username** field. This ensures that the platform can correctly identify which tenant the device is attempting to connect to. For more information, see [Authentication and authorization](#authentication-and-authorization).

#### Adding and trusting  CA (Certificate Authority) certificates {#ca-certificates}

TLS trust anchors in the {{< product-c8y-iot >}} platform are defined per tenant.
To use device certificates for authentication, the CA or intermediate certificate that signs the device certificates must be uploaded to the platform and added to the tenant’s list of trusted certificates. You can do this via [the **Trusted certificates** page in the UI](/device-certificate-authentication/managing-trusted-certificates/) or via [REST](https://{{< domain-c8y >}}/api/core/#tag/Trusted-certificates).
<br/>
Additionally, ensure that the **Auto registration** option is enabled when adding certificates. This allows any device presenting a valid certificate to be automatically registered on the platform when it first connects.

#### Creating self-signed certificates {#creating-self-signed-certificates}

In order to self-sign the device certificates, the root CA certificate needs to be created.
Using the OpenSSL CLI tool, create a private key and then generate a self-signed root certificate from it.
```console
openssl genpkey -algorithm RSA -out ca.key
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt -subj "/C=UK/O=YourCompany/OU=YourOrg/CN=MQTTServiceCA"
```
Then create a private key for the device, generate the certificate signing request from this private key, and then sign the CSR.
```console
openssl genpkey -algorithm RSA -out client.key
openssl rsa -in client.key -out client-key.pem -outform PEM
openssl req -new -key client.key -out client.csr -subj "/C=UK/O=YourCompany/OU=YourOrg/CN=mqtt-client"
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 3650 -sha256
cat client.crt ca.crt > client-chain.pem
```

If you have more advanced requirements regarding certificate creation, see [Generating and signing certificates](/device-certificate-authentication/device-certificates#generating-and-signing-certificates).

#### Using certificates {#using-certificates}

Once the CA certificate has been uploaded and trusted in {{< product-c8y-iot >}}, devices can authenticate using client certificates signed by your trusted CA.
To connect using any MQTT client, use the previously generated client certificate and key.
This example uses the Mosquitto MQTT client:

```console
mosquitto_pub --cafile cumulocity.com.pem -d -q 1 \
  -h "cumulocity.com" -p "9883" -i myclient \
  -u t11101 \
  -t "v1/devices/me/telemetry" \
  --key client-key.pem \
  --cert client-chain.pem \
  -m '{"temperature":25}'
```

Explanation:
- `--cafile cumulocity.com.pem`: This file contains the CA certificate of {{< product-c8y-iot >}}’s MQTT Service broker, used to validate the server's identity.
- `--key client-key.pem` and `--cert client-chain.pem`: These are your client certificate and private key, signed by your trusted CA.
- `-u t11101`: (Optional) Specifies the MQTT username, which must be your tenant ID as described in [Authentication and authorization](#authentication-and-authorization). In this example, `t11101` is the tenant ID.

Downloading the CA certificate (`cumulocity.com.pem`):

To download the {{< product-c8y-iot >}} MQTT Service broker's CA certificate:
1. Open *cumulocity.com* in a browser.
2. Click the padlock icon in the address bar and view the certificate details.
3. Download or export the root certificate, and save it as *cumulocity.com.pem*.

Alternatively, you can use `openssl` to retrieve and extract the certificate:

```console
echo | openssl s_client -connect cumulocity.com:9883 -showcerts 2>/dev/null | \
    sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > cumulocity.com.pem
```
{{< c8y-admon-info >}}
{{< product-c8y-iot >}} uses certificates signed by well-known public CAs.
Some clients (like Mosquitto) require explicitly providing the CA file, while others (like MQTTX) trust these certificates automatically.
{{< /c8y-admon-info >}}
