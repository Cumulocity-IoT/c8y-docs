---
title: What is real-time processing in our platform?
layout: bundle
weight: 1
---

On top of {{< product-c8y-iot >}} you can use the Apama Streaming Analytics engine to define business operations for immediate processing of incoming data from devices or other data sources. These user-defined operations can for example alert applications of new incoming data, create new operations based on the received data (such as sending an alarm when a threshold for a sensor is exceeded), or trigger operations on devices. The operation logic is implemented in Apama's Event Processing Language (EPL).

Apama's Event Processing Language covers statements, which are organized into actions and monitors. Monitor files can be edited directly from within {{< product-c8y-iot >}} using the Streaming Analytics application. Alternatively, you can install Apama on your local machine and develop your applications with {{< apama-plugin >}} - an Eclipse-based development environment. You can deploy your monitor files as Apama applications to {{< product-c8y-iot >}}, see [Basic functionality](/streaming-analytics/epl-apps/#basic-functionality) for more information.

For further information on using Apama's Event Processing Language in {{< product-c8y-iot >}} refer to [Using the Apama Event Processing Language](/concepts/realtime/#using-epl) below and to [Streaming Analytics](/streaming-analytics/introduction-analytics/).


### What are the benefits of using real-time processing? {#what-are-the-benefits-of-using-realtime-processing}

{{< product-c8y-iot >}}'s real-time processing feature has the following benefits:

- React instantly to events from remote sensors.
- Develop highly interactive IoT applications.
- Run IoT use cases directly inside {{< product-c8y-iot >}} without software development and leave the hosting and management to {{< product-c8y-iot >}}.
- Validate, normalize and derive data according to your own business rules across different device makes.
- Trigger automated remote control actions based on events.
- Use powerful, stream-oriented business logic, like time windows and joins.
- Reduce the cost of online tracking devices by preselecting data necessary for long-term storage.
