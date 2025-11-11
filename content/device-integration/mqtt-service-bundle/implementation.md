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

MQTT version 3.1 is obsolete and not recommended.
Most of the details below for version 3.1.1 will be valid for version 3.1; however, the specific differences in protcol version 3.1 are not explicitly documented.

### Connecting to the MQTT Service {#connecting-via-mqtt}

MQTT devices can connect to the MQTT Service using direct TCP connections only.
Authentication using "basic" (username/password) authentication and TLS client certificates is supported.
For full details of the available ports and how to configure device authentication, see the [Connecting MQTT devices](/device-integration/mqtt-service/#connecting-devices) section.

### MQTT version 3.1.1 features {#mqtt-311-features}

These features are also applicable to devices connecting using [version 5.0](#mqtt-50-features) of the MQTT protocol.

#### Client Identifier {#client-id}

Every device connecting to the MQTT Service within a given tenant must use a unique _Client Identifier_ (client ID).
If a device connects using a client ID that is already connected, the _existing_ connection will be terminated, in accordance with the MQTT specification.
Devices in different tenants can be connected at the same time using the same client ID.
Empty client IDs are not permitted.
See the table of [limits and quotas](/service-terms/quotas/#mqtt-service) for details of the maximum allowed client ID length.

#### Clean session {#clean-session}

The MQTT Service **requires** devices to connect with the _Clean Session_ flag in the MQTT `CONNECT` packet set to "1" (true).
This flag is called _Clean Start_ in MQTT version 5.0.
If this flag is not set, the client connection will be rejected by the MQTT Service.

{{< c8y-admon-caution >}}
This means that messages sent _to_ a device while it is disconnected will **not** be automatically delivered to it when it reconnects.
Your devices and clients should implement an application-level protocol to send missed messages if this is important for your use case.
Note that pending {{< product-c8y-iot >}} device operations _will_ be sent to a Core MQTT device when it connects.
{{< /c8y-admon-caution >}}

#### Quality of Service {#quality-of-service-qos}

The MQTT Service supports two levels of MQTT _Quality of Service_ (QoS).
The desired QoS level is specified in the MQTT `PUBLISH` packet when a device sends a message to the MQTT Service, and in the MQTT `SUBSCRIBE` packet when a device subscribes to a MQTT topic.

| Level                 | Supported | Description   |
|-----------------------|-----------|---------------|
| QoS 0 (at most once)  | Yes       | The service does not acknowledge messages sent by the device, and there is no guarantee that messages will be delivered.<br>For subscriptions, the service does not expect any acknowledgement from the device and will not send any message more than once. |
| QoS 1 (at least once) | Yes       | The service will acknowledge messages sent by the device, and the device may re-send a message if no acknowledgement is received.<br>Acknowledged messages are guaranteed to be delivered at least once to Messaging Service clients.<br>For subscriptions, the device must acknowledge messages sent to it by the service, and the service may send the same message more than once.<sup>(1)</sup> |
| QoS 2 (exactly once)  | No        | Not supported |

Notes:
1. Because the MQTT Service requires devices to connect with a clean session, unacknowledged messages will not be re-sent by the MQTT Service after a device has disconnected and reconnected.
<br><br>

#### Duplicate message indicator {#duplicate-messages}

The _duplicate message indicator_ (DUP flag) in an MQTT `PUBLISH` packet indicates that this _may_ be an attempted re-delivery of an earlier attempt to send the same packet.
It will only ever be set on messages sent using QoS level 1.
The DUP flag is supported by the MQTT Service in accordance with the MQTT specification.

#### Last will {#last-will}

The MQTT _last will_ feature allows a device to provide a message in the `CONNECT` packet that will be published on behalf of the device if it disconnects unexpectedly.
Last will is supported by the MQTT Service with these restrictions:
* Because of _device isolation_, the will message will not be delivered to any other connected MQTT device.
  The will message will be published onto the Messaging Service where it can be consumed by a microservice or external application client.
* The QoS level of the will message can be QoS 0 (at most once) or Qos 1 (at least once).
  QoS level 2 (exactly once) is not supported.
* Retained will messages are not supported.
  If the retain flag is set on the will message, the message will not be accepted.

#### Retained messages {#retained-messages}

MQTT _retained messages_ are not supported by the MQTT Service.
If the retain flag is set on a `PUBLISH` message from a device, the message will not be accepted and the connection will be closed.
Devcies should not attempt to re-send an unacknowledged QoS 1 retained message after reconnecting, as this will simply cause the connection to be closed again.

Messages published by the MQTT Service to devices will never have the retain flag set.

#### Wildcard subscriptions {#wildcard-subscriptions}

A wildcard subscription allows a device to subscribe to MQTT topics using a _pattern_ instead of a fixed topic name.
The MQTT Service supports wildcard subscriptions using both the single-level (`+`) and multi-level (`#`) wildcard indicators.

### MQTT version 5.0 features {#mqtt-50-features}

These features apply to devices using version 5.0 of the MQTT protocol, in addition to the [MQTT version 3.1.1](#mqtt-311-features) features described above.

#### Device connection properties {#mqtt-50-connect-features}

The MQTT version 5.0 `CONNECT` packet allows many optional properties of the MQTT session to be configured when a device connects.
The level of support in the MQTT Service for these features varies, as shown in the table below.
When a feature is described as "ignored", this means that it can be requested at connection time but this will have no effect on the behaviour of the MQTT Service.
Using features described as "not supported" may cause messages to be rejected, or the device to be disconnected.

| Feature                      | Support level | Notes                                                                                                            |
|------------------------------|---------------|------------------------------------------------------------------------------------------------------------------|
| Client Identifier            | Mandatory     | As for [version 3.1.1](#client-id).                                                                              |
| Clean Start                  | Mandatory     | As for [version 3.1.1](#clean-session). _Clean Start_ is **required** on all device connections.                 |
| Last Will                    | Supported     | With the same restrictions on QoS level, retained messages and device isolation as for [version 3.1.1](#last-will).<br>These additional version 5.0 properties on the will message are supported:<br>_Delay Interval_, _Payload Format Indicator_, _Content Type_, _Response Topic_, _Correlation Data_ and _User Properties_.<br>The _Message Expiry Interval_ property on the will message is ignored. |
| Receive Maximum              | Supported     | The MQTT Service will limit the number of unacknowledged QoS 1 messages for the device to the requested maximum. |
| Maximum Packet Size          | Supported     | The MQTT Service will not send any message larger than the requested size to this device.<br>Note that messages larger than the reqeusted size will be **silently discarded**. |
| Session Expiry Interval      | Ignored       | The requirement to set Clean Start on all connections means that session data is not retained.                   |
| Topic Alias Maximum          | Ignored       | The MQTT Service will not use topic aliases on messages sent to devices.                                         |
| Request Response Information | Ignored       | The MQTT Service will not send Request/Response hints in the `CONNACK` packet.                                   |
| Request Problem Information  | ???           | TBD                                                                                                              |
| User properties              | Ignored       | User properties on the `CONNECT` packet will be ignored by the MQTT Service.                                     |
| Authentication Method        | Ignored       | Extended authentication methods are not supported.                                                               |
| Authentication Data          | Ignored       | Extended authentication methods are not supported.                                                               |

#### Message publishing features {#mqtt-50-publish-features}

These features are relevant for `PUBLISH` packets sent from a device to the MQTT Service, or from the MQTT Service to a device.
In many cases, the additional MQTT version 5.0 properties on a message will be "passed through" from the device to a Messaging Service client, or vice-versa.
It is the responsibilty of the device or client receiving the message to handle these properties appropriately.

| Feature                      | Support level | Notes                                                                                       |
|------------------------------|---------------|---------------------------------------------------------------------------------------------|
| Quality of Service level     | QoS 0 and 1   | As for [version 3.1.1](#quality-of-service-qos). QoS level 2 is not supported.              |
| Duplicate message indicator  | Supported     | As for [version 3.1.1](#duplicate-messages). Supported according to the MQTT specification. |
| Payload Format Indicator     | Supported     | Passed through between MQTT devices and Messaging Service clients.                          |
| Response Topic               | Supported     | Passed through between MQTT devices and Messaging Service clients.<br>Clients are responsible for sending a response message on the specified topic. |
| Correlation Data             | Supported     | Passed through between MQTT devices and Messaging Service clients.<br>Clients are responsible for including the correlation data on any response message(s). |
| User properties              | Supported     | Passed through between MQTT devices and Messaging Service clients.                          |
| Content Type                 | Supported     | Passed through between MQTT devices and Messaging Service clients.                          |
| Message Expiry Interval      | Ignored       | The message expiry interval on messages published from devices will have no effect.<br>All messages published to devices will use the same message expiry interval. |
| Retained messages            | Not supported | As for [version 3.1.1](#retained-messages). Retained messages are not supported.            |
| Topic Alias                  | Not supported | Messages published using a topic alias will be rejected by the MQTT Service.                |
| Subscription Identifier      | Not supported | The subscription identifier will not be set on messages published by the MQTT Service.      |

#### Topic subscription features {#mqtt-50-subscribe-features}

These features relate to MQTT version 5.0 flags and properties that can be included in a `SUBSCRIBE` packet sent to the MQTT Service.

| Feature                      | Support level | Notes                                                                               |
|------------------------------|---------------|-------------------------------------------------------------------------------------|
| Maximum QoS level            | QoS 0 and 1   | As for [version 3.1.1](#quality-of-service-qos). QoS level 2 is not supported.      |
| User properties              | Ignored       | User properties on the `SUBSCRIBE` packet will be ignored by the MQTT Service.      |
| No local forwarding          | Ignored       | Local forwarding is not supported regardless of the setting of this option.         |
| Retained as Published        | Ignored       | Retained messages are not supported, so this option has no effect.                  |
| Retained message handling    | Ignored       | Retained messages are not supported, so this option has no effect.                  |
| Subscription Identifier      | Not supported | Subscriptions using a subscription identifier will be rejected by the MQTT Service. |
| Shared subscriptions         | Not supported | Subscriptions to topic names beginning with `$share` are not supported.             |

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
