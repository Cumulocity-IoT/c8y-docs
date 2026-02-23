---
title: Streaming Lake Ingestion service-level agreement
layout: bundle
weight: 22
---

{{< c8y-admon-info >}}
Streaming Lake Ingestion is currently in Private Preview. Preview features are not subject to a service-level agreement. The following text is for information purposes only.
{{< /c8y-admon-info >}}

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who uses {{< product-c8y-iot >}} Streaming Lake Ingestion ("Service") for offloading and analyzing Internet of Things ("IoT") data using Provider's cloud instances ("software-as-a-service", "SaaS").

## Service Description

The Service provides automated data ingestion and structuring for real-time IoT data, making it available for query through the {{< product-c8y-iot >}} DataHub. The Service performs the following core functions:

* Automatically discovers and maps the schema of incoming IoT data to Apache Iceberg tables, including support for schema evolution without manual configuration.
* Publishes the discovered and evolved schemas to a queryable Iceberg catalog.
* Ensures the timely and reliable ingestion of incoming IoT data into the corresponding Iceberg tables.

## Customer responsibilities

To ensure the successful operation of the Service, you must fulfill the following responsibilities.

### Schema limit configuration

{{< product-c8y-iot >}} provides a feature flag to disable hard schema limits. If you disable these limits, data violating the limits is:

* **Binned**: Stored in a secondary location that is not optimized for high-performance queries.
* **Rejected**: Not stored if it violates system-wide schema constraints.

You are responsible for:

* Monitoring for {{< product-c8y-iot >}} alarms related to data rejection. For details, see ["Monitoring the data flow"](/datahub/streaming-lake-ingestion/#monitoring).
* Implementing pre-processing logic to ensure inbound data conforms to required schemas, using tools such as {{< product-c8y-iot >}} [Dynamic Mapper](https://community.cumulocity.com/t/dynamic-mapper-map-mqtt-device-data-in-a-zero-code-approach/3043).

### Schema evolution

The Service automatically adds new columns to Iceberg tables at any time based on the structure of incoming data.

Ensure that your data queries are robust against schema changes. Specifically, use broad selectors (for example, SELECT *) with caution to prevent unexpected behavior when columns are added.

### Type conflict resolution

The Service [automatically resolves](/datahub/streaming-lake-ingestion/#understanding-the-data-lake-structure) type conflicts in inbound data to maintain storage reliability. In multi-tenant environments, the order in which data with conflicting types is received can lead to schema variations between tenants.

Manage data consistency where required, either by enforcing a specific ingestion order or by using inbound data preparation to resolve conflicts before they reach the Service.

## Limitations and constraints

The following limitations and constraints apply to the Service:

* **Data model performance**: The Service stores data using a standardized tabular schema optimized for write performance and a broad range of analytical use cases. This schema is not optimally performant for all query patterns. For applications requiring maximum query performance, you must implement post-processing to create optimized data models (for example, "gold-layer" tables) or leverage query acceleration features within the query engine (for example, "reflections").
* **Cost profile variations**: The Service balances data timeliness against cost-efficiency of the underlying storage operations (for example, Amazon S3). The internal mechanisms that manage this trade-off (for example, data batching frequency) are part of the Service's evolving software implementation. As the Service is updated and optimized over time, the cost profile of your usage varies. For example, a future update designed to improve query performance might result in a different ratio of API requests to data volume than a previous version.
* **Storage reclamation delay**: Apache Iceberg retains historical data versions and deleted files for a period of time to ensure data integrity. These files are permanently removed during periodic, automated cleanup cycles. This intentional delay in file deletion affects your total billed storage, as physical storage space is not reclaimed in real-time.

## Service quality

### Service-level objectives

The quality of the Service is measured by the following objectives:

| Service level indicator | Monthly target                   |
| ----------------------- | -------------------------------- |
| Catalog availability    | ≥ 99.9%                          |
| Data durability         | ≥ 99.99%                         |
| Data freshness          | ≤ 10 minutes in 95% of the cases |


### Service-level indicator definitions

The service quality indicators are defined as follows:

* **Catalog Availability**: The uptime of the Iceberg catalog service, as defined by the [{{< company-c8y >}} service availability terms](/service-terms/service-level/#service-availability).
* **Data Durability**: The percentage of compliant inbound data records that are successfully and permanently stored in the data lake within a calendar month. A data record is considered compliant if it adheres to the [{{< product-c8y-iot >}} quotas and limits](/service-terms/quotas/).
* **Data Freshness**: The average time between a data record's arrival in the {{< product-c8y-iot >}} platform (post-preparation) and its availability for query in the data lake, measured over a calendar month.
