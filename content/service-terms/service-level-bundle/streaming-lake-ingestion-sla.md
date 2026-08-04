---
title: Streaming Lake Ingestion service-level agreement
layout: bundle
weight: 22
---

{{< c8y-admon-info >}}
Streaming Lake Ingestion is currently in Preview. Preview features are not subject to a service-level agreement. The following text is for information purposes only.
{{< /c8y-admon-info >}}

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who uses {{< product-c8y-iot >}} Streaming Lake Ingestion ("Service") for offloading and analyzing Internet of Things ("IoT") data using Provider's cloud instances ("software-as-a-service", "SaaS").

### Service description

The Service provides automated data ingestion and structuring for real-time IoT data, making it available for querying through analytics tools such as {{< product-c8y-iot >}} DataHub. The Service performs the following core functions:

* Automatically discovers and maps the schema of incoming IoT data to Apache Iceberg tables, including support for schema evolution without manual configuration.
* Publishes the discovered and evolved schemas to a queryable Iceberg catalog.
* Ensures the timely and reliable ingestion of incoming IoT data into the corresponding Iceberg tables.

### Customer responsibilities

To ensure the successful operation of the Service, you must fulfill the following responsibilities.

#### Object store

To achieve the service-level objective, you must provision an object store in the same hyperscaler and region where your tenant is hosted. Ensure that

* The object store is reachable from your {{< product-c8y-iot >}} instance.
* The object store permissions are correctly configured to permit Streaming Lake Ingestion to list, write, delete files, and delegate access to the object store through the embedded catalog (Iceberg "credential vending").
* Backup is enabled ([Bucket versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/manage-versioning-examples.html) on AWS, [Soft delete](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-enable?tabs=azure-portal) on Azure).
* Only Streaming Lake Ingestion has write access to the object store.

Streaming Lake Ingestion optimizes the storage allocation and may periodically delete unused files to reclaim storage space. {{< company-c8y >}} is not responsible for files written outside of Streaming Lake Ingestion.

#### Schema limits

The Service limits the schema that can be ingested into the lake. Data violating the limits is:

* **Binned**: Stored in a secondary location that is not optimized for high-performance queries.
* **Rejected**: Not stored if it violates system-wide schema constraints.

You are responsible for:

* Monitoring for {{< product-c8y-iot >}} alarms related to data rejection. For details, see [Monitoring the data flow](/datahub/streaming-lake-ingestion/#monitoring).
* Implementing pre-processing logic to ensure inbound data conforms to required schemas, using tools such as {{< product-c8y-iot >}} [Dynamic Mapper](https://community.cumulocity.com/t/dynamic-mapper-map-mqtt-device-data-in-a-zero-code-approach/3043).

#### Schema evolution

The Service automatically adds new columns to Iceberg tables at any time based on the structure of incoming data.

Ensure that your data queries are robust against schema changes. Specifically, use broad selectors (for example, `SELECT *`) with caution to prevent unexpected behavior when columns are added.

#### Type conflict resolution

The Service [automatically resolves](/datahub/streaming-lake-ingestion/#understanding-the-data-lake-structure) type conflicts in inbound data to maintain storage reliability. In multi-tenant environments, the order in which data with conflicting types is received can lead to schema variations between tenants.

Manage data consistency where required, either by enforcing a specific ingestion order or by using inbound data preparation to resolve conflicts before they reach the Service.

### Limitations and constraints

The following limitations and constraints apply to the Service:

* **Data model performance**: The Service stores data using a standardized tabular schema optimized for write performance and a broad range of analytical use cases. This schema is not optimally performant for all query patterns. For applications requiring maximum query performance, you must implement post-processing to create optimized data models (for example, "gold-layer" tables) or leverage query acceleration features within the query engine (for example, "reflections").
* **Cost profile variations**: The Service balances data timeliness against cost-efficiency of the underlying storage operations (for example, Amazon S3). The internal mechanisms that manage this trade-off (for example, data batching frequency) are part of the Service's evolving software implementation. As we update and optimize the Service over time, the hyperscaler cost profile of your usage varies. For example, a future update designed to improve query performance can result in a different ratio of API requests to data volume than a previous version.
* **Storage reclamation delay**: Apache Iceberg retains historical data versions and deleted files for a period of time to ensure data integrity. The Service permanently removes these files during periodic, automated cleanup cycles. This intentional delay in file deletion affects your total billed storage, as the system does not reclaim physical storage space in real time.
* **Per tenant traffic limit**: The Service can currently process a maximum of 1,500 sustained messages per second for a single tenant.

### Service quality

#### Service-level objectives

The following objectives measure the quality of the Service:

| Service level indicator | Monthly target                               |
| ----------------------- | -------------------------------------------- |
| Catalog availability    | ≥ 99.9%                                      |
| Data freshness          | 95 percentile of sustained load ≤ 10 minutes |


#### Service-level indicator definitions

The service quality indicators are defined as follows:

* **Catalog availability**: The uptime of the Iceberg catalog service, as defined by the [{{< company-c8y >}} service availability terms](/service-terms/service-level/#service-availability).
* **Data freshness**: The time between message arrival in the {{< product-c8y-iot >}} platform (post-preparation) and its availability for querying in the data lake, measured over a calendar month.
* **95th percentile**: 95 percent of the messages arrive within the service level objective.
* **Sustained load**: The regular and predictable steady-state traffic on the cloud service APIs. Sustained load is the 95 percentile of the previous 30 day requests per second.
