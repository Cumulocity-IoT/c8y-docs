---
weight: 20
title: Messaging Service
layout: bundle
outputs:
  - html
  - json
sector:
  - platform_administration
helpcontent:
  - label: messaging-service
    title: Messaging Service
    content: "Something something useful here..."
---

The **Messaging Service** is a [publish/subscribe messaging](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) and message streaming component embedded within the {{< product-c8y-iot >}} platform.
It provides asynchronous communication between platform components and user-facing features for moving real-time data into and out of the platform.
The features that use the Messaging Service include the microservice-based Data broker, Notifications 2.0, and the MQTT Service.

**Topics** are the core concept underlying all of the features using the Messaging Service.
A topic is a named logical channel for delivering messages from *publishers* to *subscribers*.
Each topic may have any number of publishers and subscribers, and in general, every subscriber will receive the messages sent by every publisher.
All of the subscribers on a topic will receive the published messages in the same order.
The topic will persistently store published messages until every subscriber has acknowledged that it has successfully received them.
This means that the Messaging Service can guarantee the delivery of every published message to every subscriber.

The following sections show how to monitor your tenant's usage of the Messaging Service, for each of the services that use it.

### To view the topics

Click **Messaging Service** in the **Monitoring** menu in the navigator to display a list of all features that are using the Messaging Service.
Next to the feature name, you will also see basic information about the feature's usage of the Messaging Service, such as the number of topics, the number of publishers, and subscribers.
Select a feature and click on it to see more details. This will display a list of all topics used by the feature and the limits that are applied for each of those topics.

![Messaging Management Topics](/images/users-guide/Administration/messaging-management-topics.png)

#### Topics list

The topics list shows the following information for each topic:

| Column name              | Description                                                                                                                                                                                                     | Alarming values | 	   	
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| Name                     | Topic name, see feature-specific description of how to map it with the specific resource.                                                                                                                       | -               |
| Message rate in (msg/s)  | Total rate of messages published on the topic per second.                                                                                                                                                       | -               |
| Message rate out (msg/s) | Total rate of messages dispatched to the subscribers for the topic per second. Dispatch includes additional batching and queuing mechanisms, so this rate could differ from the subscriber acknowledgment rate. | -               |
| Subscribers              | Total number of registered subscribers. This includes both actively consuming subscribers and those that are currently disconnected and not consuming any messages.                                             | > 5             |
| Message backlog          | Backlog size in bytes which corresponds to the size occupied by unconsumed messages.                                                                                                                            | > 20 MB         |
| Used backlog             | Percentage usage of the backlog quota limit.                                                                                                                                                                    | > 80%           |

Please refer to the feature-specific documentation for more information on how to map the topic with the source and how to clear the backlog when reaching the alarming values.

#### Messaging Service limits

All the backlog limits that are visible at the top of the topics list view are applied per topic, meaning if the backlog quota is set to 25MB, each topic will queue the messages until they reach the configured limit.

### To view the topic details

Click on a selected topic name to navigate to the topic details view.
The view contains information about the topic at the top and the list of all subscribers for that topic below.

![Messaging Management Topic Details](/images/users-guide/Administration/messaging-management-topic-details.png)

#### Subscribers list

The subscribers list shows the following information for each subscriber:

| Column name                 | Description                                                                                                   | Alarming values | 	   	
|-----------------------------|---------------------------------------------------------------------------------------------------------------|-----------------|
| Name                        | Subscriber name, see feature-specific description of how to map it with the specific resource.                | -               |
| Connected clients           | Number of clients that are currently connected and consuming messages.                                        | -               |
| Acknowledgment rate (msg/s) | Current rate per second of messages fully processed (consumed, processed, and acknowledged) by the consumers. | -               |
| Last acknowledged           | Latest timestamp when the message was fully processed by the consumer.                                        | >= 1 day        |
| Unacknowledged messages     | Number of unconsumed messages.                                                                                | > 1000          |
| Used backlog                | Percentage usage of the backlog quota limit by the subscriber.                                                | > 80%           |

Please refer to the feature-specific documentation for more information on how to map the subscriber name with the source and how to clear the backlog when reaching the alarming values.

### Monitoring Notifications 2.0 {#monitoring-notifications-2.0}

#### Topic and subscriber

