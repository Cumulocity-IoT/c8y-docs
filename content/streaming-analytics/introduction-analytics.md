---
title: Introduction
layout: bundle
sector:
- data_analytics
weight: 10
aliases:
- /streaming-analytics/overview-analytics/
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:40Z'
---
Using {{< product-c8y-iot >}} Streaming Analytics, you can add your own logic to your IoT solution for immediate processing of incoming data from devices or other data sources. This logic can, for example, alert applications of new incoming data, create new data based on the received data (such as sending an alarm when a threshold for a sensor is exceeded), or trigger operations on devices.

Typical real-time analytics use cases include:

* Remote control: Turn a device off if its temperature rises over 40 degrees.
* Validation: Discard negative meter readings or meter readings that are lower than the previous.
* Derived data: Calculate the volume of sales transactions per vending machine per day.
* Aggregation: Sum up the sales of vending machines for a customer per day.
* Notifications: Send me an email if there is a power outage in one of my machines.
* Compression: Store location updates of all cars only once every five minutes (but still send real-time data for the car that I am looking at to the user interface).

{{< product-c8y-iot >}} Streaming Analytics includes a built-in event processing engine that powers both [Analytics Builder](/streaming-analytics/analytics-builder) and custom [EPL (Event Processing Language) apps](/streaming-analytics/epl-apps). This engine, called the Apama correlator, runs automatically within the {{< product-c8y-iot >}} platform and does not require manual setup or management.

Streaming Analytics is available in both {{< product-c8y-iot >}} Core (cloud) and {{< product-c8y-iot >}} Edge (local installation), providing flexibility for different deployment needs.

### Understanding processing modes in Streaming Analytics {#understanding-processing-modes}

When working with Streaming Analytics in {{< product-c8y-iot >}}, the availability and persistence of data depend on the processing mode chosen at ingestion. Refer to [HTTP usage > Processing mode](https://{{< domain-c8y >}}/api/core/#section/REST-implementation/HTTP-usage) in the {{< openapi >}} and [OPC UA > Sample payloads](/device-integration/opcua/#creating-a-new-device-type) for more information.

This directly impacts what data you can access, analyze, and act upon in realtime.

**PERSISTENT (default) and QUIESCENT modes**:

Data is stored in the {{< product-c8y-iot >}} database and sent to the Streaming Analytics engine. This is the normal expectation where all data is persisted in the platform before Streaming Analytics processes it.

**TRANSIENT and CEP modes**:

Data is sent to the Streaming Analytics engine, but it is not stored in the database. This allows processing of data before it’s stored in the platform to reduce storage with aggregates or to do data conversion or cleaning tasks before it is stored in the database.

PERSISTENT and TRANSIENT modes also generate notifications to non-Streaming-Analytics subscribers to notifications, whereas CEP and QUIESCENT modes will only be sent to Streaming Analytics. The latter two modes are only applicable to measurements and events.
