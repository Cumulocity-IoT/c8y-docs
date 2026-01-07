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
Refer to the [MQTT specifications](https://mqtt.org/mqtt-specification/) for details of the differences between these versions.

MQTT version 3.1 is obsolete and not recommended.
Most of the details below for version 3.1.1 will be valid for version 3.1; however, the specific differences in protcol version 3.1 are not explicitly documented.

### Connecting to the MQTT Service {#connecting-via-mqtt}

MQTT devices can connect to the MQTT Service using direct TCP connections only.
The service supports "basic" (username/password) and TLS client certificate authentication.
For full details of the available ports and how to configure device authentication, see [Connecting MQTT devices](/device-integration/mqtt-service/#connecting-devices).

### MQTT version 3.1.1 features {#mqtt-311-features}

These features are also applicable to devices connecting using [version 5.0](#mqtt-50-features) of the MQTT protocol.

#### Client Identifier {#client-id}

Every device connecting to the MQTT Service within a given tenant must use a unique _Client Identifier_ (client ID).
If a device connects using a client ID that is already connected, the _existing_ connection will be terminated, in accordance with the MQTT specification.
Devices in different tenants can be connected at the same time using the same client ID.
Empty client IDs are not permitted.
See the table of [limits and quotas](/service-terms/quotas/#mqtt-service) for details of the maximum allowed client ID length.

#### Clean Session {#clean-session}

The MQTT Service **requires** devices to connect with the _Clean Session_ flag in the MQTT `CONNECT` packet set to "1" (true).
This flag is called _Clean Start_ in MQTT version 5.0.
If this flag is not set, the client connection will be rejected by the MQTT Service.

{{< c8y-admon-caution >}}
This means that messages sent _to_ a device while it is disconnected will **not** be automatically delivered to it when it reconnects.
Your devices and clients should implement an application-level protocol to send missed messages if this is important for your use case.
This limitation also applies to the experimental support for Core MQTT devices.
Pending {{< product-c8y-iot >}} device operations will **not** be sent to a Core MQTT device when it connects.
{{< /c8y-admon-caution >}}

#### Quality of Service {#quality-of-service-qos}

The MQTT Service supports two levels of MQTT Quality of Service (QoS).
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

#### Will Message {#will-message}

The MQTT _Will Message_ feature allows a device to provide a message in the `CONNECT` packet that will be published on behalf of the device if it disconnects unexpectedly.
Will Message is supported by the MQTT Service with these restrictions:
* Because of _device isolation_, the Will Message will not be delivered to any other connected MQTT device.
  The Will Message will be published onto the Messaging Service where it can be consumed by a microservice or external application client.
* The QoS level of the Will Message can be QoS 0 (at most once) or Qos 1 (at least once).
  QoS level 2 (exactly once) is not supported.
* Retained Will Messages are not supported.
  If the retain flag is set on the Will Message, the message will not be accepted.

#### Retained Message {#retained-message}

The MQTT _Retained Message_ feature is not supported by the MQTT Service.
If the RETAIN flag is set on a `PUBLISH` message from a device, the message will not be accepted and the connection will be closed.

Messages published by the MQTT Service to devices will never have the retain flag set.

#### Wildcard subscriptions {#wildcard-subscriptions}

A _wildcard subscription_ allows a device to subscribe to MQTT topics using a _pattern_ instead of a fixed topic name.
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
| Will Message                 | Supported     | With the same restrictions on QoS level, retained messages and device isolation as for [version 3.1.1](#will-message).<br>These additional version 5.0 properties on the Will Message are supported:<br>_Delay Interval_, _Payload Format Indicator_, _Content Type_, _Response Topic_, _Correlation Data_ and _User Property_.<br>The _Message Expiry Interval_ property on the Will Message is ignored. |
| Receive Maximum              | Supported     | The MQTT Service will limit the number of unacknowledged QoS 1 messages for the device to the requested maximum. |
| Maximum Packet Size          | Supported     | The MQTT Service will not send any message larger than the requested size to this device.<br>Note that messages larger than the reqeusted size will be **silently discarded**. |
| Request Problem Information  | Supported     | A device should not assume that the MQTT Service will send a reason string, even when this has been requested.   |
| Session Expiry Interval      | Ignored       | The requirement to set _Clean Start_ on all connections means that session data is not retained.                 |
| Topic Alias Maximum          | Ignored       | The MQTT Service will not use topic aliases on messages sent to devices.                                         |
| Request Response Information | Ignored       | The MQTT Service will not send request/response hints in the `CONNACK` packet.                                   |
| User Property                | Ignored       | User properties on the `CONNECT` packet will be ignored by the MQTT Service.                                     |
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
| User Property                | Supported     | Passed through between MQTT devices and Messaging Service clients.                          |
| Content Type                 | Supported     | Passed through between MQTT devices and Messaging Service clients.                          |
| Message Expiry Interval      | Ignored       | The message expiry interval on messages published from devices will have no effect.<br>All messages published to devices will use the same message expiry interval. |
| Retained Message             | Not supported | As for [version 3.1.1](#retained-message). Retained messages are not supported.             |
| Topic Alias                  | Not supported | Messages published using a topic alias will be rejected by the MQTT Service.                |
| Subscription Identifier      | Not supported | The subscription identifier will not be set on messages published by the MQTT Service.      |

#### Topic subscription features {#mqtt-50-subscribe-features}

These features relate to MQTT version 5.0 flags and properties that can be included in a `SUBSCRIBE` packet sent to the MQTT Service.

| Feature                      | Support level | Notes                                                                               |
|------------------------------|---------------|-------------------------------------------------------------------------------------|
| Maximum QoS level            | QoS 0 and 1   | As for [version 3.1.1](#quality-of-service-qos). QoS level 2 is not supported.      |
| User Property                | Ignored       | User properties on the `SUBSCRIBE` packet will be ignored by the MQTT Service.      |
| No Local                     | Ignored       | Local forwarding is not supported regardless of the setting of this option.         |
| Retained As Published        | Ignored       | Retained messages are not supported, so this option has no effect.                  |
| Retain Handling              | Ignored       | Retained messages are not supported, so this option has no effect.                  |
| Subscription Identifier      | Not supported | Subscriptions using a subscription identifier will be rejected by the MQTT Service. |
| Shared Subscription          | Not supported | Subscriptions to topic names beginning with `$share` are not supported.             |

### Topics {#mqtt-topics}

In general, the MQTT Service does not impose any restrictions on topic structure, and devices may use any topic name allowed by the MQTT specification.
However, there are a small number of topic names that are reserved for historical compatibility or potential future use.
These topic name cannot be used by devices:

* All _system topics_ (topic name beginning with `$`) unless specifically documented

There is a hard limit on the maximum length of a topic name.
See the [Service Quotas](/service-terms/quotas#mqtt-service) section for details of the limit.

#### Core MQTT topics {#core-mqtt-topics}

The {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt) protocols use a specific set of topics defined in the [MQTT quick reference](/smartrest/quick-reference/#topic-format).
All message publication and subscription on these topics is assumed to be for Core MQTT devices and will be routed to and from the {{< product-c8y-iot >}} core.
All other topics are available for use by "generic" MQTT devices.
Message traffic on generic topics will be routed to and from the {{< product-c8y-iot >}} Messaging Service where it can be accessed by microservice and external application clients.

There is no overlap between the Core MQTT and generic device topic spaces.
Generic devices should avoid using any topic name starting with the Core MQTT prefixes listed below, even though some topics under those prefixes are not used by Core MQTT.
This will help to avoid situations where it is not obvious how a given topic should be handled, which may be difficult to debug:

* `s/`
* `t/`
* `q/`
* `c/`
* `alarm/alarms/`
* `event/events/`
* `measurement/measurements/`
* `inventory/managedObjects/`
* `devicecontrol/notifications`

### Payloads {#mqtt-payloads}

The MQTT Service does not impose any specific message payload format.
Message payloads are treated as opaque sequences of bytes that are delivered exactly as they were received.
The content of a message payload will not have any effect on the behaviour of the MQTT Service.

There is a system-wide hard limit on the maximum size of an MQTT message, and a per-tenant soft quota that will be set lower than the hard limit by default.
See the [Service Quotas](/service-terms/quotas#mqtt-service) section for details of these limits.
The soft quota can be increased up to the hard limit on request, although this may incur additional costs for the tenant.
The message size used by these limits includes the message header as well as the payload.
Message header size can vary significantly, particularly for MQTT version 5.0 devices, but it will always be at least 2 bytes, and usually more.

### Error reporting {#mqtt-error-reporting}

The MQTT Service follows the MQTT specification for responses from the server to devices.

According to the specification, if the server receives a malformed packet or a protocol error, it must disconnect the device.
For MQTT version 3.1.1 devices, the device will simply be disconnected with no warning.
For MQTT version 5.0 devices, the MQTT Service may send the device a packet containing a _reason code_, indicating the reason for the disconnection, before closing the connection.
This will be a `CONNACK` packet in response to an error in a `CONNECT` packet, or a `DISCONNECT` packet in response to any other incorrect packet.

The server may receive a packet that is correct according to the protocol, but that it rejects for some other reason, such as a limit being exceeded.
For devices using MQTT version 3.1.1, the protocol provides no way to indicate why a packet was rejected, so the connection will simply be dropped.
The only exception is the `SUBACK` packet, which can indicate that a subscription failed, although without giving any more detailed reason.
For devices using MQTT version 5.0, the protocol allows a reason code to be sent in response packets including `SUBACK` and `PUBACK`.
The reason code provides the device with more information about why a specific request was rejected.
The connection may still be dropped after sending the response packet.

The available reason codes are listed in [section 2.4 of the MQTT version 5.0 specification](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc3901031).

#### Alarms {#mqtt-alarms}

The MQTT Service will also raise {{< product-c8y-iot >}} alarms in response to some error conditions on device connections.
This gives better visibility of problems to tenant users and applications, which is especially useful when obtaining good diagnostic data from a device is difficult.
Alarms are _rate limited_, to avoid overloading the {{< product-c8y-iot >}} platform with too many alarms.
This means that if, for example, many devices publish messages larger than the allowed maximum size in a short period of time, an alarm will not be raised for every instance of the problem.
However, tenant users will still be aware that devices are publishing too-large messages, and can take steps to correct this.

The table below describes the alarms that will be raised for problems related to device connections:

<font color="red" size="24">**TBC: need details of the from-device alarms**</font>

### MQTT device quotas and limits

The MQTT Service enforces several different quotas and limits on MQTT devices.
See the [Service Quotas](/service-terms/quotas#mqtt-service) section for details of the current values.
As with other error conditions, a device exceeding a quota or limit will be handled according to the MQTT specification.

For devices using MQTT version 3.1.1, the protocol provides no way to indicate that a limit has been reached, so the connection will simply be dropped.
The only exception is the `SUBACK` packet, which can indicate that a subscription failed, although without giving any more detailed reason.

For devices using MQTT version 5.0, where the protocol allows a reason code to be sent, the code `0x97` (Quota exceeded) will be used.
The connection may still be dropped after sending this reason code.

For all protocol versions, an alarm will also be raised, subject to the rate limiting described in [Alarms](#mqtt-alarms).

See also the discussion of [Messaging Service quotas and limits](#messaging-service-quotas-limits) imposed by the MQTT Service.
These do not affect device connections directly, but "back pressure" from the Messaging Service can lead to device errors, for example if the Messaging Service is unable to accept more messages from a device.
