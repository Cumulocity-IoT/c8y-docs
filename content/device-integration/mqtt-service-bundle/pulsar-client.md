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

* Pulsar messages consist of a payload (body) and a set of properties (key-value pairs)
* The message payload is exactly the same as the payload of the MQTT `PUBLISH` message, not modified in any way
* The message properties may contain any of the following: (table of properties, indicating which are required vs. optional)
* Messages received from MQTT devices will not contain any properties other than those listed
* Only the properties listed will be recognised when publishing messages to MQTT devices, all other will be ignored

### Consuming messages from MQTT devices

* All messages from MQTT devices are delivered on a single Pulsar topic, `persistent://<tenant>/mqtt/from-device`
* The id of the device that published the message, and the topic it was published to, can be obtained from the message properties
* This means that you must consume every message published by every device, even those you are not interested in (these can be acknowledged without further processing)
* To consume from the topic, create a Pulsar Consumer and subscribe it to the topic
* The consumer should register a MessageListener that will be called when a new message arrives on the topic
* After processing the message, it must be acknowledged (or acknowledge it immediately if no processing is required)
<p>

* Code snippet showing how to consume

### Publishing messages to MQTT devices

* All messages to MQTT devices are published on a single Pulsar topic, `persistent://<tenant>/mqtt/to-device`
* The topic to publish to must be set using the `topic` message property
* Because MQTT Service devices are isolated from each other, it is also necessary to set the `clientid` property to the id of the target device
* However, if you want to publish the message to all devices that are subscribed to the named topic, leave the `clientid` property empty (or missing?)
* To publish to the topic, create a Pulsar Producer, and construct Pulsar Messages with the appropriate properties and payload
<p>

* Code snippet showing how to publish

### Best practices to ensure reliable message delivery

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
