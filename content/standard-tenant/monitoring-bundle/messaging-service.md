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
It provides asynchronous communication between platform components, and user-facing features for moving real-time data into and out of the platform.
The features that use the Messaging Service include the microservice-based Data broker, Notifications 2.0, and the MQTT Service.

**Topics** are the core concept underlying all of the features using the Messaging Service.
A topic is a named logical channel for delivering messages from *publishers* to *subscribers*.
Each topic may have any number of publishers and subscribers, and in general every subscriber will receive the messages sent by every publisher.
All of the subscribers on a topic will receive the published messages in the same order.
The topic will persistently store published messages until every subscriber has acknowledged that it has successfully received them.
This means that the Messaging Service can guarantee delivery of every published messages to every subscriber.

The following sections show how to monitor your tenant's usage of the Message Service, for each of the services that use it.

### Monitoring Notifications 2.0 {#monitoring-notifications-2.0}

### Monitoring the MQTT Service {#monitoring-the-mqtt-service}

### Monitoring the Data broker {#monitoring-the-data-broker}
