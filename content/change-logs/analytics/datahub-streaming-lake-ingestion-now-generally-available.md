---
date: "2026-12-07"
title: "DataHub 2.0 with Streaming Lake Ingestion is now generally available"
product_area: Analytics
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-A8vMaVaTg
    label: DataHub
---
Streaming Lake Ingestion, the first capability of DataHub 2.0, is now Generally Available (GA) after its [Public Preview](/change-logs/?component=.component-A8vMaVaTg#datahub-streaming-lake-ingestions-now-in-public-preview).

Streaming Lake Ingestion streams your IoT data continuously into an Apache Iceberg lakehouse provided by Cumulocity. When you subscribe to the service, the data flow automatically starts. New data is available for queries within minutes, and the tables follow changes in your data structure automatically. You read the lakehouse with any Iceberg-compliant client, for example, a query engine, a notebook, or a business intelligence tool. The [Iceberg client compatibility](https://github.com/Cumulocity-IoT/iceberg-client-compatibility) repository lists tested clients.

To subscribe your tenant, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

DataHub 2.0 replaces DataHub 1.0. You can run both in parallel and migrate your queries step by step. For details, see [How can I migrate from DataHub 1.0?](/streaming-lake-ingestion/faq/#migrating-from-datahub-1)

To learn more, see the [DataHub 2.0 documentation](/streaming-lake-ingestion/datahub-2-overview/), the [service-level agreement](/service-terms/service-level/#datahub-2-sla), and the [quotas](/service-terms/quotas/#datahub-2).
