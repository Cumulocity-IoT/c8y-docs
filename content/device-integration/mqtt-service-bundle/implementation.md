---
weight: 20
title: MQTT protocol implementation
layout: redirect
---

This section presents details of the MQTT protocol versions and features supported by the MQTT Service.
It will be of interest to anyone integrating MQTT devices with {{< product-c8y-iot >}}.
In general, the MQTT Service behaves the same way for all devices, whether they use the {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt) prototocols or a non-{{< product-c8y-iot >}} protocol.
If there are differences related to the application protocol used by the device, these will be documented where relevant.

### MQTT protocol versions {#mqtt-protocol-versions}

The MQTT Service supports connections from clients using version 3.1, 3.1.1 or 5.0 of the MQTT protocol.
Please refer to the [MQTT specifications](https://mqtt.org/mqtt-specification/) for details of the differences between these versions.

MQTT version 3.1 is obsolete and using it is not recommended, although most of the details below for version 3.1.1 will still be valid for version 3.1.

### Connecting to the MQTT Service {#connecting-via-mqtt}

MQTT devices can connect to the MQTT Service using direct TCP connections only.
Authentication using "basic" (username/password) authentication and TLS client certificates is supported.
For full details of the available ports and how to configure device authentication, see the [Connecting MQTT devices](/device-integration/mqtt-service/#connecting-devices) section.

{{< c8y-admon-caution >}}
The MQTT Service **requires** clients to connect with the _Clean Session_ flag in the MQTT `CONNECT` packet set to "1" (true).
This flag is called _Clean Start_ in MQTT version 5.0.
If this flag is not set, the client connection will be rejected by the MQTT Service.
This means that messages sent _to_ a device while it is disconnected will **not** be automatically delivered to it when it reconnects.
Your devices and clients should implement an application-level protocol to send missed messages if this is important for your use case.
Note that pending {{< product-c8y-iot >}} device operations _will_ be sent to a Core MQTT device when it connects.
{{< /c8y-admon-caution >}}

### MQTT version 3.1.1 features {#mqtt-311-features}

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

### MQTT version 5.0 features {#mqtt-50-features}

Clients can connect using version 5.0 of the MQTT protocol.
Support for additional MQTT 5.0 features will be added in future releases.

### Topics {#mqtt-topics}

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

### Payloads {#mqtt-payloads}

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

### Error reporting {#mqtt-error-reporting}

The MQTT Service follows the MQTT specification for server responses.
For example, if invalid credentials are sent in the `CONNECT` message, the server response `CONNACK` message contains the `0x05` return code.
The return code can be treated similarly to REST API HTTP codes, such as 401.

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

### MQTT device quotas and limits

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
