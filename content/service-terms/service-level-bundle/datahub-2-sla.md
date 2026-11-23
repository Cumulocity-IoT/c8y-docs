---
title: DataHub 2.0 service-level agreement
anchor_aliases:
  - streaming-lake-ingestion-sla
layout: bundle
weight: 22
---

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who uses {{< product-c8y-iot >}} DataHub 2.0 ("Service") for streaming Internet of Things ("IoT") data into a lakehouse for analysis, using Provider's cloud instances ("software-as-a-service", "SaaS"). The Service stores the data in object storage that Provider operates. This agreement does not cover self-hosted storage.

### Service description

The Service provides automated data ingestion and structuring for real-time IoT data, making it available for querying through analytics tools. The Service performs the following core functions:

* Discovers the schema of incoming IoT data and maps it to Apache Iceberg tables. When the schema changes, the Service updates the tables without manual configuration.
* Ingests incoming IoT data into the corresponding Iceberg tables within the data freshness and data durability objectives.
* Stores the data in object storage with:
  * Data retention as defined in your plan.
  * Retention of the data for 30 days after the subscription ends, so that you can export the data with an Iceberg client. After this period, Provider deletes the data.
  * Redundancy across availability zones within a region, which protects the data against the outage of a single availability zone.
* Provides access to the data through the standard Iceberg REST catalog API with short-lived storage credentials ("credential vending").

### Customer responsibilities

To ensure the successful operation of the Service, you must fulfill the following responsibilities.

#### Schema limits

The Service limits the schema that can be ingested into the lakehouse. Data violating the limits is:

* **Rejected**: Stored in a secondary location that is not optimized for high-performance queries.
* **Dropped**: Not stored if it violates system-wide schema constraints. For details, see [Service quotas](/service-terms/quotas/).

You are responsible for:

* Monitoring for {{< product-c8y-iot >}} alarms related to data rejection. For details, see [Monitoring Streaming Lake Ingestion](/streaming-lake-ingestion/monitoring-streaming-lake-ingestion/).
* Implementing pre-processing logic to ensure inbound data conforms to required schemas, using tools such as {{< product-c8y-iot >}} [Data Preparation](/data-preparation).

#### Schema evolution

The Service automatically adds new columns to Iceberg tables at any time based on the structure of incoming data.

Ensure that your data queries are robust against schema changes. Specifically, use broad selectors (for example, `SELECT *`) with caution to prevent unexpected behavior when columns are added.

#### Type conflict resolution

The Service [automatically resolves](/streaming-lake-ingestion/understanding-the-lakehouse/#handling-of-schema-conflicts) type conflicts in inbound data to maintain storage reliability. In multi-tenant environments, the order in which data with conflicting types is received can lead to schema variations between tenants.

Manage data consistency where required, either by enforcing a specific ingestion order or by using inbound data preparation to resolve conflicts before they reach the Service.

#### Data export after the subscription ends

To export your data after the subscription ends, create the catalog credentials for your Iceberg client before the subscription ends. After the subscription ends, you cannot create or rotate credentials. The credentials you already have stay valid until Provider deletes the data. For details, see [How can I end my subscription and obtain my data?](/streaming-lake-ingestion/faq/#ending-the-subscription).

### Limitations and constraints

The following limitations and constraints apply to the Service:

* **Data model performance**: The Service stores data using a standardized tabular schema optimized for write performance and a broad range of analytical use cases. This schema is not optimally performant for all query patterns. For applications requiring maximum query performance, you must implement post-processing to create optimized data models (for example, "gold-layer" tables) or use the query acceleration features of your query engine.
* **Individual message tracing**: The Service is engineered as a high-throughput streaming pipeline and does not maintain per-message transaction logs or audit trails. {{< company-c8y >}} does not perform ad-hoc tracing or investigations for individual missing or delayed message claims without client-side logs demonstrating a deterministic, reproducible defect (for example, a valid QoS 1 acknowledgment received at the endpoint without corresponding data arrival in the destination object store).
* **Excessive use**: The Service is designed for the usage pattern defined in your plan. Provider may charge for usage beyond this pattern, such as frequent mass downloads of data to destinations outside your region.
* **Per tenant traffic limit**: The Service can currently process a maximum of 1,500 sustained messages per second for a single tenant.


### Service quality

#### Service-level objectives

Service-level objectives are calculated in accordance with the [Platform service-level agreement](/service-terms/service-level/#service-availability). The following objectives measure the quality of the Service:

<table>
<thead>
  <tr>
    <th>Service-level indicator</th>
    <th>Production</th>
    <th>Non-production</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Catalog availability</td>
    <td>≥ 99.9%</td>
    <td>≥ 95.0%</td>
  </tr>
  <tr>
    <td>Data freshness: change data capture</td>
    <td>≤ 5 minutes</td>
    <td>≤ 10 minutes</td>
  </tr>
  <tr>
    <td>Data freshness: latest inventory</td>
    <td>≤ 10 minutes</td>
    <td>≤ 20 minutes</td>
  </tr>
  <tr>
    <td>Data durability</td>
    <td colspan="2">Designed for ≥ 99.999% of acknowledged messages</td>
  </tr>
</tbody>
</table>

#### Service-level indicator definitions

The service quality indicators are defined as follows:

* **Catalog availability**: The uptime of the Iceberg catalog service, as defined by the [{{< company-c8y >}} service availability terms](/service-terms/service-level/#service-availability).
* **Data freshness**: The time between message arrival in the {{< product-c8y-iot >}} platform (post-preparation) and its availability for querying in the lakehouse. The target applies to the 95th percentile of sustained load, measured over a calendar month. The Service has separate targets for the following tables:
  * **Change data capture**: The change data capture tables and their views, for example, `cdc_alarm.alarm` and `view_alarm.alarm`.
  * **Latest inventory**: The `latest_inventory` tables. The Service calculates these tables from the change data capture tables. The target includes the time to write the change data capture tables.
* **95th percentile**: 95 percent of the messages arrive within the service-level objective.
* **Sustained load**: The regular and predictable steady-state traffic on the cloud service APIs. Sustained load is the 95th percentile of the previous 30-day requests per second.
* **Data durability**: The design objective for the share of messages that the Service writes to the lakehouse after the platform has acknowledged them to the client with Quality of Service 1 (QoS 1). The objective covers the processing by the Service: the streaming buffer of the platform, the write to the object storage, and the maintenance of the Iceberg tables (for example, snapshot expiry and file compaction). The object storage itself, for example, Amazon S3 or Azure Data Lake Storage, keeps the stored data with the durability that its cloud provider specifies. Messages that the Service rejects because of schema limits do not count. Provider does not measure this objective per calendar month.
