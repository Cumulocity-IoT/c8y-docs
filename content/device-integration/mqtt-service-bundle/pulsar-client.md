---
weight: 30
layout: redirect
title: Connecting microservices and applications
---

Microservices and external applications can connect to the {{< product-c8y-iot >}} Messaging Service to receive messages from devices connected to the MQTT Service, and send messages to those devices.
The Messaging Service is a modified deployment of Apache Pulsar, and your applications will use the Pulsar client protocol directly to connect to it.

### Connecting to the Messaging Service

* You will use a Pulsar client to connect to the Messaging Service
* Various client libraries are available for a wide range of programming languages
* The example code in this document will use the Java client
<p>

* Connecting to Pulsar requires a URL and valid credentials
* For microservices, use the URL given to the microservice in the `C8Y_PULSAR_URL` environment variable
* For external applications, use `pulsar://<domain>:6651` (this endpoint uses TLS, client certificates not currently supported)
* To authenticate a connection to Pulsar, currently only basic authentication is supported
* Microservices should use the credentials of the per-tenant service use (link to MS SDK docs)
* External applications can use the credentials of any tenant user with the appropriate roles
<p>

* Connections will be authorized to access only the Pulsar topics used by the MQTT Service, further controlled by roles
* To consume messages from MQTT devices, the authenticated user must have `READ` permission on the `MQTT_SERVICE_MESSAGING_TOPICS` role
* To publish messages to MQTT devices, the authenticated user must have `UPDATE` permission on the `MQTT_SERVICE_MESSAGING_TOPICS` role
* For microservices, these permissions should be configured in the microservice manifest, and they will be applied to the service user
* For external applications, these permissions should be configured on the authenticated user through the Administration application
<p>

* Example microservice manifest
* Code snippet showing how to connect

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
