---
weight: 40
title: IoT data management
---

{{< product-c8y-iot >}} leverages a canonical yet extensible [data model](/concepts/domain-model/) to represent data from different device types and protocols consistently. This approach decouples device integration from IoT applications.

To bring IoT sensor data into a meaningful context, {{< product-c8y-iot >}} offers the [Digital Twin Manager](/dtm/dtm-introduction/) (DTM). DTM enables users to model different [asset types](/dtm/asset-types/#asset-models) they are working with and their [properties](/dtm/asset-types/#asset-properties). These models can then be used to create virtual representations of physical assets and their [hierarchical relationships](/dtm/asset-hierarchy/). DTM then allows users to [link sensor data](/dtm/asset-hierarchy/#to-assign-devices-to-an-asset) directly to this asset hierarchy.

By modeling assets and their attributes, organizations can create a comprehensive view of their IoT data that is leveraged by all {{< product-c8y-iot >}} applications and can also be queried via [REST APIs](https://{{< domain-c8y >}}/api).

{{< product-c8y-iot >}} also offers the optional [DataHub](/datahub/datahub-overview/) application. [{{< product-c8y-iot >}} DataHub](/datahub/datahub-overview/) allows for efficient [querying](/datahub/working-with-datahub/#querying-offloaded) of your IoT data using SQL via standard ODBC/JDBC interfaces for an efficient [integration](/datahub/working-with-datahub/#configuring-offloading-jobs) of your IoT data with external data lake stores. This capability is particularly valuable for organizations dealing with large volumes of data, as it allows for a seamless integration of the IoT data into existing Business Intelligence, Analytics and AI tooling and workflows.
