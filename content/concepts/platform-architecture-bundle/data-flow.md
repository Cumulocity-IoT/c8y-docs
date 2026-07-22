---
weight: 10
title: Data flow
layout: redirect
---

The data flow architecture follows data through {{< product-c8y-iot >}} in real time, from a device on the left to storage and analytics on the right. Each stage has a single, clear responsibility, and a Messaging Service decouples them so that each one can scale and operate independently.

![Data flow architecture](/images/concepts-guide/dataflow-architecture.png)

**Device integration** connects devices to the platform, whatever protocol they speak — the [MQTT Service](/device-integration/mqtt-service/), OPC UA, LWM2M, thin-edge.io, REST, or fieldbus protocols. Data enters in the device's own native format. To support a protocol or connectivity method that is not built in, you can add a **microservice** at this stage.

**The Messaging Service** is the platform's internal messaging backbone, powered by [Apache Pulsar](https://pulsar.apache.org/). A device-side queue buffers and distributes incoming data reliably and durably, decoupling ingestion from processing so that a burst of device traffic never overwhelms the components downstream.

**Data Preparation** maps each message from its native format into {{< product-c8y-iot >}}'s [domain model](/concepts/domain-model/) and applies any preprocessing — normalizing, enriching, or filtering the data before storing it. You extend this stage with a **microservice** or, more lightly, a **[smart function](/concepts/smart-function-concept/)**.

**The core** is the heart of the platform. It writes prepared data into the operational store and serves the live state of the system — inventory, measurements, events, alarms, and operations — through its APIs. This is the system of record for current and recent data.

**A second, application-side Messaging Service** makes data in the core available to everything that consumes it: applications, streaming analytics, and ingestion into the data lake. This second decoupling lets read-side consumers scale independently of ingestion.

**Analytics and lake ingestion** acts on live data and archives it. [Streaming Analytics](/streaming-analytics/introduction-analytics/) processes data as it arrives, and [Streaming Lake Ingestion](/datahub/streaming-lake-ingestion/) continuously offloads it into the data lake. Analytics results loop back into the core — raising an alarm, or sending an operation to a device — which closes the real-time control loop back to the equipment. You extend this stage with a **microservice**, a **[smart function](/concepts/smart-function-concept/)**, or **[smart rules](/cockpit/smart-rules/)** for no-code automation.

Two stores sit beneath the core, each optimized for a different job:

- The **operational store** holds current and recent data for fast, real-time access by every component.
- The **data lake** holds a continuously updated, permanent archive of all data in open [Apache Iceberg](https://iceberg.apache.org/) tables, ready for large-scale historical analysis and AI. [Streaming Lake Ingestion](/datahub/streaming-lake-ingestion/) writes data there continuously, and [DataHub](/datahub/datahub-overview/) can also offload and query it.
