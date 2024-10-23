---
weight: 30
layout: redirect
title: Java Client
---

The MQTT Service Java Client library provides the classes necessary to interact with MQTT Service.
The following operations are supported by the client:
* Publishing messages to the MQTT Service via WebSocket protocol.
* Subscribing to messages from the MQTT Service via WebSocket protocol

#### Repositories and dependencies {#repositories-and-dependencies}

Follow the [Microservice SDK](/microservice-sdk/java/#add-repositories-and-dependencies) documentation for guidance on how to configure Maven repositories.
To include MQTT Service Java Client into your project, add the following dependency inside the `<dependencies>` node:
```xml
<dependency>
    <groupId>com.cumulocity.sdk.mqtt</groupId>
    <artifactId>mqtt-service-ws</artifactId>
    <version>${c8y.version}</version>
</dependency>
```

#### Example {#example}
Example of publishing messages to the MQTT Service via WebSocket:
```java
// Message to be sent
final String payload = "Hello World";

// Construct a new MqttServiceMessage and set the payload
final MqttServiceMessage message = new MqttServiceMessage();
message.setPayload(payload.getBytes());

// Create an instance of MqttServiceApi by specifying the server URI to connect to along with TokenApi
final MqttServiceApi mqttServiceApi = MqttServiceApi.webSocket()
        .url(webSocketBaseUrl)
        .tokenApi(tokenApi)
        .build();

// Build PublisherConfig with topic to which the message is to be sent
final PublisherConfig config = PublisherConfig.publisherConfig().topic(topic).build();

// Build Publisher and publish MqttServiceMessage. Close the resource either by using a [try-with-resources block](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html) as below or by calling publisher.close() explicitly
try (final Publisher publisher = mqttServiceApi.buildPublisher(config)) {
    publisher.publish(message);
} catch (Exception e) {
    log.error("Could not sent message to {}", topic, e);
}
mqttServiceApi.close();
```

Example of subscribing to messages from the MQTT Service via WebSocket:
```java
// Create an instance of MqttServiceApi by specifying the server URI to connect to along with TokenApi
final MqttServiceApi mqttServiceApi = MqttServiceApi.webSocket()
        .url(webSocketBaseUrl)
        .tokenApi(tokenApi)
        .build();

// Build SubscriberConfig with topic and subscriber name
final SubscriberConfig config = SubscriberConfig.subscriberConfig().topic(topic).subscriber(subscriberName).build();

// Build Subscriber
final Subscriber subscriber = mqttServiceApi.buildSubscriber(config);

// Subscribe by passing implementation of MessageListener to handle messages from the MQTT Service.
subscriber.subscribe(new MessageListener() {
    @Override
    public void onMessage(MqttServiceMessage message) {
        log.info("Message Received: {}", new String(message.getPayload()));
    }
});

// Close the resources after usage
subscriber.close();
mqttServiceApi.close();
```
