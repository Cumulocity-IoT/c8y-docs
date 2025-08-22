---
weight: 30
layout: redirect
title: Connecting microservices and applications
---

{{< product-c8y-iot >}} microservices and external applications can consume messages published by devices connected to the MQTT Service, and publish messages back to those devices.
To do this, your microservice or external application will connect to the {{< product-c8y-iot >}} Messaging Service, a modified deployment of [Apache Pulsar](https://pulsar.apache.org/), and use the Pulsar protocol to publish and consume MQTT messages.
The diagram below shows the important interfaces and data flows used when interacting with the MQTT Service through Pulsar.

**(DIAGRAM GOES HERE)**

{{< c8y-admon-info >}}
We define the term _MQTT Service messaging client_ as a software component that interacts with the MQTT Service through Pulsar.
It can be deployed either as a microservice hosted by the {{< product-c8y-iot >}} platform, or as part of an external application hosted outside the platform.
In this documentation, it will be referred to simply as a _client_.
Where the implementation or behaviour of a client is different depending on where it is hosted, those differences will be clearly documented.
{{< /c8y-admon-info>}}

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

Pulsar client connections will be granted access to Messaging Service resources based on the roles and permissions assingned to the authenticated user.
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
    }
}
```

### Message payloads and properties

Pulsar messages consist of a _payload_ and set of _properties_.

The payload is a sequence of zero or more bytes, identical to the payload of the MQTT `PUBLISH` message that the Pulsar message corresponds to.
It is the client's responsiblity to understand the format of the payloads produced and accepted by the MQTT devices it communicates with.

Message properties are name-value pairs, where both the name and the value are text strings.
The properties recognised by the MQTT Service are listed in the table below.
Messages received from MQTT devices will **always** include the properties marked as required, and may include any of the optional properties.
Received messages will not include any properties other than those listed here.
Messages published to MQTT devices **must** include all of the required properties, and may include any of the optional properties.
If a published message includes any properties other than those listed here, those properties will be ignored by the MQTT Service.

| Property name                   | Required | Value type and encoding                                               | Purpose                                |
|---------------------------------|----------|-----------------------------------------------------------------------|----------------------------------------|
| `client`                        | YES      | String                                                                | MQTT client identifier                 |
| `channel`                       | YES      | String                                                                | MQTT topic name                        |
| `tx.payload-format-indicator`   | NO       | Single byte with two permitted values, encoded as strings "0" and "1" | MQTT v5 Payload Format Indicator       |
| `tx.content-type`               | NO       | String                                                                | MQTT v5 Content Type                   |
| `tx.response-topic`             | NO       | String                                                                | MQTT v5 Response Topic                 |
| `tx.correlation-data`           | NO       | Sequence of bytes, encoded as a Base64 string                         | MQTT v5 Correlator Data                |
| `tx.user-properties.<name>`     | NO       | String                                                                | MQTT v5 User Property with name `name` |

The following sections will demonstrate how to parse and construct messages.

### Consuming messages from MQTT devices

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

The client identifier of the device that published the messages, and the MQTT topic it was published on, can be obtained from the message properties `client` and `channel` as described above.
This means that your client **must** consume every message published by every device connected to the MQTT Service for the tenant, event those you are not interested in.
Messages that are not of interest to the client can simply be acknowledged without further processing.

To consume messages from the topic, your client should create a Pulsar `Consumer` and subscribe it to the topic.
The consumer should register a `MessageListener` callback that will be called whenever a new message arrives on the topic.

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
The `MessageListener` implementation shows how to access the payload and properties of the received messages.
For simplicity and clarity, the example assumes that message payloads are simple text strings.

```java
        // Create a simple message listener that will log some details of
        // each message received.
        final MessageListener<String> listener = new MessageListener<String>() {
            @Override
            public void received(Consumer<String> consumer, Message<String> message) {
                final String clientId = message.getProperty("client");
                final String topic = message.getProperty("channel");
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

        // Create a Pulsar consumer on the from-device topic for the tenant.
        // This will use the listener defined above to process each message.
        final Consumer<String> consumer = client.newConsumer(Schema.STRING)
            .topic(MessageFormat.format("persistent://{0}/mqtt/from-device", tenantId))
            .subscriptionName("demoSubscription")
            .messageListener(listener)
            .subscribe();
```

### Publishing messages to MQTT devices

* All messages to MQTT devices are published on a single Pulsar topic, `persistent://<tenant>/mqtt/to-device`
* The topic to publish to must be set using the `topic` message property
* Because MQTT Service devices are isolated from each other, it is also necessary to set the `clientid` property to the id of the target device
* However, if you want to publish the message to all devices that are subscribed to the named topic, leave the `clientid` property empty (or missing?)
* To publish to the topic, create a Pulsar Producer, and construct Pulsar Messages with the appropriate properties and payload
<p>

* Code snippet showing how to publish

### Best practices to ensure reliable message delivery {#reliable-delivery-best-practices}

* Topics have a "backlog quota" that affects the number of unacknowledged messages that can be outstanding
* If the backlog quota is reached, it will not be possible to publish any more messages onto the topic, and the publisher will receive an error
* Therefore, to ensure timely and uninterrupted message delivery, it is important to process and acknowledge each messages as quickly as possible
* On the other hand, don't acknowledge too soon as acknowledged messages will not be re-delivered even after a failure and restart of the client
<p>

* Subscribing a consumer creates a persistent subscription on the topic
* The subscription will retain messages even when the consumer is disconnected, so that messages will not be lost because of e.g. microservice restarts
* This means you can reach the backlog quota on the topic even while your client is not running
* If you want to stop retaining messages, the subscription must be explicitly deleted - and it may be necessary to do this manually
* Use the same subscription name every time the microservice runs; do not use random names and create a new subscription every time
* The M&M capability may be useful to see what subscriptions your tenant has on the MQTT Service topics, and to clear full backlogs if required
<p>

* Code snippet showing how to shut down cleanly

### Examples

* Bring all those code snippets together into a complete (but very simple) example that we can publish in `cumulocity-examples`?
