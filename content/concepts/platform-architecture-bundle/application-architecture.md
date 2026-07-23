---
weight: 20
title: Application architecture
layout: redirect
---

The application architecture shows how applications and business logic build on top of the platform core and its two stores to deliver value to users.

![Application architecture](/images/concepts-guide/application-architecture.png)

The **core and its stores** — described in [Data flow](#data-flow) — are the shared foundation. Everything above them works against the same live [domain model](/concepts/domain-model/) in the operational store, and the archive in the data lake.

**Business logic** runs as server-side [microservices](/microservice-sdk/microservice-sdk-introduction/) alongside the platform's own services. Use it to add custom server-side behavior, or to integrate {{< product-c8y-iot >}} with external and enterprise systems such as ERP or CRM.

**Data lake query** gives applications and analytics tools access to the archived data in the data lake. Because the data lake uses open [Apache Iceberg](https://iceberg.apache.org/) tables, tools can query it both from within {{< product-c8y-iot >}} and from outside — notebooks, AI/ML platforms, and business intelligence tools — through [Streaming Lake Ingestion](/datahub/streaming-lake-ingestion/) and [DataHub](/datahub/datahub-overview/). This is where large-volume, historical, and cross-system analysis happens.

**IoT applications** are the user-facing layer. [Web applications](/web/introduction/) and dashboards present the state of the system and let users act on it, and the Messaging Service delivers real-time updates so those displays stay live. You extend this layer with **web applications**, **HTML widgets**, and **[AI agents](/ai/agents/)** that bring generative and agentic AI directly to the user.
