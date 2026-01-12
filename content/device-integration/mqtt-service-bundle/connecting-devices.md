---
weight: 25
layout: redirect
title: Connecting MQTT devices
---

This section covers the details of connecting and authenticating an MQTT device to the MQTT Service.
As with the [MQTT protocol implementation](#implementation) it will be of interest to anyone integrating MQTT devices with {{< product-c8y-iot >}}.
See the [Connecting Core MQTT devices](#connecting-core-mqtt-devices) section for specific information about using {{< product-c8y-iot >}} MQTT protocols (SmartREST and JSON-over-MQTT) with the MQTT Service.

### Ports

MQTT connections to the MQTT Service must use TCP.
WebSocket connections are not supported.
Use your tenant domain as the target host for the connection, for example `<MY-TENANT>.cumulocity.com`.

Because the MQTT Service operates alongside the pre-existing Core MQTT Service, devices using the MQTT Service must connect to different ports:

* Port 9883 (TLS) is the default port for secure, encrypted communication with the MQTT Service.
  Both one-way (server certificate only) and two-way (both client and server certificates) TLS are supported.
  When client certificates are not used, the server authenticates the client using basic authentication.

* Port 2883 (non-TLS) is **not enabled in {{< product-c8y-iot >}} shared public environments** due to the security risks of allowing unencrypted traffic.
  To enable port 2883 in a dedicated environment, please contact [Product support](/additional-resources/contacting-support/).

### Authentication {#authentication}

The MQTT Service supports the following authentication methods.
In all cases it is important to ensure that the MQTT username is set correctly so that the MQTT Service can identify the {{< product-c8y-iot >}} tenant associated with the device:

*   **Username and password (basic authentication)**<br>
    The credentials of any user on the tenant can be used to authenticate a device to the MQTT Service.
    The username in the MQTT `CONNECT` packet **must** include the tenant ID and username in the format `<tenantID>/<username>`.
    The password in the `CONNECT` packet **must** be the unencrypted password of the user.
    <br><br>

*   **X.509 device certificates (certificate authentication)**<br>
    To authenticate using a certificate, a device must provide a _certificate chain_ that is trusted by a _trust anchor_ configured for the {{< product-c8y-iot >}} tenant.
    The device **should** specify the tenant ID in the username field of the MQTT `CONNECT` packet.
    See the [Using TLS certificates](#using-tls-certificates) section below for more details on creating and managing trust anchors and device certificates.

### Using TLS certificates {#using-tls-certificates}

This section contains a simplified overview of the TLS certificate support in the MQTT Service.
For more details, see the general [Device certificates](/device-certificate-authentication/device-certificates/) documentation for {{< product-c8y-iot >}}.

#### Server certificates {#server-certificates}

The MQTT Service uses the same server certificates that are assigned to the main {{< product-c8y-iot >}} environment domain.
{{< enterprise-tenant >}}s are not able to customize these certificates via the SSL Management feature.

#### Device (client) certificates {#device-certificates}

Device certificates used with the MQTT Service share the same [prerequisites](/device-certificate-authentication/device-certificates/#prerequisites) outlined in the general documentation.
In addition, for devices connecting to the MQTT Service:

1. The _Common Name_ (CN) field of the certificate **must** match the client ID field in the MQTT `CONNECT` packet.
   If the client ID and the certificate CN do not match, the connection will be rejected.
2. The device **should** specify the tenant ID in the username field of the MQTT `CONNECT` packet.
   If the tenant ID is provided, it must correspond to a tenant that trusts the given certificate; otherwise, the connection will be rejected.
   Similarly, if a trust anchor is trusted by multiple tenants and the tenant ID is _not_ provided, the connection will be rejected.
   Multi-tenant trust anchors are not currently supported in {{< product-c8y-iot >}}, but this feature may be introduced in the future. 
   We recommend always specifying the tenant ID in the username field so that your devices will continue to connect if the trust anchor configuration changes.

#### Configuring certificate trust anchors {#configuring-trust-anchors}

TLS trust anchors in the {{< product-c8y-iot >}} platform are defined per tenant.
To use device certificates for authentication, the root or intermediate certificate that signs the device certificates must be uploaded to the platform and added to the tenant’s list of trusted certificates.
For example, if only a root certificate has been configured as a trust anchor, the device should send a certificate chain containing (at least) the unique certificate for the the device, and an intermediate certificate trusted by the root.
Conversely, if the intermediate certificate has been configured as a trust anchor, the device can send only the unique per-device certificate that is trusted by the intermediate certificate.

Trust anchors can be configured through the [Trusted certificates](/device-certificate-authentication/managing-trusted-certificates/) page in the UI, or through the [REST](https://{{< domain-c8y >}}/api/core/#tag/Trusted-certificates) API.

Additionally, ensure that the _Auto registration_ option is enabled when adding certificates. This allows any device presenting a valid certificate to be automatically registered on the platform when it first connects.

#### Creating self-signed certificates {#creating-self-signed-certificates}

In order to self-sign the device certificates, the root _Certificate Authority_ (CA) certificate needs to be created.
Using the OpenSSL CLI tool, create a private key and then generate a self-signed root certificate from it.
```console
openssl genpkey -algorithm RSA -out ca.key
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt -subj "/C=UK/O=YourCompany/OU=YourOrg/CN=MQTTServiceCA"
```
Then create a private key for the device, generate the _Certificate Signing Request_ (CSR) from this private key, and then sign the CSR.
```console
openssl genpkey -algorithm RSA -out client.key
openssl rsa -in client.key -out client-key.pem -outform PEM
openssl req -new -key client.key -out client.csr -subj "/C=UK/O=YourCompany/OU=YourOrg/CN=mqtt-client"
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 3650 -sha256
cat client.crt ca.crt > client-chain.pem
```

If you have more advanced requirements regarding certificate creation, see [Generating and signing certificates](/device-certificate-authentication/device-certificates#generating-and-signing-certificates).

You may also be able to use {{< product-c8y-iot >}}'s built-in [Certificate Authority](/device-certificate-authentication/certificate-authority/), if your devices can support the <a href="https://en.wikipedia.org/wiki/Enrollment_over_Secure_Transport" target="_blank">Enrolment over Secure Transport</a> (EST) protocol.

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
- `-u t11101`: (Optional) Specifies the MQTT username, which must be your tenant ID.

##### Downloading the CA certificate {#downloading-ca-certificate}

{{< product-c8y-iot >}} uses certificates signed by well-known public CAs.
Some clients (like Mosquitto) require explicitly providing the CA file, while others (like MQTTX) trust these certificates automatically.
To download the {{< product-c8y-iot >}} MQTT Service broker's CA certificate:
1. Open *cumulocity.com* in a browser.
2. Click the padlock icon in the address bar and view the certificate details.
3. Download or export the root certificate, and save it as *cumulocity.com.pem*.

Alternatively, you can use `openssl` to retrieve and extract the certificate:

```console
echo | openssl s_client -connect cumulocity.com:9883 -showcerts 2>/dev/null | \
    sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > cumulocity.com.pem
```

### Connecting Core MQTT devices {#connecting-core-mqtt-devices}

{{< c8y-admon-preview >}}
This feature is in **Public Preview**.
That is, it is not yet generally available and may be subject to change in the future.
{{< /c8y-admon-preview >}}

TBC
