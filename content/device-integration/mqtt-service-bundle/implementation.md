---
weight: 20
title: MQTT protocol implementation
layout: redirect
---

This section lists the implementation details for the MQTT Service.
The MQTT Service implementation supports clients connecting using MQTT versions 3.1.1 and 5.0, although not all MQTT 5.0 protocol features are supported.

### Connecting via MQTT {#connecting-via-mqtt}

MQTT Service is supported via TCP. Use your tenant domain as the URL.

Available ports:

| &nbsp; | TCP  |
|:-------|:-----|
| TLS    | 9883 |
| no TLS | 2883 |

Port 9883 (TLS) is enabled by default and should be used for secure communication.
Both one-way (server certificate only) and two-way (both client and server certificates) TLS are supported.
When client certificates are not used, the server authenticates the client using standard username and password credentials.
Port 2883 (no TLS) is disabled by default due to security risks, as traffic is unencrypted.
To enable port 2883 in a dedicated environment, please contact [Product support](/additional-resources/contacting-support/).

### Topic {#topic}

MQTT Service topics are mapped to the Messaging Service subscriptions with identical names, including additional URL encoding.
The Messaging Service subscriptions reliably store the topic messages for asynchronous processing.
The messages stored on these subscriptions can be consumed using a dedicated [Java Client](/device-integration/mqtt-service#java-client).

#### Topic restrictions {#topic-restrictions}

MQTT Service does not impose any topic structure. There are just a few topic names which are reserved for historic purposes and future use, namely:
* All [SmartREST 2.0](/smartrest/smartrest-two) related topics
* `error`
* `devicecontrol/notifications`

Other than that you are free to use any topic name which is compatible with the [MQTT specification](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718106).

{{< c8y-admon-info >}}
Wildcard topics (`+`, `#`) and system topics starting with `$` are not supported.
{{< /c8y-admon-info >}}

#### Topic limit {#topic-limit}

MQTT Service has the ability to limit the total number of topics that a single tenant can create. The current default is no limit.
When the creation of a new topic, either by creating it via the client publishing a message or subscribing to a non-existent topic, would breach the topic limit
the delivery of the packet is prevented.

The different MQTT protocols provide the following feedback.

MQTT 5 clients:

* Have access to the reason code and reason string describing the failure when using QoS 1 with acknowledgements,
reason code being `QUOTA_EXCEEDED: 0x97`.

MQTT 3.1 and 3.1.1 clients:

* Clients only have access to the reason code describing the failure when using QoS 1 with acknowledgements and only
for the SUBSCRIBE packets, where the reason code is `0x80`.
* For the PUBLISH packets, the client will be disconnected with no further information as per the MQTT specification.

#### Error Topic {#error-topic}

MQTT Service provides clients the ability to review errors through messages received by subscribing to the error topic, `$debug/$error`.
When subscribing to the topic it will act as a per-client topic, meaning the client will only receive messages exclusively related to their client ID. For example,
if a client was attempting to subscribe to a new topic, and the creation of the topic would exceed the topic limit, only that client would receive an error.

According to the MQTT 3.1.1 specification, if either the server or the client encounters a protocol violation, it must close the network connection on
which it received the control packet which caused the violation.

In such instances MQTT clients must reconnect to be able to receive error messages from the error topic via the subscription. Error messages received after this reconnection
are from the previous session. This can lead to confusion when attempting corrective actions. Therefore, we highly recommend you to build a microservice which uses
the MQTT Service SDK to consume error messages, or use MQTT 5 for clients and make use of the reason codes feature.

#### Topic cleanup {#topic-cleanup}

The MQTT service will automatically remove topics which are no longer active. Topics are recognized as inactive when there are no subscriptions and
the internal publisher to the topic is closed. The publisher is responsible for publishing the modified MQTT service messages to the correct topic.
The publishers live within a cache, where the publisher expires after one hour. Due to this it can take up to an hour after removing all subscriptions from a topic
for it to be automatically deleted.

### Payload {#payload}

The original MQTT messages are re-packed into MQTT Service message format which includes the original payload and additional metadata fields.
Assuming Java types, the packed message structure looks as follows:

`MqttServiceMessage`
| Field name | Type                | Description                    |
|:-----------|:--------------------|:-------------------------------|
| payload    | byte[]              | MQTT payload                   |
| metadata   | MqttServiceMetadata | Metadata from the MQTT message |

`MqttServiceMetadata`
| Field name             | Type    | Description                                                             |
|:-----------------------|:--------|:------------------------------------------------------------------------|
| clientId               | String  | Unique MQTT client identifier, usually used as an external identifier   |
| messageId              | int     | Unique MQTT message ID per client, available only with QoS 1 and 2      |
| dupFlag                | boolean | Indicates this message is a resend by the MQTT client                   |
| userProperties         | Map     | Reserved for future use of MQTT 5.0 features                            |
| payloadFormatIndicator | enum    | Reserved for future use of MQTT 5.0 features                            |
| contentType            | String  | Reserved for future use of MQTT 5.0 features                            |
| correlationData        | byte[]  | Reserved for future use of MQTT 5.0 features                            |
| responseTopic          | String  | Reserved for future use of MQTT 5.0 features                            |
| topic                  | String  | The name of the MQTT topic that the message was published by the client |

The [Java Client](/device-integration/mqtt-service#java-client) contains classes representing the above model.

#### Payload restrictions {#payload-restrictions}

MQTT Service doesn't force you to use any specific payload format. 
All the incoming MQTT messages must meet the specification in terms of fixed and variable headers, but the payload for published messages is unrestricted.
Just keep in mind that you will receive exactly the same set of bytes which was sent from the device in your custom microservice
and you have to convert them to {{< product-c8y-iot >}} compatible format.

{{< c8y-admon-info >}}
For all MQTT connections to the platform, the maximum accepted payload size is 131072 bytes (128 KiB), which includes
both message header and body. The header size varies, but its minimum is 2 bytes.
{{< /c8y-admon-info >}}

### Features {#features}

#### Authentication and authorization {#authentication-and-authorization}

Authentication types supported by MQTT Service are:

*   Username and password: The MQTT username must include the tenant ID and username in the format `<tenantID>/<username>`.
*   Device certificates: The MQTT username must include the tenant ID in the format `<tenantID>`.

#### ClientId {#client-id}

The **MQTT ClientID** field identifies the connected client. **ClientID** may consist of up to 128 alphanumeric characters.
Each client connecting to MQTT Service must have a unique client identifier, connecting a second client with the same identifier will result in the previous client's disconnection.

#### Quality of Service (QoS) {#quality-of-service-qos}

The {{< product-c8y-iot >}} implementation supports two levels of MQTT QoS:

* QoS 0: At most once:
    - The client just sends the message once (fire and forget).
    - No response from the server.
    - No guarantee that subscribers will receive the message.
* QoS 1: At least once:
    - The client awaits server acknowledgment for each published message.
    - The client should re-send the message if there was no acknowledgement from the server.
    - It is guaranteed that subscribers will receive a message that was acknowledged by the server.
    - Subscribers may receive more than one copy of a message.
* QoS 2: Exactly once:
    - not supported

For subscriptions, MQTT Service will deliver all messages in the QoS that the client defined when subscribing to the topic.

#### Clean session {#clean-session}

MQTT Service requires clean session to be set to "1" (true). We cannot guarantee that disabling clean session will work reliably, hence we recommend you to always enable clean session.

#### Retained flag {#retained-flag}

Retained flag is ignored. Publishing data with the retained flag on the topic is allowed but has no practical difference to sending it without the flag.

#### Last will {#last-will}

In MQTT, the "last will" is a message that is specified at connection time and that is executed when the client loses the connection. 
Last will is fully supported by MQTT Service and like with any other publish messages you can use any unreserved topic and any payload.

### Return codes {#return-codes}

MQTT Service follows the MQTT specification for server responses. For example, if invalid credentials are sent in the `CONNECT` message,
the server response `CONNACK` message contains the `0x05` return code.
The return code can be treated similarly to REST API HTTP codes, such as 401.

### MQTT 5.0 features {#mqtt-50-features}

Clients can connect using version 5.0 of the MQTT protocol.
Support for additional MQTT 5.0 features will be added in future releases.

### MQTT TLS certificates {#mqtt-tls-certificates}

#### Server certificates {#server-certificates}

The MQTT Service uses the same server certificates that are assigned to the main {{< product-c8y-iot >}} environment domain.
It always sends these certificates during TLS handshake to devices.
Moreover, {{< enterprise-tenant >}}s are not able to customize those certificates via the SSL Management feature.

#### Device (client) certificates {#device-certificates}

Using device certificates with the MQTT Service shares the same requirements as outlined in [Device certificates](/device-integration/device-certificates/#general-requirements-for-connecting-devices-with-certificates). Additionally, auto-registration must be enabled when uploading the CA certificate to the platform.
At this time, manual device registration is not supported in the MQTT Service. Devices must be registered through the auto-registration process. For more details on auto-registration, refer to [Auto-registration](/device-integration/device-certificates/#registering-devices-using-certificates) guide.
When connecting devices to the MQTT Service using certificates, the tenant ID must be included in the MQTT CONNECT packet in the user name field.
This is required to correctly identify the tenant.

#### Adding and trusting CA certificate

TLS trust anchors in the {{< product-c8y-iot >}} platform are defined per tenant.
To use device certificates for authentication, the CA or intermediate certificate that signs the device certificates must be uploaded to the platform and added to the tenant’s list of trusted certificates.
Additionally, the **Auto registration** field must be enabled when adding certificates.
For detailed instructions on adding and trusting a CA certificate, see [Managing trusted certificates](/device-management-application/managing-device-data/#managing-trusted-certificates).

#### Creating self-signed certificates

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

There are further instructions regarding creating self-signed CA, intermediate, and device certificates certificates under [Generating and signing certificates](/device-integration/device-certificates/#generating-and-signing-certificates).

#### Using certificates

Once the CA certificate has been uploaded and trusted in {{< product-c8y-iot >}}, devices can authenticate using client certificates signed by your trusted CA.
To connect using any MQTT client, use the previously generated client certificate and key.
Here's an example command using using the Mosquitto MQTT client:

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
- `-u t11101`: The username must be your tenant ID. In this example, `t11101` is the tenant ID.

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
{{< product-c8y-iot >}} uses certificates signed by well-known public CAs. Some clients (like Mosquitto) require explicitly providing the CA file, while others (like MQTTX) trust these certificates automatically.
{{< /c8y-admon-info >}}