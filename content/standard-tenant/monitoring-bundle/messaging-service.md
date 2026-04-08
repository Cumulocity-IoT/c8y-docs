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
    content: "Monitor the Messaging Service resources. Track resource usage like topics, subscribers, and backlogs for features such as Notifications 2.0 and the MQTT Service. Select features and topics to view detailed statistics, check limits, and identify potential bottlenecks or inactive consumers."
---

{{< c8y-admon-preview >}}
This feature is in **Public Preview** status, that is, it is not enabled by default and may be subject to change in the future.

The feature can be enabled for your tenant using the **Manage preview features** option in the right drawer in the **Administration** application.

The messaging-management microservice must be subscribed to your tenant. This should happen automatically, but if the feature is not accessible after enabling it in **Manage preview features**, verify the microservice subscription.
To do this, open the Administration application and navigate to **Ecosystem** > **Microservices**. If you do not see the messaging-management microservice listed, contact [product support](/additional-resources/contacting-support/) to request the subscription for your tenant.
{{< /c8y-admon-preview >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view Messaging Service data: READ permission for permission type "Tenant statistics"
- To perform any action on a topic or subscriber: ADMIN permission for permission type "Tenant management"
{{< /c8y-admon-req >}}

The **Messaging Service** is a [publish/subscribe messaging](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) and message streaming component embedded in the {{< product-c8y-iot >}} platform.
It provides asynchronous communication between platform components and user-facing features for moving real-time data into and out of the platform.
The features that use the Messaging Service include the microservice-based data broker, Notifications 2.0, and the MQTT Service.

Topics are the core concept underlying all of the features using the Messaging Service.
A topic is a logical channel for delivering messages from publishers to subscribers.
Each topic may have any number of publishers and subscribers, and in general, every subscriber to a topic receives the messages sent by every publisher to that topic.
All subscribers of a topic receive the published messages in the same order.
The topic persistently stores published messages until every subscriber has acknowledged that they have successfully received them.
This means that the Messaging Service can guarantee the delivery of every published message to every subscriber.

The following sections show how to monitor your tenant's usage of the Messaging Service for each of the services that use it.

### To view the topics {#to-view-the-topics}

Click **Messaging Service** in the **Monitoring** menu in the navigator to display a list of all features that use the Messaging Service.
Next to the feature name, you see basic information on the feature's usage of the Messaging Service, such as the number of topics, publishers, and subscribers.
Select a feature and click it to see the details. This displays a list of all topics used by the feature and the limits that are applied for each of these topics.

![Messaging Management Topics](/images/users-guide/Administration/messaging-management-topics.png)

#### Topic list {#topic-list}

The topic list shows the following information for each topic:

| Column name              | Description                                                                                                                                                                                                     | Unsafe range |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| Name                     | Topic name. See the feature-specific documentation below for more information on mapping this to a specific source.                                                                                             | -            |
| Message rate in (msg/s)  | Total rate of messages published on the topic per second.                                                                                                                                                       | -            |
| Message rate out (msg/s) | Total rate of messages dispatched to the subscribers for the topic per second. Dispatch includes additional batching and queuing mechanisms, so this rate could differ from the subscriber acknowledgment rate. | -            |
| Subscribers              | Total number of registered subscribers. This includes both actively consuming subscribers and those that are currently disconnected and not consuming any messages.                                             | > 5          |
| Message backlog          | Backlog size in bytes which corresponds to the size occupied by unconsumed messages.                                                                                                                            | > 20 MB      |
| Used backlog             | Percentage usage of the backlog quota limit.                                                                                                                                                                    | > 80%        |

Refer to the feature-specific documentation below for more information on how to map the topic name to the source and how to clear the backlog when reaching the unsafe range.

#### Messaging Service limits {#messaging-service-limits}

All the backlog limits visible at the top of the topics list view are applied per topic. This means if the backlog quota is set to 25MB, each topic will queue messages until it reaches the configured limit.
Limits are {{< product-c8y-iot >}} platform wide, and only the Operations team can change them.

### To view the topic details {#to-view-the-topic-details}

Click on a selected topic name to navigate to the topic details view.
The view contains information about the topic at the top and the list of all subscribers for that topic below.

![Messaging Management Topic Details](/images/users-guide/Administration/messaging-management-topic-details.png)

#### Subscriber list {#subscriber-list}

The subscriber list shows the following information for each subscriber:

| Column name                 | Description                                                                                                                   | Unsafe range |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------|--------------|
| Name                        | Subscriber name. See the feature-specific documentation below for more information on mapping this to a specific destination. | -            |
| Connected clients           | Number of clients that are currently connected and consuming messages.                                                        | -            |
| Acknowledgment rate (msg/s) | Current rate per second of messages fully processed (consumed, processed, and acknowledged) by the consumers.                 | -            |
| Last acknowledged           | Latest timestamp when a message was fully processed by the consumer.                                                          | >= 1 day     |
| Unacknowledged messages     | Number of unconsumed messages for this subscriber.                                                                            | > 1000       |
| Used backlog                | Percentage usage of the backlog quota limit by the subscriber.                                                                | > 80%        |

Refer to the feature-specific documentation below for more information on how to map the subscriber name to the destination and how to clear the backlog when reaching the unsafe range.

### Monitoring Notifications 2.0 {#monitoring-notifications-2.0}

#### Topic and subscriber {#notifications-topic-and-subscriber}

The topic name is the same as the `subscription` field used in the [Notifications 2.0 Subscriptions API](https://{{< domain-c8y >}}/api/core/#operation/postNotificationSubscriptionResource) and the [Notifications 2.0 Tokens API](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenResource).

The subscriber name is the same as the `subscriber` field used in the [Notifications 2.0 Tokens API](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenResource).

The subscriber is created the first time that a Notifications 2.0 WebSocket connection is established using a token with given subscription and subscriber names.
The topic itself is created the first time that _any_ Notifications 2.0 WebSocket connection is established using a token with the given subscription name.
However, once the subscriber is created it will not be deleted even if the WebSocket connection is disconnected.
That is, the Messaging Service will collect and persist the messages under the given topic until either they are consumed, they reach the configured time-to-live (TTL) interval, or the [subscriber is explicitly unsubscribed](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenUnsubscribeResource) from the topic.
Refer to the [consumer lifecycle](https://{{< domain-c8y >}}/api/core/#section/Overview/Consumer-lifecycle) for more details.

#### Clear the backlog {#notifications-clear-the-backlog}

When the Messaging Service backlog is full, no new messages can be added to the backlog until it is cleared.
REST requests that are also supposed to produce a notification will fail with a 500 status code and a message saying that the backlog quota has been reached.
Clients working with {{< product-c8y-iot >}} must be aware of this situation and handle the error appropriately.
In this situation, the backlog must be cleared before continuing work. There are various ways to clear the backlog from Notifications 2.0 topics.

##### Consume messages {#notifications-consume-messages}

If the topic and subscriber were created, there are probably also valuable messages stored in the Messaging Service that should be consumed.
To consume and acknowledge the messages for a given topic and subscriber:
* Create the [Notifications 2.0 Token](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenResource) for the selected topic and subscriber.
* Use the token to create a [Notifications 2.0 WebSocket connection](https://{{< domain-c8y >}}/api/core/#section/Consumer-protocol) to the topic.
* Process and [acknowledge](https://{{< domain-c8y >}}/api/core/#section/Consumer-protocol/Notification-acknowledgements) all the messages received via the WebSocket connection.

This will remove the messages from the Messaging Service and clear the backlog for the given topic and subscriber, but the action is not permanent.
Since the Notifications 2.0 subscription and the subscriber still exist, the backlog can fill again with new messages if they are not consumed continuously.

##### Unsubscribe the subscriber using Notifications 2.0 API {#unsubscribe-the-subscriber-using-notifications-2.0-api}

If the subscriber is not needed anymore and there are no valuable messages that should be consumed, the subscriber can be unsubscribed.
To do this:
* Create the [Notifications 2.0 Token](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenResource) for the selected topic and subscriber.
* Use the token to unsubscribe the subscriber from the topic by calling the [Notifications 2.0 Token Unsubscribe API](https://{{< domain-c8y >}}/api/core/#operation/postNotificationTokenUnsubscribeResource).

This will remove the subscriber from the Messaging Service and clear the backlog for the given subscriber, and potentially the whole topic if there are no more subscribers with unconsumed messages.
If the subscriber is not recreated by establishing a [Notifications 2.0 WebSocket connection](https://{{< domain-c8y >}}/api/core/#section/Consumer-protocol) to the topic, this action is permanent, meaning the backlog won't grow again.
If there are no more active subscribers for the topic, it is also recommended to delete the [Notifications 2.0 Subscription](https://{{< domain-c8y >}}/api/core/#operation/deleteNotificationSubscriptionResource).

##### Unsubscribe the subscriber via the UI {#notifications-unsubscribe-the-subscriber-via-the-UI}

If the subscriber is no longer needed and there are no valuable messages that should be consumed, the subscriber can be unsubscribed directly from the UI.
To do this, select the subscriber from the subscriber list in the **Messaging Service** page and click the unsubscribe icon.
This action is equivalent to [unsubscribing the subscriber using Notifications 2.0 API](#unsubscribe-the-subscriber-using-notifications-2.0-api).
All information about this being a permanent action and clearing the backlog is the same as described above.

### Monitoring the MQTT Service {#monitoring-the-mqtt-service}

#### Topic and subscriber {#mqtt-service-topic-and-subscriber}

The topic name is mapped 1:1 to the topic name used by the MQTT Service client.

When working with the [MQTT Service SDK]({{< link-c8y-github >}}/cumulocity-clients-java/tree/develop/mqtt-service), the subscriber name is the same as the name defined in the [subscriber configuration]({{< link-c8y-github >}}/cumulocity-clients-java/blob/develop/mqtt-service/websocket/src/main/java/com/cumulocity/mqtt/service/sdk/subscriber/SubscriberConfig.java#L56).

Subscribers created by MQTT clients are deleted automatically once the client disconnects, so it is unlikely that they will persist for a long time and require manual cleanup.

#### Clear the backlog {#mqtt-service-clear-the-backlog}

When the Messaging Service backlog is full, no new messages can be added to the backlog until it is cleared.
In this situation, client behavior depends on the MQTT protocol version used:
* An MQTT client using protocol version 3.1.1 will simply be disconnected.
* An MQTT client using protocol version 5 will get negative PUBACK response with `0x97` (quota exceeded) reason code, but it will still remain connected.

Implementations connecting to the MQTT Service must be aware of this and handle these errors appropriately.
In either case, the backlog must be cleared before continuing work. There are various ways to clear the backlog from MQTT Service topics.

##### Consume messages {#mqtt-service-consume-messages}

If the topic and subscriber were created, there are probably also valuable messages stored in the Messaging Service that should be consumed.
Use the [MQTT Service SDK]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/mqtt-service-examples) to consume and acknowledge the messages for a given topic and subscriber.

After consuming all the messages, the backlog is cleared, and the topic is ready to store new messages.

##### Unsubscribe the subscriber using the MQTT Service SDK {#unsubscribe-the-subscriber-using-mqtt-service-sdk}

If the subscriber is no longer needed and there are no valuable messages that should be consumed, the subscriber can be unsubscribed.
Use the [unsubscribe action]({{< link-c8y-github >}}/cumulocity-clients-java/blob/develop/mqtt-service/websocket/src/main/java/com/cumulocity/mqtt/service/sdk/websocket/WebSocketSubscriber.java#L60) from the MQTT Service SDK.
This will remove the subscriber from the Messaging Service and clear the backlog for the given subscriber, and potentially the whole topic if there are no more subscribers with unconsumed messages.

##### Unsubscribe the subscriber via the UI {#mqtt-service-unsubscribe-the-subscriber-via-the-ui}

If the subscriber is no longer needed and there are no valuable messages that should be consumed, the subscriber can be unsubscribed directly from the UI.
To do this, select the subscriber from the subscriber list in the **Messaging Service** page and click the unsubscribe icon.
This action is equivalent to [unsubscribing the subscriber using the MQTT Service SDK](#unsubscribe-the-subscriber-using-mqtt-service-sdk).

### Frequently Asked Questions (FAQ) {#messaging-service-monitoring-faq}

#### What should I do when encountering a high number of topics?

A high number of topics could be normal behavior when dealing with many devices, but there could also be a situation where new topics are generated unnecessarily:
* Test topics that were never cleared - check for unused topics that can be cleaned up.
* Topics carrying the same data - topic names should be reused where possible to avoid unnecessary resource consumption. If you have multiple topics carrying the same data, consider merging them into a single topic.

#### What should I do when encountering a high number of subscribers?

If you have a single microservice or a single client consuming messages from the Messaging Service, you should typically only have a single subscriber.
Check if the subscriber name used by your client is unique and reused consistently when connecting to the Messaging Service.
A common pitfall is generating a random subscriber name each time a new connection to the Messaging Service is established.

Multiple subscribers are expected when multiple distinct clients consume from the same topic or when using [shared consumer tokens](https://cumulocity.com/api/core/#section/Overview/Shared-consumer-tokens).
