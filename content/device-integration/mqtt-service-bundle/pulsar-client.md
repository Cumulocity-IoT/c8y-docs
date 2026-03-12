---
weight: 30
layout: redirect
title: Integrating with microservices and external applications
---

{{< product-c8y-iot >}} microservices and external applications can consume messages published by devices connected to the MQTT Service, and publish messages back to those devices.
To do this, your microservice or external application connects to the {{< product-c8y-iot >}} Messaging Service, a deployment of [Apache Pulsar](https://pulsar.apache.org/), and uses the Pulsar protocol to publish and consume MQTT messages.
The diagram below shows the important interfaces and data flows used when interacting with the MQTT Service through Pulsar.

<p align="center" width="100%">
    <img width="80%" src="/images/mqtt-service/mqtt-service-pulsar-connections.svg" alt="MQTT Service Pulsar connections">
</p>

{{< c8y-admon-info >}}
An _MQTT Service messaging client_ is a software component that interacts with the MQTT Service through Pulsar.
It can be deployed as a microservice hosted by the {{< product-c8y-iot >}} platform, or as part of an external application hosted outside the platform.
This documentation refers to such a component simply as a _client_.
If the implementation or behaviour differs depending on where the client is hosted, those differences are documented where relevant.
{{< /c8y-admon-info>}}

The MQTT Service implements _device isolation_, meaning that MQTT devices connected to the MQTT Service **cannot** communicate directly with each other using the MQTT protocol.
All inter-device communication must be managed explicitly by the client, as shown in the diagram.

This documentation does not cover the publish-subscribe messaging concepts and architecture implemented by Pulsar, nor any features of the Pulsar client libraries beyond those needed to implement a simple MQTT Service client.
To learn more about those subjects, refer to the [Pulsar product documentation](https://pulsar.apache.org/docs/4.0.x/).

### Connecting to the Messaging Service {#connecting-messaging-service}

To connect your client to the Messaging Service, you will need:
1. A [Pulsar client library](https://pulsar.apache.org/docs/4.0.x/client-libraries/).
2. The URL of the Messaging Service (Pulsar broker) in your {{< product-c8y-iot >}} environment.
3. Credentials for a user in your tenant with permission to access MQTT Service data on the Messaging Service.

Each of these prerequisites is explained in detail below.

#### Pulsar client library {#pulsar-client-library}

Open-source Pulsar client libraries are available for a number of different languages and protocols.
The example code in this documentation will use the [Java client library](https://pulsar.apache.org/docs/4.0.x/client-libraries-java/).
Pulsar has strong cross-version compatibility.
Use the latest version of your chosen client library regardless of the server version used by the Messaging Service.
Integration with the MQTT Service does not require advanced Pulsar features that may only be available in the latest server version.

{{< c8y-admon-caution >}}
Currently only "basic" (username/password) authentication is supported for clients connecting to the Messaging Service through Pulsar.
Therefore, you must ensure that your chosen Pulsar client library supports this authentication scheme.
{{< /c8y-admon-caution >}}

#### Pulsar URL {#pulsar-url}

For a microservice client, the URL should be obtained from the `C8Y_BASEURL_PULSAR` [environment variable](/microservice-sdk/general-aspects/#environment-variables) that will be passed to the microservice when it starts running.
For an external application client, the URL has the general form `pulsar+ssl://<tenant_domain>:6651/`, where `<tenant_domain>` is the domain of your {{< product-c8y-iot >}} tenant, for example `my-tenant.cumulocity.com`.
As implied by the `pulsar+ssl` protocol name, all external application client connections will use SSL/TLS security.
Currently, only one-way TLS is supported. The server provides a certificate that the client can verify. Client certificates cannot be used.
Implementing an external application client so that it reads the Pulsar URL from the `C8Y_BASEURL_PULSAR` environment variable makes it easier to develop a client that can be deployed as either a microservice or an external application.

#### Pulsar authentication {#pulsar-authentication}

Authentication credentials identify both the {{< product-c8y-iot >}} tenant and the user within that tenant.
Currently, only "basic" (username and password) authentication is supported for clients connecting to the Messaging Service through Pulsar.
For a microservice client, you should use the credentials of the per-tenant [service user](/microservice-sdk/general-aspects/#users-and-roles) that will be passed to the microservice when the tenant is subscribed to it.
For an external application user, you can use the credentials of any tenant user with the appropriate authorization roles assigned, as described below.
The username must be in the form `<tenantID>/<user>` where `<tenantID>` is the tenant ID (not the tenant name), and `<user>` is a user within that tenant.
If two-factor authentication (TFA) is enabled for your tenant, your user must have the `devices` role assigned to disable the TFA check for that user.
See [TFA Settings](/authentication/basic-settings/#tfa-settings) for more information.
Note that the `devices` role may be shown as "Device User" in the {{< product-c8y-iot >}} user interface.

#### Role-based access control {#role-based-access-control}

Pulsar client connections will be granted access to Messaging Service resources based on the roles and permissions assigned to the authenticated user.
The following roles and permissions should be used for MQTT Service messaging clients:

| Role and permission                   | Access granted                                                   |
|---------------------------------------|------------------------------------------------------------------|
| Mqtt service messaging topics, Read   | Consume messages from MQTT devices connected to the MQTT Service |
| Mqtt service messaging topics, Update | Publish messages to MQTT devices connected to the MQTT Service   |

For microservice clients, the required permissions should be added to the `requiredRoles` section of the [microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest), which will grant the requested permissions to the per-tenant service user.
For example:

```json
{
    "apiVersion": "v2",
    "name": "my-mqtt-service-client",
    "version": "1.0.0",
    ...
    "requiredRoles": [
        "ROLE_MQTT_SERVICE_MESSAGING_TOPICS_READ",
        "ROLE_MQTT_SERVICE_MESSAGING_TOPICS_UPDATE"
    ],
    ...
}
```

For external application clients, the required permissions should be configured for the authenticating user through the [Administration application](/standard-tenant/managing-permissions/).

Assign only the minimum permissions needed for the client to operate.
For example, if your microservice only consumes messages, do not include the `ROLE_MQTT_SERVICE_MESSAGING_TOPICS_UPDATE` permission in the manifest.

#### Example code -- connecting to the Messaging Service {#example-code-connecting-messaging-service}

The code snippet below shows how to use the Pulsar Java client library to connect to the Messaging Service with basic authentication.
It assumes that the Pulsar URL is in the `C8Y_BASEURL_PULSAR` environment variable and that the tenant identifier, username and password are provided on the command line.
Note that the client library will not actually attempt to connect to the Pulsar server immediately when the `PulsarClient` object is created.
In the interest of brevity and clarity, this example does no error handling.
A realistic implementation would need to handle exceptions thrown by the Pulsar client library methods.

```java
package c8y.example.mqttservice;

import java.text.MessageFormat;
import java.nio.charset.StandardCharsets;

import org.apache.pulsar.client.api.Consumer;
import org.apache.pulsar.client.api.Message;
import org.apache.pulsar.client.api.MessageListener;
import org.apache.pulsar.client.api.Producer;
import org.apache.pulsar.client.api.PulsarClient;
import org.apache.pulsar.client.api.PulsarClientException;
import org.apache.pulsar.client.api.Schema;
import org.apache.pulsar.client.impl.auth.AuthenticationBasic;

public class SimplePulsarClient {
    public static void main(String[] args) throws Exception {
        // Validate command line.
        if (args.length != 2) {
            System.err.println("Usage: SimplePulsarClient <tenantID> <username>");
            System.err.println("The Pulsar URL will be read from the C8Y_BASEURL_PULSAR environment variable");
            System.err.println("The password will be read from the console");
            System.exit(-1);
        }

        // Collect all the configuration properties.
        final String pulsarUrl = System.getenv("C8Y_BASEURL_PULSAR");
        final String tenantID = args[0];
        final String username = args[1];
        final String password = new String(System.console().readPassword("Password for user %s/%s: ", tenantID, username));

        // Create the basic authentication credentials object.
        final AuthenticationBasic basicAuth = new AuthenticationBasic();
        basicAuth.configure(MessageFormat.format("'{'\"userId\":\"{0}/{1}\",\"password\":\"{2}\"'}'", tenantID, username, password));

        // Create a Pulsar client using the basic authentication credentials.
        // The client will *not* try to connect and authenticate immediately.
        final PulsarClient client = PulsarClient.builder()
            .serviceUrl(pulsarUrl)
            .authentication(basicAuth)
            .build();
        System.out.println("Created Pulsar client");

        // The rest of the example will go here...
    }
}
```

### Message payloads and properties {#message-payloads-properties}

Pulsar messages consist of a _payload_ and set of _properties_.

The payload is a sequence of zero or more bytes, identical to the payload of the MQTT `PUBLISH` message that the Pulsar message corresponds to.
It is the client's responsibility to understand the format of the payloads produced and accepted by the MQTT devices it communicates with.

For messages received from devices, the Pulsar `eventTime` field holds the time that the MQTT `PUBLISH` message arrived at the MQTT Service.
The time is represented as a Unix timestamp (the number of milliseconds since 1 January 1970 00:00:00 UTC).
This ensures downstream consumers have a consistent time source for processing.

Pulsar message properties are name-value pairs, where both the name and the value are text strings.
The properties recognised by the MQTT Service are listed in the table below.
Messages received from MQTT devices will **always** include the properties marked as required, and may include any of the optional properties.
Received messages will not include any properties other than those listed here.
Messages published to MQTT devices **must** include all of the required properties, and may include any of the optional properties.
If a published message includes any properties other than those listed here, those properties will be ignored by the MQTT Service.

| Property name                     | Required          | Value type and encoding                                               | Purpose                                                                    |
|-----------------------------------|-------------------|-----------------------------------------------------------------------|----------------------------------------------------------------------------|
| `topic`                           | YES               | String                                                                | MQTT topic name                                                            |
| `clientID`                        | YES<sup>(1)</sup> | String                                                                | MQTT client identifier                                                     |
| `tx.clientUsername`<sup>(2)</sup> | NO<sup>(3)</sup>  | String                                                                | MQTT client username, or common name in case of certificate authentication |
| `tx.clientAuthType`               | NO<sup>(3)</sup>  | String                                                                | MQTT client authentication method (BASIC or X509)                          |
| `tx.payloadFormatIndicator`       | NO                | Single byte with two permitted values, encoded as strings "0" and "1" | MQTT v5 Payload Format Indicator                                           |
| `tx.contentType`                  | NO                | String                                                                | MQTT v5 Content Type                                                       |
| `tx.responseTopic`                | NO                | String                                                                | MQTT v5 Response Topic                                                     |
| `tx.correlationData`              | NO                | Sequence of bytes, encoded as a Base64 string                         | MQTT v5 Correlation Data                                                   |
| `tx.userProperties.<name>`        | NO                | String                                                                | MQTT v5 User Property with name `name`<sup>(4)</sup>                       |

Notes:
1. The `clientID` property can be omitted from a published message only in special case of a _broadcast_ message, described below in [broadcast messages](#broadcast-messages).
2. The `tx.` prefix indicates that a property is specific to a _transport_, in this case the MQTT Service.
   Other transports will define their own transport-specific properties, but all transports will use `topic` and `clientID`.
3. When a device connects to the MQTT Service using certificate authentication, the service enforces a strict binding,
   ensuring that the certificate's Common Name matches the `clientID`.
   However, when a device connects using basic authentication, there is no automatic binding between the authenticated user and the `clientID`.
   To prevent client spoofing, it is the responsibility of the consumer to implement authorization validation. By checking the `tx.clientAuthType` and `tx.clientUsername` properties, downstream consumers (like your microservice) can verify whether the authenticated user is actually authorized to publish messages on behalf of the asserted `clientID`.
4. The MQTT version 5 specification allows a message to include more than one user property with the same name.
   This feature is **not** supported by the MQTT Service.
   If a device publishes a message containing multiple user properties with the same name, only one of these will be copied into the Pulsar message.
   It is undefined which property will be copied.

### Consuming messages from MQTT devices {#consuming-messages-from-mqtt-devices}

All messages published by devices connected to the MQTT Service for a given tenant will be published to a _single_ Pulsar topic, identified by the URL `persistent://<tenantID>/mqtt/from-device`.
The topic URL can be broken down into 4 components:

| Component     | Description                                                                                                                                                                      |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `persistent`  | Indicates that this is a persistent topic that will be preserved by the Messaging Service across component failures and restarts, to provide "at least once" delivery guarantees |
| `<tenantID>`  | The Pulsar tenant ID, which will match the {{< product-c8y-iot >}} tenant ID                                                                                                     |
| `mqtt`        | The Pulsar namespace within the tenant, which will always be `mqtt` for the MQTT Service                                                                                         |
| `from-device` | The Pulsar topic within the namespace, which will always be `from-device` for message from devices connected to the MQTT Service                                                 | 

Your client will only be able to consume from this topic if the authenticated user has the "read" permission on the "Mqtt service messaging topics" role.
The client will not be able to consume from any other topic.

The client identifier of the device that published the messages, and the MQTT topic it was published on, can be obtained from the message properties `clientID` and `topic` as described above.
The Pulsar `eventTime` field provides the exact time when the message was received by the MQTT Service.
This means that your client **must** consume every message published by every device connected to the MQTT Service for the tenant, even those you are not interested in.
Messages that are not of interest to the client can simply be acknowledged without further processing.

{{< c8y-admon-caution >}}
Your client **must** be trusted to safely handle every message published by every device connected to the MQTT Service in your tenant.
If untrusted users have access to your tenant, these users should **not** be permitted to upload microservices, nor to connect external application clients to the Messaging Service.
This recommendation also applies in the case of multiple customers, who do not mutually trust each other, sharing a single tenant.
{{< /c8y-admon-caution >}}

#### Durable subscriptions and message acknowledgement {#durable-subscriptions-message-acknowledgement}

Subscribing a consumer to a topic establishes a _durable subscription_ to the topic.
This means that the Messaging Service will retain messages published to the topic until they have been delivered to, and acknowledged by, a client.
The subscription will remain until it is explicitly deleted.
It will not be removed simply because the client is not currently running.
Messages that are published while the client is disconnected will be available for it to consume when it reconnects.
After consuming each message, the client **must** explicitly acknowledge it.
Acknowledging a message tells the Messaging Service that the client has no further interest in it, allowing the message to be discarded.
See the section on [best practices](#reliable-delivery-best-practices) below for more information on managing durable subscriptions correctly.

#### Example code -- consuming messages {#example-code-consuming-messages}

The code snippet below shows how to use the Pulsar Java client library to consume messages from the MQTT Service `from-device` topic.
It extends the previous example that showed how to [set up the connection to the Pulsar server](#example-code-connecting-messaging-service).

To consume messages from the topic, your client should create a Pulsar `Consumer` and subscribe it to the topic.
The consumer should register a `MessageListener` callback that will be called whenever a new message arrives on the topic.
The `MessageListener` implementation shows how to access the payload, properties, and arrival time of the received messages.
For simplicity, the application messages in the example are simple text strings.
However, the payload of the Pulsar message will always be an array of bytes, that must be converted to the format used by the application.

```java
        // Create a simple message listener that will log some details of
        // each message received, when registered with a consumer.
        final MessageListener<byte[]> listener = new MessageListener<byte[]>() {
            @Override
            public void received(Consumer<byte[]> consumer, Message<byte[]> message) {
                final String clientId = message.getProperty("clientID");
                final String topic = message.getProperty("topic");
                final long eventTime = message.getEventTime();
                System.out.println(MessageFormat.format("Received message from MQTT device {0} on MQTT topic {1}", clientId, topic));
                System.out.println(MessageFormat.format("MQTT PUBLISH arrival timestamp: {0}", eventTime));
                System.out.println(MessageFormat.format("Message payload: {0}", new String(message.getValue(), StandardCharsets.UTF_8)));
                System.out.println(MessageFormat.format("Message properties: {0}", message.getProperties()));
                try {
                    // Acknowledge the message.
                    consumer.acknowledge(message);
                } catch (PulsarClientException e) {
                    e.printStackTrace();
                }
            }
        };

        // Create a Pulsar consumer on the from-device topic for the tenant,
        // using the listener defined above to process each message.
        // This will trigger connection and authentication by the client.
        final Consumer<byte[]> consumer = client.newConsumer(Schema.BYTES)
            .topic(MessageFormat.format("persistent://{0}/mqtt/from-device", tenantID))
            .subscriptionName("demoSubscription")
            .messageListener(listener)
            .subscribe();
        System.out.println("Created Pulsar consumer");
```

### Publishing messages to MQTT devices {#publishing-messages-to-mqtt-devices}

Any messages that your client wants to send to devices connected to the MQTT Service for a given tenant must be published to a _single_ Pulsar topic, identified by the URL `persistent://<tenantID>/mqtt/to-device`.
The components of the URL should be interpreted as described in [Consuming messages from MQTT devices](#consuming-messages-from-mqtt-devices) above.

Your client will only be able to publish to this topic if the authenticated user has the "update" permission on the "Mqtt service messaging topics" role.
The client will not be able to publish to any other topic.

Messages published to the `to-device` topic are routed to connected MQTT devices using the two required message properties:

| Property name | Purpose                                                              |
|---------------|----------------------------------------------------------------------|
| `clientID`    | Client identifier of the MQTT device that should receive the message |
| `topic`       | Name of the MQTT topic that the message should be published to       |

If the `topic` property is empty or missing, the message will not be published to any MQTT client.
The message will only be published to a device with an active subscription to the named MQTT topic.
The message will only be published to a client that is connected at the time the MQTT Service processes the published message.

Successfully publishing a message to the Messaging Service does **not** mean that the message has been successfully delivered to any MQTT device.
Onward publishing to MQTT devices happens _asynchronously_ and without any feedback to the Pulsar client.
Messages will be delivered to devices according to the MQTT protocol specification, using the QoS level of the MQTT subscription made by the device.
However, because MQTT devices are required to use a _clean session_ when connecting to the MQTT Service, messages published to a device while it is disconnected will not be delivered.

#### Broadcast messages {#broadcast-messages}

To enforce device-level isolation, messages are published **only** to the specific MQTT client identified by the `clientID` property, provided that client has an active subscription to the relevant MQTT topic.
If the `clientID` property is not present, the message is broadcast to **all** connected MQTT clients with active subscriptions to that topic.

Broadcast publishing is potentially expensive when many clients are connected and may deliver messages to unexpected devices.
Use broadcast only when the application must publish the same message to every device subscribed to a topic.

#### Message keys {#message-keys}

To facilitate efficient delivery and correct ordering of messages sent to MQTT devices, clients **must** also set the _key_ of a Pulsar message published to the `to-device` topic.
The key should be set as follows:

* When the `clientID` message property is set, the key should have the same value as this property.
* When the `clientID` message property is **not** set, the key should have the same value as the `topic` message property.

#### Handling of invalid messages {#handling-of-invalid-messages}

Published messages that do not follow the rules for message properties and keys documented above will **not** be delivered to any MQTT device.
In particular this applies to messages with the following invalid configuration:

* The message _key_ is not set.
* The message _key_ is set but does not match the `clientID` or `topic` property as described in [message keys](#message-keys).
* The `clientID` property is set but has an empty value.
* The `topic` property is not set, or it is set but has an empty value.

An alarm will be raised in the {{< product-c8y-iot >}} tenant when one of these invalid messages is detected and discarded.
The rate of alarm sending is limited to avoid overloading the tenant with redundant alarms alerting about the same error on different messages.
The following alarms are raised for invalid messages on the Pulsar `to-device` topic:

| Alarm type                               | Description                                                       |
|------------------------------------------|-------------------------------------------------------------------|
| `c8y_MqttService_ToDevice_NoKey`         | The message key is not set.                                       |
| `c8y_MqttService_ToDevice_InvalidKey`    | The message key is set but does not match the client id or topic. |
| `c8y_MqttService_ToDevice_EmptyClientId` | The `clientID` property is set but has an empty value.            |
| `c8y_MqttService_ToDevice_MissingTopic`  | The `topic` property is not set.                                  |
| `c8y_MqttService_ToDevice_EmptyTopic`    | The `topic` property is set but has an empty value.               |

A message with a non-empty `clientID` property referring to an MQTT device that is not currently connected is **not** considered to be invalid.
However, this message will not be delivered to the device, even if it connects later, because of the requirement for devices to use a _clean session_ when connecting.
Similarly, a message published to a connected MQTT device that is not currently subscribed to the MQTT topic specified in the `topic` property is not considered to be invalid.
In these situations, the message will not be delivered but no alarms will be raised.

#### Example code -- publishing messages {#example-code-publishing-messages}

The code snippet below shows how to use the Pulsar Java client library to publish messages to the MQTT Service `to-device` topic.
It extends the previous examples that [set up the connection to the Pulsar server](#example-code-connecting-messaging-service) and [created a message consumer](#example-code-consuming-messages).

To publish messages to the topic, your client should first create a Pulsar `Producer` associated with the topic.
Then, the `Producer` can be used to create new `Message` objects that will be published to the topic.
The example code shows how to correctly set the message properties and message key for messages targeted at a single device, and for "broadcast" messages.
Again, the example assumes that the application messages are simple text strings, that must be converted to the byte array expected by the MQTT Service.
For clarity, most error-handling code is omitted from the example.
See [Handling Messaging Service errors](#handling-messaging-service-errors) for advice on dealing with errors in a production client.

```java
        // Wrap all the operations that might fail after we create the
        // durable subscription in a try-catch, so that we can delete the
        // subscription if something goes wrong.
        try {
            // Create a Pulsar producer on the to-device topic for the tenant.
            final Producer<byte[]> producer = client.newProducer(Schema.BYTES)
                .topic(MessageFormat.format("persistent://{0}/mqtt/to-device", tenantID))
                .create();
            System.out.println("Created Pulsar producer");

            // Publish a message to a single MQTT device.
            producer.newMessage()
                .property("clientID", "demoClient")
                .property("topic", "demoTopicB")
                .key("demoClient")
                .value("Message sent to a single device".getBytes(StandardCharsets.UTF_8))
                .send();
            System.out.println("Sent message to single device");

            // Publish a message to all MQTT devices subscribed to a topic.
            // Note that the "clientID" property is omitted here.
            producer.newMessage()
                .property("topic", "demoTopicB")
                .key("demoTopicB")
                .value("Message sent to all subscribed devices".getBytes(StandardCharsets.UTF_8))
                .send();
            System.out.println("Sent message to all subscribed devices");

            // Close the producer.
            producer.close();
        }
```

### Messaging Service quotas and limits {#messaging-service-quotas-limits}

Messages published to a Pulsar topic are stored persistently by the Messaging Service until they have been delivered to, and acknowledged by, all interested consumers.
For messages published to the `from-device` topic by the MQTT Service, the consumers are any clients that have created durable subscriptions on the topic.
For messages published to the `to-device` topic by clients, the consumers are the instances of the MQTT Service that will deliver the messages to devices.

To optimize resource usage, the Messaging Service imposes storage limits and a message time-to-live (TTL) on persistently stored messages.

See the [service quotas](/service-terms/quotas/#mqtt-service) documentation for details on the default limits.
These limits are configurable on a per-tenant basis.
If your use case requires a different configuration, or if you have any questions or concerns, contact [product support](https://cumulocity.com/docs/additional-resources/contacting-support/).

#### Message backlog quota {#message-backlog-quota}

Persistent messages are stored in a _backlog_ until they are delivered to any interested consumers.
The maximum size of the backlog is set by the _backlog quota limit_, which directly affects the number of messages that can be stored and therefore the resource consumption of the platform.

A separate backlog exists for each Pulsar topic, so for the MQTT Service the `from-device` and `to-device` topics for a tenant will each have their own independent backlog.
The backlog is shared by all subscriptions on a topic.
If the backlog quota limit is reached, no new messages can be added to the backlog until some older messages have been delivered, or deleted due to their TTL expiring.

If the backlog quota limit for the Pulsar `from-device` topic is reached, new MQTT `PUBLISH` packets from connected devices will be rejected.
If the `PUBLISH` packet was sent with QoS level 0, the message will be lost.
If the `PUBLISH` packet was sent with QoS level 1, the behaviour depends on the MQTT protocol version used by the device:
* For devices using MQTT version 3, the device will be disconnected.
* For devices using MQTT version 5, the device will receive a `PUBACK` packet with reason code `0x97`, _Quota exceeded_.

If the backlog quota limit for the Pulsar `to-device` topic is reached, clients calling the `Producer.send()` method, or its equivalent in the Pulsar library used by the client, will receive an appropriate exception or error response from the client library.

#### Message time-to-live {#message-time-to-live}

Any undelivered messages will be automatically deleted if they have been on the backlog for longer than the _time-to-live (TTL) limit_.
This policy helps to limit overall resource usage and reduces the need to process outdated data after a prolonged disconnection of a consumer.

No undelivered message will ever be deleted from the backlog unless it reaches its TTL limit.
Messages will always be delivered to the consumer in the order they were published to the topic.

### Best practices for reliable message delivery from devices {#reliable-delivery-best-practices}

If a topic reaches its backlog quota limit, it stops accepting new messages and messages may be lost. To avoid this:

* Process and acknowledge messages from the `from-device` topic as quickly as possible.
  Every message **must** be explicitly acknowledged, even if the client is not interested in it.
  Do not acknowledge a message until processing is complete or the message has been stored securely for later processing.
  Acknowledged messages will not be re-delivered after a client failure or restart.
* Manage subscription lifecycles. Subscribing a consumer creates a _durable subscription_ that remains until explicitly deleted.
  Messages published while the client is disconnected will be retained for the subscription and delivered when the client reconnects.
  Because subscriptions persist, a topic can reach its backlog quota even when no clients are running.
  1. Use the same subscription name each time the client connects. Avoid creating random subscription names on each run. That leaves inactive subscriptions accumulating and may exhaust the backlog.
  2. Explicitly delete subscriptions when they are no longer required. For example, when taking a client out of service for an extended period, call the consumer `unsubscribe()` method or use the Messaging Service [monitoring and management](/standard-tenant/monitoring/#messaging-service) interface to delete the subscription.

#### Example code -- deleting the subscription {#example-code-deleting-subscription}

The code snippet below shows how to delete the subscription and close the other Pulsar client objects created by the earlier code examples.

```java
        finally {
            // Delete the durable subscription.
            // This is only necessary if messages should *not* be retained
            // on the topic while the client is disconnected.
            consumer.unsubscribe();
        }

        // Close the other Pulsar objects that we created.
        consumer.close();
        client.close();
```

### Handling Messaging Service errors {#handling-messaging-service-errors}

The {{< product-c8y-iot >}} Messaging Service is a complex, distributed service running remotely from your client.
In common with all distributed systems, perfect reliability cannot be guaranteed, and a client should be prepared to handle errors reported by the Pulsar client library.
These errors can be split into two general categories:
1. Configuration or logical errors in the client implementation.
   Errors in this category are usually "fatal" and prevent the client from connecting to the Messaging Service, or publishing or consuming any messages.
   Some typical examples of this type of error include:
   * Attempting to connect with an incorrect Pulsar URL.
   * Using invalid authentication credentials.
   * Using the credentials of a user that is not authorized to access the Messaging Service.
   * Attempting to consume from the `to-device` topic, or publish to the `from-device` topic.
   * Attempting to publish to or consume from any other topic.
   * Attempting to publish incorrectly constructed messages.
     The most likely cause for this is attempting to publish a message with a payload that was not explicitly created as a byte array.
2. Transient errors in the Messaging Service.
   Errors in this category usually reflect a temporary issue with the Messaging Service server, that will be resolved either automatically or by administrator action.
   Some transient errors that a client may experience include:
   * Connections may be dropped when Messaging Service components are restarted during upgrades, or during unplanned outages of the Messaging Service.
     This will cause publish or consume operations to fail, and it may be necessary to re-connect, or re-establish the producer or consumer, before retrying the operation.
   * Published messages will be rejected when the backlog quota limit on the `to-device` topic has been reached.
     See [reliable delivery best practices](#reliable-delivery-best-practices) for advice on avoiding this situation.
   * Published messages may be rejected if other limits or quotas on the Messaging Service are reached.

If your client is using the Java client library, almost all errors will be reported as a `PulsarClientException` thrown by a client library method.
In some very rare cases a `SchemaSerializationException` runtime error might also be thrown, if the client has not used the `Schema.BYTES` schema and byte array payloads exclusively.
The `PulsarClientException` class has many sub-classes that allow a client to determine the cause of the error more precisely.
Other client libraries will have similar language-specific error reporting mechanisms.

In general, it is not possible to recover from a fatal configuration or logic error in the client implementation.
The client will need to be restarted after the error has been corrected.
For transient errors, a strategy of retrying after a delay is usually appropriate.
When an operation on a producer or a consumer has failed, it may be difficult to identify the exact root cause and the optimal response.
A simple recovery approach that covers most scenarios is to delete the failed producer or consumer and create a new one before retrying the operation.
This avoids cases where the producer or consumer cannot reconnect after an error.
A more sophisticated strategy can tailor the response to the specific subclass of `PulsarClientException` thrown.
Use an [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) strategy to increase the delay between retries until the service recovers.

### Example client {#example-client}

A complete [example Java client](https://github.com/Cumulocity-IoT/cumulocity-examples/tree/develop/mqtt-service/java-simple-pulsar-client) based on the code snippets above can be found in the [cumulocity-examples](https://github.com/Cumulocity-IoT/cumulocity-examples/tree/develop/mqtt-service) repository.
The *README.md* file provided with the example explains how to build and run it.

The examples repository also contains a simple [Python MQTT client](https://github.com/Cumulocity-IoT/cumulocity-examples/tree/develop/mqtt-service/python-simple-mqtt-client) that can be used to simulate an MQTT device and test the operation of the Java client.
See the *README.md* file included with the example for more details.
Start the Python client first to ensure messages sent to a device are received, then start the Java client.
