---
weight: 40
title: IoT data management
---

{{< product-c8y-iot >}} leverages a canonical yet extensible [data model](/concepts/domain-model/) to represent data from different device types and protocols consistently. This approach decouples device integration from IoT applications.

[Data Preparation](/data-preparation/) normalizes raw device messages into the {{< product-c8y-iot >}} data model and [automatically creates devices](/data-preparation/device-onboarding/) when it encounters unknown external IDs.

To bring IoT sensor data into a meaningful context, {{< product-c8y-iot >}} offers the [Digital Twin Manager](/dtm/dtm-introduction/) (DTM). DTM enables users to model different [asset types](/dtm/asset-types/#asset-models) they are working with and their [properties](/dtm/asset-types/#asset-properties). These models can then be used to create virtual representations of physical assets and their [hierarchical relationships](/dtm/asset-hierarchy/). DTM then allows users to [link sensor data](/dtm/asset-hierarchy/#to-assign-devices-to-an-asset) directly to this asset hierarchy.

By modeling assets and their attributes, organizations can create a comprehensive view of their IoT data that is leveraged by all {{< product-c8y-iot >}} applications and can also be queried via [REST APIs](https://{{< domain-c8y >}}/api).

For analytics and AI on large volumes of historical data, {{< product-c8y-iot >}} offers the optional [DataHub 2.0](/streaming-lake-ingestion/datahub-2-overview/). With Streaming Lake Ingestion, DataHub 2.0 streams your IoT data continuously into a [lakehouse](/glossary/#lakehouse) of open [Apache Iceberg](https://iceberg.apache.org/) tables that mirror the {{< product-c8y-iot >}} data model. The data is available for analysis within minutes. You read it with the Iceberg clients of your choice, such as query engines, notebooks, and business intelligence tools, and combine it with the other data of your organization. For details, see [Connecting to the lakehouse](/streaming-lake-ingestion/connecting-to-the-lakehouse/).
