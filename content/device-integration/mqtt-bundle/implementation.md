---
weight: 70
title: MQTT implementation
layout: redirect
---

This section lists the implementation details for the MQTT protocol. The {{< product-c8y-iot >}} implementation supports MQTT Version 3.1.1.

### Connecting via MQTT {#connecting-via-mqtt}

{{< product-c8y-iot >}} supports MQTT both via TCP and WebSockets. As URL you can use the domain of the instance in the format mqtt.&lt;instance_domain> (for example _mqtt.{{< domain-c8y >}}_) or your tenant domain (for example _mytenant.{{< domain-c8y >}}/mqtt_).

Available ports:

| &nbsp; | TCP | WebSockets |
|:-----|:----|:----|
| SSL | 8883 | 443 |
| no SSL | 1883 | 80 |

{{< c8y-admon-info >}}
Port 80 is deactivated in cloud systems.
{{< /c8y-admon-info >}}

Port 8883 supports two types of SSL: two-way SSL using certificates for client authorization and one-way SSL using username and password for client authorization.
Both methods are always enabled, and the one that will be used depends on whether the client provides a certificate at connection time.
If the client provides a certificate, it will be used to authenticate the client.
Otherwise, the client is expected to provide a username and password for authentication, in the MQTT `CONNECT` packet.
See [MQTT authentication](#mqtt-authentication) and [device certificates](/device-certificate-authentication/device-certificates/) for more details.

{{< c8y-admon-info >}}
To use WebSockets you must connect to the path <kbd>/mqtt</kbd> and follow the [MQTT standard](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718127) for WebSocket communication.
{{< /c8y-admon-info >}}

### SmartREST payload {#smartrest-payload}

The {{< product-c8y-iot >}} MQTT implementation uses SmartREST as a payload.
SmartREST is a CSV-like message protocol that uses templates on the server side to create data in {{< product-c8y-iot >}}.
It incorporates the highly expressive strength of the REST API but replaces JSON with comma-separated values (CSV) to avoid the complexity of JSON parsing for embedded devices.
Additionally, the simple and compact syntax of CSV renders it highly efficient for IoT communication via mobile networks.
It can save up to 80% of mobile traffic compared to other HTTP APIs.

{{< c8y-admon-info >}}
For all MQTT connections to the platform, the maximum accepted payload size is 16184 bytes, which includes both message header and body. The header size varies, but its minimum is 2 bytes.
{{< /c8y-admon-info >}}

#### SmartREST basics {#smartrest-basics}

A SmartREST message is a single row in which each parameter is separated by comma. The first parameter is an ID that defines the message. You can send multiple messages in a single publish by using a line break between messages.

#### SmartREST escaping {#smartrest-escaping}

The CSV (comma-separated values) format is used for communication with the SmartREST endpoint. The following rules must be followed to ensure a frictionless communication.

* Every row must be terminated by the `\n` character sequence.
* Values are always separated by a comma (`,`).
* If a value contains double-quotes (`"`), commas (`,`), leading or trailing whitespaces, line-breaks (`\n`), carriage returns (`\r`) or tab stops, it must be surrounded by quotes (`"`). Contained double-quotes (`"`) must be escaped by prepending a backslash (`\`).

The same escaping rules apply to messages that will be sent from the server to the client.

Publish example:

```text
100,"This value, needs escaping",This value does not need escaping
```

Subscribe example:

```text
511,myDeviceSerial,"execute this\nand this\nand \"this\""
```

{{< c8y-admon-info >}}
`\n` does not create a new line in the output (for example console, UI); to achieve this, a new line character (ASCII 0A) must be used.
{{< /c8y-admon-info >}}

### Device hierarchies {#device-hierarchies}

MQTT sessions are linked to a single device, but this device can have a freely configurable device hierarchy below it.

All children require a unique ID defined when creating the device. We recommend you to use a combination of the unique ID of the root device and a unique ID within the hierarchy.

To create data for a child instead of the root device, the unique ID of the child is added as another section in the topic (for example <kbd>s/us/myChildDeviceIdentifier</kbd>).

The client will automatically receive operations for every child in the hierarchy by subscribing to the respective topic. It is not required to subscribe for each child.

Every operation received will contain the template ID followed by the ID of the device/child for which the operation was created (followed by other operation parameters).

### MQTT features {#mqtt-features}

#### MQTT authentication {#mqtt-authentication}

The communication with {{< product-c8y-iot >}} employing MQTT supports authentication in two ways:

*   Username and password. The MQTT username must include the tenant ID and username in the format &lt;tenantID/username>.
*   Device certificates. For secure communication, devices must contain the entire chain of certificates leading to the trusted root certificate, or if only the device certificate is provided, then the immediate issuer certificate must be uploaded to the platform's truststore. Also, they must contain the server certificate in their truststore.

#### Troubleshooting {#troubleshooting}

##### A device sends correct username and password, but incorrect certificate at the same time {#a-device-sends-correct-username-and-password-but-incorrect-certificate-at-the-same-time}

If the platform is configured to support two-way SSL, your devices have a configured keystore with invalid certificates, and you want to use basic authorization, we recommend you to turn off sending certificates during connection.
Certificates may be invalid because they expired or the root certificate is not uploaded to the platform.
Turn off certificate sending in the device's software.
If that is not possible, to make the connection work, check the following:

* The platform's trust store cannot be empty. At least one trusted certificate must be uploaded to the platform.
* The device's MQTT client must be configured to not send certificates if it does not find its root certificate in the accepted issuers list returned by the server during handshake. In most cases this happens automatically. It is known that it's not working with the MQTT client and Java 11. However, it works with Java 8.
* In order to support this situation, the platform must be configured accordingly. In case you experience issues please contact [product support](/additional-resources/contacting-support/).
* If all of the cases above are met and the device connection is still rejected due to certificates validation, then probably some other tenant uploaded a certificate with the same 'Common Name' as one of those sent by your device. In this case the device will always try to authorize itself with certificates.

#### MQTT ClientId {#mqtt-clientid}

The MQTT ClientId is a field to uniquely identify each connected client. The {{< product-c8y-iot >}} implementation also uses the ClientId to link the client directly to a device. Therefore, the following format should be used for the ClientId:

`connectionType:deviceIdentifier:defaultTemplateIdentifier`

|Field|Mandatory|Description|
|:-------|:--------|:--------|
|connectionType|NO|Indication of connection type <br>default: d (device)|
|deviceIdentifier|YES|A unique identifier for your device, for example, IMEI, Serial number|
|defaultTemplateIdentifier|NO|Check [MQTT static templates](/smartrest/mqtt-static-templates) for more information about template identifiers|

For the simplest version of a client, the MQTT clientId can just be the `deviceIdentfier`. It will automatically be interpreted as device connection.

{{< c8y-admon-important >}}
The colon character has a special meaning in {{< product-c8y-iot >}}. Hence, it must not be used in the `deviceIdentifier`.
{{< /c8y-admon-important >}}

Examples of ClientIds:

```text
mySerialNumber
d:mySerialNumber
d:mySerialNumber:myDefaultTemplate
```

The uniqueness of the MQTT ClientId is determined only by the `deviceIdentifier`. Therefore, from the above examples only one client can be connected at the same time.

During an SSL connection with certificates, the `deviceIdentifier` must match the 'Common Name' of the used certificate (first certificate in the chain, which is provided by the device).

#### MQTT Quality of Service (QoS) {#mqtt-quality-of-service-qos}

The {{< product-c8y-iot >}} implementation supports all 3 levels of MQTT QoS:

* QoS 0: At most once
    - The client just sends the message once (fire and forget).
    - No reaction from the server.
* QoS 1: At least once
    - The client repeats the message until it receives a server acknowledgement.
* QoS 2: Exactly once
    - The client sends a message.
    - The server acknowledges (holds the message).
    - The client sends a release command.
    - The server processes the messages and acknowledges again.

For subscriptions to the operation or error topics, we will deliver all messages in the QoS which the client defined when subscribing to the topic.

#### MQTT clean session {#mqtt-clean-session}

{{< product-c8y-iot >}} requires clean session to be set to "1" (true). Currently we cannot guarantee that disabling clean session will work reliably, hence we recommend you to always enable clean session.

#### MQTT retained flag {#mqtt-retained-flag}

In the current {{< product-c8y-iot >}} implementation, subscriptions to topics where devices publish data are not allowed. Publishing data with the retained flag on this topic is allowed but has no practical difference to sending it without the flag.
Messages published by {{< product-c8y-iot >}} like operations and errors do not contain the retained flag.

#### MQTT last will {#mqtt-last-will}

In MQTT, the "last will" is a message that is specified at connection time and that is executed when the client loses the connection. For example, using `400,c8y_ConnectionEvent,"Device connection was lost."` as last will message and <kbd>s/us</kbd> as last will topic, raises an event whenever the device loses the connection.

{{< c8y-admon-info >}}
The execution of the "last will" updates the device availability.
{{< /c8y-admon-info >}}

### MQTT return codes {#mqtt-return-codes}

When there is an MQTT error, the platform responds with a `CONNACK` message with a non-zero return code.
This message is the first clue that there is a problem.
Such a return code can be treated similarly to REST API HTTP codes, such as 401.
They can be returned because of an unexpected error, lack of permissions, and so on.

`CONNACK` is not only a response to a `CONNECT` message, but also a way to signal errors that occurred in the platform.
Therefore, it is possible to receive this message a second time during a normal connection, and without a direct action.
It is also a way to signal a closing connection, as most MQTT clients treat `CONNACK` with a code other than `0` like the connection needs to be closed.
See the details below.

The table below shows the list of errors returned by {{< product-c8y-iot >}}:

|Code|Canonical message|Troubleshooting|
|:-------|:--------|:--------|
|0|Connection accepted | No issue, connection is working.|
|1|Connection refused, unacceptable protocol version | Unsupported version of the MQTT protocol. Currently, {{< product-c8y-iot >}} only allows 3.1 and 3.1.1.|
|2|Connection refused, identifier rejected | ClientId is not accepted by the platform.|
|3|Connection refused, Server unavailable | General platform side error, used on internal errors and unknown authorization problems. <br>Can be received on network issues. <br>The error should be temporary and independent of device state, therefore the usual solution to this is to try again later.|
|4|Connection refused, bad username or password | Incorrect credentials (wrong username and/or password, but not on empty password). This error is never returned when authenticating with certificates.|
|5|Connection refused, not authorized | Mostly a device side related problem, used when the device doesn't have permissions or is doing something forbidden. For example, if the client sends malformed messages or tries to execute an operation without authenticating first, such as publishing a message.<br>Thrown on any issue with certificate authentication (for example, wrong common name, failed auto registration). <br>Also thrown on general issues with receiving device data or some other authorization problem related to the device state on the platform. For example, device managed object problems, or the sudden removal of permissions. In this situation it may be required to take action on the platform to investigate and apply a fix.<br>When clientId is too long the user can receive this error when using 3.1 version of MQTT. This can happen if clientId has 24 characters or more.<br> Lastly, it can also be thrown on unexpected exceptions like performance issues, especially during connection. Therefore it is a good approach to repeat the connection a few times to overcome temporary performance issues.|

Refer to [MQTT Version 3.1.1 > 3.2 CONNACK - Acknowledge connection request](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718033) for details on the official MQTT connection return codes.

### Debugging {#debugging}

To support developers during development, it is possible to subscribe to the topic <kbd>s/e</kbd>. On this topic the device can retrieve debug and error messages that occur during a publish from the device.

{{< c8y-admon-info >}}
This topic is purely designed to support the development of clients. It is not recommended to always subscribe to this channel as the messages are verbose and can significantly increase the data usage. Also, you should not use this topic to trigger actions of the device based on what you receive on the topic. It is not a response channel.
{{< /c8y-admon-info >}}

### MQTT broker certificates {#mqtt-broker-certificates}

MQTT broker uses the certificates which are assigned to the main environment domain. MQTT broker always sends these certificates during TLS handshake to devices.
Moreover, {{< enterprise-tenant >}}s are not able to customize MQTT broker certificates via the SSL Management feature.
