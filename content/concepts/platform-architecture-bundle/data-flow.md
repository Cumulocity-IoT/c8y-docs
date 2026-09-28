---
weight: 10
title: Data flow
layout: redirect
---

The data flow architecture follows data through {{< product-c8y-iot >}} in real time, from a device on the left to storage and analytics on the right. Each stage has a single, clear responsibility, and a Messaging Service decouples the high-throughput stages so that each one can scale and operate independently.

![Data flow architecture](/images/concepts-guide/dataflow-architecture.png)

The diagram is a high-level view. The routes described below fill in detail that it glosses over.

**Device integration** connects devices to the platform. The route data takes depends on the protocol and the format the device sends:

- Devices connecting over **[REST](/device-integration/device-integration-rest/)** send data directly into the core, already in the {{< product-c8y-iot >}} [domain model](/concepts/domain-model/) format.
- Devices connecting over **[MQTT](/device-integration/mqtt/)** have two options. They can publish **[SmartREST](/smartrest/)** directly into the core — a defined format that the core automatically converts into the domain model — or they can connect through the **[MQTT Service](/device-integration/mqtt-service/)** in their own device-specific format.
- **[thin-edge.io](https://thin-edge.io/)** automatically converts its data to SmartREST and delivers it to the core.
- Other protocols, such as **[OPC UA](/device-integration/opcua/)**, LWM2M, and fieldbus protocols, use their own integrations to bring data into the core.

The **Messaging Service** is the platform's internal messaging backbone, powered by [Apache Pulsar](https://pulsar.apache.org/). On the device side, it carries only the MQTT Service traffic to Data Preparation, buffering and distributing it reliably and durably so that a burst of device traffic never overwhelms the components downstream.

**Data Preparation** turns the device-specific messages from the MQTT Service into {{< product-c8y-iot >}}'s [domain model](/concepts/domain-model/). It does this with a **[smart function](/concepts/smart-function-concept/)** — or a custom **microservice** for more complex cases — and can also normalize, enrich, or filter the data before storing it.

The **core** is the heart of the platform, where all paths converge. It holds data in the operational store and serves the live state of the system — inventory, measurements, events, alarms, and operations — through its APIs. This is the system of record for current and recent data.

A second, application-side **Messaging Service** makes data in the core available to everything that consumes it: applications, streaming analytics, and ingestion into the data lake. This second decoupling lets read-side consumers scale independently of ingestion.

**Analytics and lake ingestion** acts on live data and archives it. [Streaming Analytics](/streaming-analytics/introduction-analytics/) processes data as it arrives, and [Streaming Lake Ingestion](/datahub/streaming-lake-ingestion/) continuously offloads it into the data lake. Analytics results loop back into the core — raising an alarm, or sending an operation to a device — which closes the real-time control loop back to the equipment. You extend this stage with a **microservice**, a **[smart function](/concepts/smart-function-concept/)**, or **[smart rules](/cockpit/smart-rules/)** for no-code automation.

Two stores sit beneath the core, each optimized for a different job:

- The **operational store** holds current and recent data for fast, real-time access by every component.
- The **data lake** holds a continuously updated, permanent archive of all data in open [Apache Iceberg](https://iceberg.apache.org/) tables, ready for large-scale historical analysis and AI. [Streaming Lake Ingestion](/datahub/streaming-lake-ingestion/) writes data there continuously, and [DataHub](/datahub/datahub-overview/) can also offload and query it.
