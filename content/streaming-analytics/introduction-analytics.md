---
title: Introduction
layout: bundle
sector:
  - data_analytics
weight: 10
aliases:
  - /streaming-analytics/overview-analytics/
---

Using {{< product-c8y-iot >}} Streaming Analytics, you can add your own logic to your IoT solution for immediate processing of incoming data from devices or other data sources. This logic can, for example, alert applications of new incoming data, create new data based on the received data (such as sending an alarm when a threshold for a sensor is exceeded), or trigger operations on devices.

Typical real-time analytics use cases include:

* Remote control: Turn a device off if its temperature rises over 40 degrees.
* Validation: Discard negative meter readings or meter readings that are lower than the previous.
* Derived data: Calculate the volume of sales transactions per vending machine per day.
* Aggregation: Sum up the sales of vending machines for a customer per day.
* Notifications: Send me an email if there is a power outage in one of my machines.
* Compression: Store location updates of all cars only once every five minutes (but still send real-time data for the car that I am looking at to the user interface).

{{< product-c8y-iot >}} Streaming Analytics includes a built-in event processing engine that powers both Analytics Builder and custom EPL (Event Processing Language) apps. This engine, called the Apama correlator, runs automatically within the {{< product-c8y-iot >}} platform and does not require manual setup or management.

Streaming Analytics is available in both {{< product-c8y-iot >}} Core (cloud) and {{< product-c8y-iot >}} Edge (local installation), providing flexibility for different deployment needs.
