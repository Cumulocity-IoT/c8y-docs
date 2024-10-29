---
weight: 20
title: MQTT protocol implementation
layout: redirect
---

This section lists the implementation details for the MQTT Service. The MQTT Service implementation supports MQTT Version 3.1.1, support for 5.0 is planned.

### Connecting via MQTT {#connecting-via-mqtt}

MQTT Service is supported via TCP. Use your tenant domain as the URL.

Available ports:

| &nbsp; | TCP |
|:-----|:----|
| TLS | 9883 |
| no TLS | 2883 |

Port 9883 is enabled by default. It currently supports one-way SSL meaning that only the client validates the server certificate to ensure its identity.
The client is authenticated by the server via standard username and password credentials.
To enable port 2883 please contact [Product support](/additional-resources/contacting-support/).

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

{{< c8y-admon-info >}}
Work to enable an error topic so that information regarding topic limit failures can be accessible to MQTT 3 clients is underway.
{{< /c8y-admon-info >}}

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
For all MQTT connections to the platform, the maximum accepted payload size is 1048576 bytes (1 MiB), which includes
both message header and body. The header size varies, but its minimum is 2 bytes.
{{< /c8y-admon-info >}}

### Features {#features}

#### Authentication and authorization {#authentication-and-authorization}

Authentication types supported by MQTT Service are:

*   Username and password: The MQTT username must include the tenant ID and username in the format `<tenantID>/<username>`.
*   Device certificates: Not yet supported. This will be added in a future release.

{{< c8y-admon-req >}}
The MQTT user which is used to connect to the MQTT Service must have the `MQTT_SERVICE_ADMIN` role assigned.
{{< /c8y-admon-req >}}

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

Support for MQTT 5.0 features will be added in the near future.

### MQTT TLS certificates {#mqtt-tls-certificates}

MQTT Service uses the certificates which are assigned to the main environment domain. It always sends these certificates during TLS handshake to devices.
Moreover, {{< enterprise-tenant >}}s are not able to customize those certificates via the SSL Management feature.