The topic name is the same as the `subscription` field used in the [Notifications 2.0 Subscriptions API](https://{{< domain-c8y >}}/api/core/#operation/postNotificationSubscriptionResource).

The subscriber name is the same as the `subscriber` field used in the [Notifications 2.0 Tokens API](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenResource).

Both the topic and the subscriber are created only when there is a web socket connection established to the Notifications 2.0.
After that, the Messaging Service will collect the messages under the given topic until they are consumed, they reach the configured time-to-live interval, or the [subscriber is unsubscribed](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenUnsubscribeResource) for the topic.
Please refer to the [Consumer lifecycle](https://{{< domain-c8y >}}/api/core/#section/Overview/Consumer-lifecycle) for more details.

#### Clearing the backlog

There are a few ways to clear the backlog from the Notifications 2.0 topics.

##### Consume messages

If the topic and subscriber were created, there are probably also valuable messages that are stored in the Messaging Service and should be consumed.
To consume and acknowledge the messages for a given topic and subscriber:
* Create the [Notifications 2.0 Token](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenResource) for the selected topic and subscriber.
* Use the token to create the [web socket connection to the Notifications 2.0](https://{{< domain-c8y >}}/api/core/#section/Consumer-protocol).
* Process and [acknowledge](https://{{< domain-c8y >}}/api/core/#section/Consumer-protocol/Notification-acknowledgements) all the messages that are received via the web socket connection.

This will remove the messages from the Messaging Service and clear the backlog for the given topic and subscriber, but the action is not permanent.
As the Notifications 2.0 subscription and the subscriber still exist, the backlog can be filled again with new messages if they are not consumed continuously.

##### Unsubscribe the subscriber using Notifications 2.0 API {#unsubscribe-the-subscriber-using-notifications-2.0-api}

If the subscriber is not needed anymore and there are no valuable messages that should be consumed, the subscriber can be unsubscribed.
To do this:
* Create the [Notifications 2.0 Token](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenResource) for the selected topic and subscriber.
* Use the token to unsubscribe the subscriber from the topic by calling the [Notifications 2.0 Token Unsubscribe API](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenUnsubscribeResource).

This will remove the subscriber from the Messaging Service and clear the backlog for the given subscriber and the whole topic if there are no more subscribers with unconsumed messages.
If the subscriber won't be recreated by establishing the [web socket connection to the Notifications 2.0](https://{{< domain-c8y >}}/api/core/#section/Consumer-protocol), this action is permanent, meaning the backlog won't grow again.
If there are no more active subscribers, it is also recommended to delete the [Notifications 2.0 Subscription](https://{{< domain-c8y >}}/api/core/#operation/deleteNotificationSubscriptionResource).

##### Unsubscribe the subscriber from the Messaging Management View

If the subscriber is not needed anymore and there are no valuable messages that should be consumed, the subscriber can be unsubscribed.
To do this, select the subscriber from the subscriber list in the Messaging Service view and click the unsubscribe icon.
This action is equivalent to the [Unsubscribe the subscriber using Notifications 2.0 API](#unsubscribe-the-subscriber-using-notifications-2.0-api).
All the information about permanent action and cleaning are the same.

### Monitoring the MQTT Service {#monitoring-the-mqtt-service}

#### Topic and subscriber

The topic name is mapped 1:1 with the topic from the MQTT Service.

When working with the [MQTT Service SDK]({{< link-c8y-github >}}/cumulocity-clients-java/blob/develop/mqtt-service), the subscriber name is the same as the name defined in the [subscriber config]({{< link-c8y-github >}}/cumulocity-clients-java/blob/develop/mqtt-service/websocket/src/main/java/com/cumulocity/mqtt/service/sdk/subscriber/SubscriberConfig.java#L56).

Subscribers created by the MQTT clients are deleted automatically once the client disconnects, so there is a rare chance that those will stay for a longer time and need manual cleanup.

#### Clearing the backlog

There are a few ways to clear the backlog from the MQTT Service topics.

##### Consume messages

If the topic and subscriber were created, there are probably also valuable messages that are stored in the Messaging Service and should be consumed.
Use the [MQTT Service SDK]({{< link-c8y-github >}}/cumulocity-examples/blob/develop/mqtt-service-examples) to consume and acknowledge the messages for a given topic and subscriber.

After consuming all the messages, the backlog will be cleared and the topic will be ready to store new messages.

##### Unsubscribe the subscriber using MQTT Service SDK {#unsubscribe-the-subscriber-using-mqtt-service-sdk}

If the subscriber is not needed anymore and there are no valuable messages that should be consumed, the subscriber can be unsubscribed.
Use the [unsubscribe action]({{< link-c8y-github >}}/cumulocity-clients-java/blob/develop/mqtt-service/websocket/src/main/java/com/cumulocity/mqtt/service/sdk/websocket/WebSocketSubscriber.java#L60) from the MQTT Service SDK.
This will remove the subscriber from the Messaging Service and clear the backlog for the given subscriber and the whole topic if there are no more subscribers with unconsumed messages.

##### Unsubscribe the subscriber from the Messaging Management View

If the subscriber is not needed anymore and there are no valuable messages that should be consumed, the subscriber can be unsubscribed.
To do this, select the subscriber from the subscriber list in the Messaging Service view and click the unsubscribe icon.
This action is equivalent to the [Unsubscribe the subscriber using MQTT Service SDK](#unsubscribe-the-subscriber-using-mqtt-service-sdk).

### Frequently Asked Questions (FAQ)

#### What happens when the backlog is full?

When the Messaging Service backlog is full, no new messages can be added to the backlog until it is cleared.
This may result in requests being rejected or other unexpected behaviors.
Please clear the backlog before continuing work with the Messaging Service.

#### What should I do when I'm having a lot of topics?

A high number of topics could be normal behavior when having a lot of devices, but there could also be a situation when new topics are generated unnecessarily:
* Test topics that were never cleared - check if you don't have unused topics.
* Topics that are carrying the same data - topic names should be reused where possible to avoid unnecessary resource consumption. If you have multiple topics that are carrying the same data, consider merging them into a single topic.

#### What should I do when I'm having a lot of subscribers?

If you are having a single microservice or single client consuming messages from the Messaging Service, you should also have a single subscriber.
Check if the subscriber name used by your client is unique and reused when connecting to the Messaging Service.
A common pitfall is to generate a random subscriber name when establishing a new connection to the Messaging Service.

Multiple subscribers are a normal situation when there are multiple clients consuming from the same topic or when using [shared consumer tokens](https://cumulocity.com/api/core/#section/Overview/Shared-consumer-tokens).
