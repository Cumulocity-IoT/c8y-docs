---
weight: 20
title: MQTT protocol implementation
layout: redirect
---

This section covers some implementation details of the MQTT Service.
The MQTT Service implementation supports clients connecting using MQTT versions 3.1, 3.1.1 and 5.0, although not all MQTT 5.0 protocol features are currently supported.

### Connecting to the service {#connecting-devices}

{{< c8y-admon-important >}}
MQTT Service requires clients to connect with clean session flag enabled, set to "1" (true), otherwise the client connection is rejected by the server.
{{< /c8y-admon-important >}}

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

### Topics {#topic}

MQTT Service topics are mapped to the Messaging Service subscriptions with identical names, including additional URL encoding.
The Messaging Service subscriptions reliably store the topic messages for asynchronous processing.
The messages stored on these subscriptions can be consumed using a dedicated [Java Client](/device-integration/mqtt-service#java-client).

#### Topic restrictions {#topic-restrictions}

The MQTT Service does not impose any topic structure.
There are just a few topic names which are reserved for historic purposes and future use, namely:
* All [SmartREST 2.0](/smartrest/smartrest-two) related topics
* `error`
* `devicecontrol/notifications`

{{< c8y-admon-info >}}
Wildcard topics (`+`, `#`) and system topics starting with `$` are not currently supported.
{{< /c8y-admon-info >}}

Other than these restrictions you are free to use any topic name which is compatible with the <a href=http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718106 target=_blank>MQTT specification</a>.

#### Topic limits {#topic-limit}

The MQTT Service imposes several topic-related limits.
See the [Service Quotas](/service-terms/quotas#mqtt-service) section for details of the current limits in force.

There is a limit on the total number of topics that a single tenant can create.
When the creation of a new topic, either by creating it via the client publishing a message or subscribing to a non-existent topic, would breach the topic limit the delivery of the packet is prevented.

The different MQTT protocol versions provide different feedback when this limit is exceeded.

MQTT 5 clients:

* Have access to the reason code and reason string describing the failure when using QoS 1 with acknowledgements, where the reason code is `QUOTA_EXCEEDED: 0x97`.

MQTT 3.1 and 3.1.1 clients:

* Clients only have access to the reason code describing the failure when using QoS 1 with acknowledgements and only for SUBSCRIBE packets, where the reason code is `0x80`.
* For PUBLISH packets, the client will be disconnected with no further information as per the MQTT specification.

In addition to the topic count, the MQTT Service also limits the size of the message backlog on each topic.
The message backlog contains all messages that have been published on the topic but not yet received and acknowledged by all subscribers to the topic.
When the backlog limit is reached, further attempts to publish to the topic will fail until some messages have been consumed.

Each message in a topic backlog also has a time-to-live (TTL) that starts at the moment the message is published.
When the TTL of a message expires, that messages will be deleted from the backlog regardless of whether all subscribers have received it or not.
MQTT clients do not receive any notification that messages have been discarded from a backlog due to TTL expiry.

#### Error topic {#error-topic}

The MQTT Service provides clients the ability to review errors through messages received by subscribing to the error topic, `$debug/$error`.
When subscribing to the topic it will act as a per-client topic, meaning the client will only receive messages exclusively related to their client ID.
For example, if a client was attempting to subscribe to a new topic, and the creation of the topic would exceed the topic limit, only that client would receive an error.

According to the MQTT 3.1.1 specification, if either the server or the client encounters a protocol violation, it must close the network connection on
which it received the control packet which caused the violation.

In such instances MQTT clients must reconnect to be able to receive error messages from the error topic via the subscription.
Error messages received after this reconnection are from the previous session.
This can lead to confusion when attempting corrective actions.
Therefore, we highly recommend you to build a microservice which uses the MQTT Service SDK to consume error messages, or use MQTT 5 for clients and make use of the reason codes feature.

#### Topic cleanup {#topic-cleanup}

The MQTT service will automatically remove topics which are no longer active.
Topics are recognized as inactive when there are no subscriptions and the internal publisher to the topic is closed.
The publisher is responsible for publishing the modified MQTT service messages to the correct topic.
The publishers live within a cache, where the publisher expires after one hour.
Due to this it can take up to an hour after removing all subscriptions from a topic for it to be automatically deleted.

### Payload {#payload}

MQTT protocol messages map bidirectionally to the internal MQTT Service message format which includes the original payload and additional metadata fields.
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

The MQTT Service does not impose any specific payload format.
All the incoming MQTT messages must meet the specification in terms of fixed and variable headers, but the payload for published messages is unrestricted.
A Streaming Analytics app or a custom microservice will receive the exact same set of bytes that was sent by an MQTT device, and is responsible for converting these to a {{< product-c8y-iot >}} compatible format.

The size of the MQTT payload is limited to a maximum value that includes both the message header and body.
The size of an MQTT packet header varies, but it will be at least 2 bytes.
See the [Service Quotas](/service-terms/quotas#mqtt-service) section for details of the current limit in force.

### Features {#features}

#### Authentication and authorization {#authentication-and-authorization}

The MQTT Service supports the following authentication methods:

*   **Username and password**
    The MQTT username must include the tenant ID and username in the format `<tenantID>/<username>`.
*   **Device certificates**
    For secure communication, devices must contain the entire chain of certificates leading to the trusted root certificate, or if only the device certificate is provided, then the immediate issuer certificate must be uploaded to the platform’s truststore. You can do this via [the **Trusted certificates** page in the UI](/device-certificate-authentication/managing-trusted-certificates/) or via [REST](https://{{< domain-c8y >}}/api/core/#tag/Trusted-certificates). Moreover, the devices must contain the server certificate in their truststore. 
    <br/>
    If the trust anchor (that is, the trusted root or intermediate certificate) used to validate the device certificate is trusted by multiple tenants, the device must also specify the tenant ID in the **MQTT username** field. This ensures that the platform can correctly identify which tenant the device is attempting to connect to. While multi-tenant trust anchors are not currently supported in {{< product-c8y-iot >}}, this feature may be introduced in the future. If the tenant ID is provided, it must correspond to a tenant that trusts the given certificate; otherwise, the connection will be rejected.

#### ClientId {#client-id}

The MQTT **ClientID** field identifies the connected client.
**ClientID** may consist of up to 128 alphanumeric characters.
Each client connecting to the MQTT Service must have a unique client identifier, connecting a second client with the same identifier will result in the previous client's disconnection.

#### Quality of Service (QoS) {#quality-of-service-qos}

The MQTT Service implementation supports two levels of MQTT QoS:

* QoS 0: At most once:
    - The client sends the message once (fire and forget).
    - There is no response from the server.
    - There is no guarantee that subscribers will receive the message.
* QoS 1: At least once:
    - The client awaits server acknowledgment for each published message.
    - The client should re-send the message if there was no acknowledgement from the server.
    - It is guaranteed that subscribers will receive a message that was acknowledged by the server.
    - Subscribers may receive more than one copy of a message.
* QoS 2: Exactly once:
    - not supported

For subscriptions, the MQTT Service will deliver messages in the QoS that the client defined when subscribing to the topic (QoS 0 or 1).

#### Clean session {#clean-session}

The MQTT Service **requires** the clean session flag to be set to "1" (true).
Disabling clean session will result in client connections being rejected by the server.

#### Retained flag {#retained-flag}

The retained flag is currently ignored.
Publishing data with the retained flag on the topic is allowed but has no practical difference to sending it without the flag.

#### Last will {#last-will}

In MQTT, the "last will" is a message that is specified at connection time and that is executed when the client loses the connection.
Last will is fully supported by the MQTT Service, and as with with any other publish messages you can use any unreserved topic and any payload.

### Return codes {#return-codes}

The MQTT Service follows the MQTT specification for server responses.
For example, if invalid credentials are sent in the `CONNECT` message, the server response `CONNACK` message contains the `0x05` return code.
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

Using device certificates with the MQTT Service shares the same requirements as outlined in [Device certificates](/device-certificate-authentication/device-certificates#general-requirements-for-connecting-devices-with-certificates).
<br/>
If the trust anchor (that is, the trusted root or intermediate certificate) used to validate the device certificate is trusted by multiple tenants, the device must also specify the tenant ID in the **MQTT username** field. This ensures that the platform can correctly identify which tenant the device is attempting to connect to. For more information, see [Authentication and authorization](#authentication-and-authorization).

#### Adding and trusting CA certificate

TLS trust anchors in the {{< product-c8y-iot >}} platform are defined per tenant.
To use device certificates for authentication, the CA or intermediate certificate that signs the device certificates must be uploaded to the platform and added to the tenant’s list of trusted certificates. You can do this via [the **Trusted certificates** page in the UI](/device-certificate-authentication/managing-trusted-certificates/) or via [REST](https://{{< domain-c8y >}}/api/core/#tag/Trusted-certificates).
<br/>
Additionally, ensure that the **Auto registration** option is enabled when adding certificates. This allows any device presenting a valid certificate to be automatically registered on the platform when it first connects.

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

If you have more advanced requirements regarding certificate creation, see [Generating and signing certificates](/device-certificate-authentication/device-certificates#generating-and-signing-certificates).

#### Using certificates

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
