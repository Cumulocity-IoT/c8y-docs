---
weight: 30
layout: redirect
title: Connecting microservices and applications
---

{{< product-c8y-iot >}} microservices and external applications can consume messages published by devices connected to the MQTT Service, and publish messages back to those devices.
To do this, your microservice or external application will connect to the {{< product-c8y-iot >}} Messaging Service, a modified deployment of [Apache Pulsar](https://pulsar.apache.org/), and use the Pulsar protocol to publish and consume MQTT messages.
The diagram below shows the important interfaces and data flows used when interacting with the MQTT Service through Pulsar.

<p align="center" width="100%">
    <img width="80%" src="/images/mqtt-service/mqtt-service-pulsar-connections.svg" alt="MQTT Service Pulsar connections">
</p>

{{< c8y-admon-info >}}
We define the term _MQTT Service messaging client_ as a software component that interacts with the MQTT Service through Pulsar.
It can be deployed either as a microservice hosted by the {{< product-c8y-iot >}} platform, or as part of an external application hosted outside the platform.
In this documentation, it will be referred to simply as a _client_.
Where the implementation or behaviour of a client is different depending on where it is hosted, those differences will be clearly documented.
{{< /c8y-admon-info>}}

The MQTT Service implements _device isolation_, meaning that MQTT devices connected to the MQTT Service **cannot** communicate directly with each other using the MQTT protocol.
All inter-device communication will be managed by the client, as shown in the diagram.

This documentation does not cover the publish-subscribe messaging concepts and architecture implemented by Pulsar, nor any features of the Pulsar client libraries beyond those needed to implement a simple MQTT Service client.
To learn more about those subjects, please refer to the [Pulsar product documentation](https://pulsar.apache.org/docs/4.0.x/).

### Connecting to the Messaging Service

To connect your client to the Messaging Service, you will need to use a [Pulsar client library](https://pulsar.apache.org/docs/4.0.x/client-libraries/).
Open-source client libraries are available for a number of different languages and protcols.
The example code in this documentation will use the [Java client library](https://pulsar.apache.org/docs/4.0.x/client-libraries-java/).
Pulsar has strong cross-version compatibility, so in general we recommend using the latest version of your chosen client library, regardless of the server version used by the Messaging Service.
Integration with the MQTT Service will not require using any advanced Pulsar features that may only be available in the latest version of the server.

{{< c8y-admon-caution >}}
Please note that currently only "basic" (username/password) authentication is supported for clients connecting to the Messaging Service through Pulsar.
Therefore, you must ensure that your chosen Pulsar client library supports this authentication scheme.
{{< /c8y-admon-caution >}}

Connecting to Pulsar requires the URL of the Pulsar server, and valid authentication credentials.

#### Pulsar URL

For a microservice client, the URL should be obtained from the `C8Y_BASEURL_PULSAR` [environment variable](/microservice-sdk/general-aspects/#environment-variables) that will be passed to the microservice when it starts running.
For an external application client, the URL has the general form `pulsar+ssl://<tenant_domain>:6651/`, where `<tenant_domain>` is the domain of your {{< product-c8y-iot >}} tenant, for example `my-tenant.cumulocity.com`.
As implied by the `pulsar+ssl` protocol name, all external application client connections will use SSL/TLS security.
Currently, only one-way TLS is supported; that is, the server will provide a certificate that can be verified by the client, but client certificates cannot be used.
Implementing an external application client so that it reads the Pulsar URL from the `C8Y_BASEURL_PULSAR` environment variable will make it easier to develop client that can be deployed as either a microservice or an external application.

#### Pulsar authentication

Authentication credentials identify both the {{< product-c8y-iot >}} tenant and the user within that tenant.
Currently, only "basic" (username and password) authentication is supported for clients connecting to the Messaging Service through Pulsar.
For a microservice client, you should use the credentials of the per-tenant [service user](/microservice-sdk/general-aspects/#users-and-roles) that will be passed to the microservice when the tenant is subscribed to it.
For an external application user, you can use the credentials of any tenant user with the appropriate authorization roles assigned, as described below.
The username must be in the form `<tenant>/<user>` where `<tenant>` is the tenant id, and `<user>` is a user within that tenant.

#### Role-based access control

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

We recommend only assigning the minimum permissions needed for your client to operate.
For example, if your microservice only needs to consume but not publish messages, you should not include the `ROLE_MQTT_SERVICE_MESSAGING_TOPICS_UPDATE` permission in the manifest.

#### Example code

The code snippet below shows how to use the Pulsar Java client library to connect to the Messaging Service with basic authentication.
It assumes that the Pulsar URL is in the `C8Y_BASEURL_PULSAR` environment variable and that the tenant, username and password are provided on the command line.
Note that the client library will not actually attempt to connect to the Pulsar server immediately when the `PulsarClient` object is created.
In the interests of brevity and clarity, this example does no error handling.
A realistic implementation would need to handle exceptions thrown by the Pulsar client library methods.

```java
package c8y.example.mqtt_service;

import java.text.MessageFormat;

import org.apache.pulsar.client.api.PulsarClient;
import org.apache.pulsar.client.impl.auth.AuthenticationBasic;

public class MQTTServicePulsarClient {
    public static void main(String[] args) throws Exception {
        // Check for the required number of command line arguments
        if (args.length != 3) {
            System.err.println("Usage: MQTTServicePulsarClient <tenantId> <username> <password>");
            System.exit(-1);
        }

        // Collect all the configuration properties
        final String pulsarUrl = System.getenv("C8Y_BASEURL_PULSAR");
        final String tenantId = args[0];
        final String username = args[1];
        final String password = args[2];

        // Create and configure the basic authentication credentials object.
        final AuthenticationBasic basicAuth = new AuthenticationBasic();
        basicAuth.configure(MessageFormat.format("'{'\"userId\":\"{0}/{1}\",\"password\":\"{2}\"'}'", tenantId, username, password));

        // Create a Pulsar client using the basic authentication credentials.
        // The client will not try to connect and authenticate immediately.
        final PulsarClient client = PulsarClient.builder()
            .serviceUrl(pulsarUrl)
            .authentication(basicAuth)
            .build();
        System.out.println("Created Pulsar client");
    }
}
```

### Message payloads and properties

Pulsar messages consist of a _payload_ and set of _properties_.

The payload is a sequence of zero or more bytes, identical to the payload of the MQTT `PUBLISH` message that the Pulsar message corresponds to.
It is the client's responsiblity to understand the format of the payloads produced and accepted by the MQTT devices it communicates with.

Pulsar message properties are name-value pairs, where both the name and the value are text strings.
The properties recognised by the MQTT Service are listed in the table below.
Messages received from MQTT devices will **always** include the properties marked as required, and may include any of the optional properties.
Received messages will not include any properties other than those listed here.
Messages published to MQTT devices **must** include all of the required properties, and may include any of the optional properties.
If a published message includes any properties other than those listed here, those properties will be ignored by the MQTT Service.

| Property name                             | Required          | Value type and encoding                                               | Purpose                                              |
|-------------------------------------------|-------------------|-----------------------------------------------------------------------|------------------------------------------------------|
| `topic`                                   | YES               | String                                                                | MQTT topic name                                      |
| `clientID`                                | YES<sup>(1)</sup> | String                                                                | MQTT client identifier                               |
| `tx.payloadFormatIndicator`<sup>(2)</sup> | NO                | Single byte with two permitted values, encoded as strings "0" and "1" | MQTT v5 Payload Format Indicator                     |
| `tx.contentType`                          | NO                | String                                                                | MQTT v5 Content Type                                 |
| `tx.responseTopic`                        | NO                | String                                                                | MQTT v5 Response Topic                               |
| `tx.correlationData`                      | NO                | Sequence of bytes, encoded as a Base64 string                         | MQTT v5 Correlator Data                              |
| `tx.userProperties.<name>`                | NO                | String                                                                | MQTT v5 User Property with name `name`<sup>(3)</sup> |

Notes:
1. The `clientID` property can be omitted from a published message only in special case of a _broadcast_ message, described below in [broadcast messages](#broadcast-messages)
2. The `tx.` prefix indicates that a property is specific to a _transport_, in this case the MQTT Service.
   Other transports will define their own transport-specific properties, but all transports will use `topic` and `clientID`.
3. The MQTT version 5 specification allows a message to include more than one user property with the same name.
   This feature is **not** supported by the MQTT Service.
   If a device publishes a message containing multiple user properties with the same name, only one of these will be copied into the Pulsar message.
   It is undefined which property will be copied.

### Consuming messages from MQTT devices {#consuming-messages-from-mqtt-devices}

All messages published by devices connected to the MQTT Service for a given tenant will be published to a _single_ Pulsar topic, identified by the URL `persistent://<tenant>/mqtt/from-device`.
The topic URL can be broken down into 4 components:

| Component     | Description                                                                                                                                                                      |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `persistent`  | Indicates that this is a persistent topic that will be preserved by the Messaging Service across component failures and restarts, to provide "at least once" delivery guarantees |
| `<tenant>`    | The Pulsar tenant id, which will match the {{< product-c8y-iot >}} tenant id                                                                                                     |
| `mqtt`        | The Pulsar namespace within the tenant, which will always be `mqtt` for the MQTT Service                                                                                         |
| `from-device` | The Pulsar topic within the namespace, which will always be `from-device` for message from devices connected to the MQTT Service                                                 | 

Your client will only be able to consume from this topic if the authenticated user has the "read" permission on the "Mqtt service messaging topics" role.
The client will not be able to consume from any other topic.

The client identifier of the device that published the messages, and the MQTT topic it was published on, can be obtained from the message properties `clientID` and `topic` as described above.
This means that your client **must** consume every message published by every device connected to the MQTT Service for the tenant, even those you are not interested in.
Messages that are not of interest to the client can simply be acknowledged without further processing.

{{< c8y-admon-caution >}}
Your client **must** be trusted to safely handle every message published by every device connected to the MQTT Service in your tenant.
If untrusted users have access to your tenant, these users should **not** be permitted to upload microservices, nor to connect external application clients to the MQTT Service.
This recommendation also applies in the case of multiple customers, who do not mutually trust each other, sharing a single tenant.
{{< /c8y-admon-caution >}}

#### Durable subscriptions and acknowledgement

Subscribing a consumer to a topic establishes a _durable subscription_ to the topic.
This means that the Messaging Service will retain messages published to the topic until they have been delivered to, and acknowledged by, a client.
The subscription will remain until it is explicitly deleted; most importantly, it will not be removed simply because the client is not currently running.
Messages that are published while the client is disconnected will be available for it to consume when it reconnects.
After consuming each message, the client **must** explicitly acknowledge it.
Acknowledging a message tells the Messaging Service that the client has no further interest in it, allowing the message to be discarded.
See the section on [best practices](#reliable-delivery-best-practices) below for more information on managing durable subscriptions correctly.

#### Example code

The code snippet below shows how to use the Pulsar Java client library to consume messages from the MQTT Service `from-device` topic.
It extends the previous example that set up the connection to the Pulsar server.

To consume messages from the topic, your client should create a Pulsar `Consumer` and subscribe it to the topic.
The consumer should register a `MessageListener` callback that will be called whenever a new message arrives on the topic.
The `MessageListener` implementation shows how to access the payload and properties of the received messages.
For simplicity and clarity, the example assumes that message payloads are simple text strings.

```java
        // Create a simple message listener that will log some details of
        // each message received.
        final MessageListener<String> listener = new MessageListener<String>() {
            @Override
            public void received(Consumer<String> consumer, Message<String> message) {
                final String clientId = message.getProperty("clientID");
                final String topic = message.getProperty("topic");
                System.out.println(MessageFormat.format("Received message from MQTT device {0} on MQTT topic {1}", clientId, topic));
                System.out.println(MessageFormat.format("Message payload: {0}", message.getValue()));
                System.out.println(MessageFormat.format("Message properties: {0}", message.getProperties()));
                try {
                    // Acknowledge the message
                    consumer.acknowledge(message);
                } catch (PulsarClientException e) {
                    e.printStackTrace();
                }
            }
        };

        // Create a Pulsar consumer on the from-device topic for the tenant,
        // using the listener defined above to process each message.
        // This will trigger connection and authentication by the client.
        final Consumer<String> consumer = client.newConsumer(Schema.STRING)
            .topic(MessageFormat.format("persistent://{0}/mqtt/from-device", tenantId))
            .subscriptionName("demoSubscription")
            .messageListener(listener)
            .subscribe();
        System.out.println("Created Pulsar consumer");
```

### Publishing messages to MQTT devices

Any messages that your client wants to send to devices connected to the MQTT Service for a given tenant must be published to a _single_ Pulsar topic, identified by the URL `persistent://<tenant>/mqtt/to-device`.
The components of the URL should be interpreted as described in [Consuming messages from MQTT devices](#consuming-messages-from-mqtt-devices) above.

Your client will only be able to publish to this topic if the authenticated user has the "update" permission on the "Mqtt service messaging topics" role.
The client will not be able to publish to any other topic.

Messages published to the `to-device` topic are routed to connected MQTT devices using the two required message properties:

| Property name | Purpose                                                              |
|---------------|----------------------------------------------------------------------|
| `clientID`    | Client identifier of the MQTT device that should receive the message |
| `topic`       | Name of the MQTT topic that the message should be published to       |

If the `topic` property is empty or missing, the message will not be published to any MQTT client.
The message will only be published to a client with an active subscription to the named MQTT topic.
The message will only be published to a client that is connected at the time the MQTT Service processes the published message.

Successfully publishing a message to the Messaging Service does **not** mean that the message has been successfully delivered to any MQTT device.
Onward publishing to MQTT devices happens _asynchronously_ and without any feedback to the Pulsar client.
Messages will be delivered to devices according to the MQTT protocol specification.
However, because MQTT devices are required to use a _clean session_ when connecting to the MQTT Service, messages published to a device while it is disconnected will not be delivered.

#### Broadcast messages {#broadcast-messages}

In order to enforce device-level isolation, in general a message will be published **only** to the specific MQTT client identified by the `clientID` message property, provided that client has an active subscription to the relevant MQTT topic. However, if the `clientID` property is not present, the message will be _broadcast_ to **all** connected MQTT clients with active subscriptions to the MQTT topic.

Broadcast publishing is potentially expensive when there are many MQTT clients connected.
It may also lead to messages being received by unexpected devices.
Therefore, it should be used sparingly and only when there is a genuine application requirement to publish the same message to every device subscribed to a given topic.

#### Message keys {#message-keys}

To facilitate efficient delivery and correct ordering of messages sent to MQTT devices, clients **must** also set the _key_ of a Pulsar message published to the `to-device` topic.
The key should be set as follows:

* When the `clientID` message property is set, the key should have the same value as this property.
* When the `clientID` message property is **not** set, the key should have the same value as the `topic` message property.

{{< c8y-admon-info >}}
#### Handling of invalid messages {#handling-of-invalid-messages}

Published messages that do not follow the rules for message properties and keys documented above will **not** be delivered to any MQTT device.
In particular this applies to messages with the following invalid configuration:

* The message _key_ is not set.
* The message _key_ is set but does not match the `clientID` or `topic` property as described in [message keys](#message-keys).
* The `clientID` property is set but has an empty value.
* The `topic` property is not set, or it is set but has an empty value.

An alarm will be raised in the {{< product-c8y-iot >}} tenant when one of these invalid messages is detected and discarded.
The rate of alarm sending is limited to avoid overloading the tenant with redundant alarms alerting about the same error on different messages.

A message with a non-empty `clientID` property referring to an MQTT device that is not currently connected is **not** considered to be invalid.
However, this message will not be delivered to the device, even if it connects later, because of the requirement for devices to use a _clean session_ when connecting.
Similarly, a message published to a connected MQTT device that is not currently subscribed to the MQTT topic specified in the `topic` property is not considered to be invalid.
In these situations, the message will not be delivered but no alarms will be raised.
{{< /c8y-admon-info >}}

#### Example code

The code snippet below shows how to use the Pulsar Java client library to publish messages to the MQTT Service `to-device` topic.
It extends the previous examples that set up the connection to the Pulsar server and created a message consumer.

To publish messages to the topic, your client should first create a Pulsar `Producer` associated with the topic.
Then, the `Producer` can be used to create new `Message` objects that will be published to the topic.
The example code shows how to correctly set the message properties and message key for messages targeted at a single device, and for "broadcast" messages.
The example continues to assume that message payloads are simple text strings, and omits most error-handling code for clarity.

```java
        // Create a Pulsar producer on the to-device topic for the tenant.
        final Producer<String> producer = client.newProducer(Schema.STRING)
            .topic(MessageFormat.format("persistent://{0}/mqtt/to-device", tenantId))
            .create();
        System.out.println("Created Pulsar producer");

        // Publish a message to a single MQTT device
        producer.newMessage()
            .property("clientID", "demoClient")
            .property("topic", "demoTopic")
            .key("demoClient")
            .send();
        System.out.println("Sent message to single device");
        
        // Publish a message to all MQTT devices subscribed to a topic
        producer.newMessage()
            .property("clientID", "")
            .property("topic", "demoTopic")
            .key("demoTopic")
            .send();
        System.out.println("Sent message to all devices");
```

### Messaging Service quotas and limits {#messaging-service-quotas-limits}

Messages published to a Pulsar topic are stored persistently by the Messaging Service until they have been delivered to, and acknowledged by, all interested consumers.
For messages published to the `from-device` topic by the MQTT Service, the consumers are any clients that have created durable subscriptions on the topic.
For messages published to the `to-device` topic by clients, the consumers are the instances of the MQTT Service that will deliver the messages to devices.

To optimize resource usage, the Messaging Service imposes storage limits and a message time-to-live (TTL) on persistently stored messages.

See the [service quotas](/service-terms/quotas/#mqtt-service) documentation for details on the default limits.
These limits are configurable on a per-tenant basis.
If your use case requires a different configuration, or if you have any questions or concerns, please contact [product support](https://cumulocity.com/docs/additional-resources/contacting-support/).

#### Message backlog quota

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

#### Message time-to-live

Any undelivered messages will be automatically deleted if they have been on the backlog for longer than the _time to live (TTL) limit_.
This policy helps to limit overall resource usage and reduces the need to process outdated data after a prolonged disconnection of a consumer.

No message will ever be deleted from the backlog unless it reaches its TTL limit.
Messages will always be delivered to the consumer in the order they were published to the topic.

### Best practices to ensure reliable message delivery from devices {#reliable-delivery-best-practices}

If the backlog quota limit for a Pulsar topic is reached, it will not be possible to publish more messages onto the topic, and messages may be lost.
Therefore, it is important that your client processes and acknowledges messages received from the `from-device` topic as quickly as possible.
Every message **must** be explicitly acknowledged, even if the client is not "interested" in it.
However, messages should not be acknowledged until the client has completed processing the messages, or stored it securely for later processing.
Acknowledged messages will not be re-delivered after a failure or restart of the client, so messages that are acknowledged too soon may be lost.

Subscribing a consumer to a Pulsar topic establishes a _durable subscription_ to the topic.
The Messaging Service will retain messages published to the topic until they have been acknowledged by all interested consumers, in order to provide "at least once" delivery guarantees.
The durable subscription will remain until it is explicitly deleted; that is, _it will not be removed simply because the client has disconnected from Pulsar._
Messages that are published while the client is disconnected will be available for it to consume when it reconnects.
This means that it is possible for a Pulsar topic to reach its backlog quota limit and stop accepting new messages even when no clients are running.
Therefore, as well as explicitly acknowledging every message, clients must also manage the lifecycle of any subscriptions they create:
1. Use the same subscription name every time the client connects a consumer.
   A common _anti-pattern_ is to generate a random subscription name each time the client runs.
   This will create a new subscription each time, but leave any previous subscriptions active with no consumers.
   Eventually, the backlog quota limit for the topic will be reached, and no further messages will be deliver to the client.
1. Explicitly delete subscriptions when they are no longer required.
   Depending on your use case, this may require specific manual intervention.
   For example, if a client is being taken out of service for an extended period you may need to manually delete its subscription.
   Typically a subscription is deleted by calling the `unsubscribe()` method on the consumer, although the exact mechanism may vary for different Pulsar client libraries.
   The Messaging Service [monitoring and management](/standard-tenant/monitoring/#messaging-service) user interface can also be used to delete a subscription.

#### Example code

The code snippet below shows how to delete the subscriber and close the other Pulsar client objects created by the earlier code examples.

```java
        // Delete the durable subscription.
        // This is only necessary if messages should *not* be retained
        // on the topic while the client is disconnected.
        consumer.unsubscribe();

        // Close all the Pulsar objects that we created.
        consumer.close();
        producer.close();
        client.close();
```

### Example client

A complete example client based on the code snippets above can be found in the [cumulocity-examples](https://github.com/Cumulocity-IoT/cumulocity-examples/mqtt-service/simple-pulsar-client) repository.
This example also includes a simple Python script to simulate an MQTT device and generate messages for the client to receive.
The `README.md` file provided with the example explains how to build and run it.
