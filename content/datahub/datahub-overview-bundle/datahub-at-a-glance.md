---
weight: 20
title: Cumulocity DataHub at a glance
layout: redirect
---

The {{< product-c8y-iot >}} platform allows you to manage and monitor a variety of devices. The data emitted by these devices is stored in the Operational Store of {{< product-c8y-iot >}}, with older data potentially being removed (based on data retention settings). In order to run an ad-hoc query against recent device data, {{< product-c8y-iot >}} offers a [REST API](https://{{< domain-c8y >}}/api/core/#section/REST-implementation), which is described in the {{< openapi >}}.

In addition to this simple ad-hoc querying, various use cases require more sophisticated analytical querying over the device data, potentially covering long periods of time. {{< product-c8y-iot >}} DataHub is the tool designed for this purpose.

With {{< product-c8y-iot >}} DataHub, you can connect existing tools and applications to {{< product-c8y-iot >}}, such as:

* Business Intelligence/reporting tools (using ODBC, JDBC)

* Machine learning applications (mainly written in Python using ODBC)

* Arbitrary custom applications (using JDBC for Java applications, ODBC for .NET, Python, node.js, and others, or REST for web applications)

The main features of the {{< product-c8y-iot >}} DataHub application are:

* It allows you to use scalable and inexpensive storage by providing an easy-to-use data pipeline that extracts data from the Operational Store of {{< product-c8y-iot >}} to a **data lake** for long-term archival and efficient analytical querying.
* It offers an **SQL-based Query Interface** for querying the data lake and enables you to connect arbitrary applications that support ODBC, JDBC, or REST protocols.

The central component of {{< product-c8y-iot >}} DataHub is [Dremio](https://www.dremio.com), a distributed SQL engine that is used for the two purposes mentioned above. It offers an SQL API which can be accessed via JDBC, ODBC, and REST. Dremio is in charge of Extract-Transform-Load (ETL) pipelines that:

* Periodically extract data from the Operational Store of {{< product-c8y-iot >}}.
* Transform the data into a relational format.
* Persist the data as [Apache Parquet](https://parquet.apache.org/) files in the configured data lake.

When a user submits an SQL query, the query runs against data in the data lake. Thus, the Operational Store of {{< product-c8y-iot >}} is not accessed during query processing; the Operational Store is only accessed by the regular ETL process which extracts the data. {{< product-c8y-iot >}} DataHub manages those ETL processes and ensures their execution in a periodic manner.

The table below summarizes the main terms used throughout this documentation.

| Component | Explanation |
| ---  | ---         |
| {{< product-c8y-iot >}} DataHub | {{< product-c8y-iot >}} application for offloading data from the Operational Store of {{< product-c8y-iot >}} to a data lake and querying the data lake contents; scheduler component (deployed as microservice) for triggering periodic offloading and UI component (deployed as web application) for defining, managing, and monitoring offloading pipelines
| {{< product-c8y-iot >}} Operational Store | Internal datastore of {{< product-c8y-iot >}} where all data (alarms, events, inventory, measurements, ...) is stored in so-called base collections
| Dremio | Internal SQL engine for extracting data from the {{< product-c8y-iot >}} Operational Store and writing to and reading from the data lake
| Data lake | Storage container for offloaded data either on the basis of ADLS Gen2/Azure Storage (Azure), S3 (Amazon), NAS

{{< c8y-admon-info >}}
Google Cloud Storage (GCS) is currently not supported.
{{< /c8y-admon-info >}}

### Design of offloading pipelines {#design-of-offloading-pipelines}

Offloading refers to moving data from the Operational Store of {{< product-c8y-iot >}} to a data lake in order to:

* Provide the data in a tabular/relational and condensed format which can be leveraged for efficient SQL-based querying.
* Build a low-cost long-term archive of data.
* Separate analytical workloads from operational workloads.

The starting point is one of the {{< product-c8y-iot >}} base collections, such as the measurements collection, that is to be offloaded into the data lake. Once an offloading pipeline for this collection has been configured and started, a couple of actions take place.

{{< c8y-admon-info >}}
{{< product-c8y-iot >}} DataHub only supports offloading for the following {{< product-c8y-iot >}} base collections: **alarms**, **events**, **inventory**, **measurements**. Offloading of other collections is currently not supported.
{{< /c8y-admon-info >}}

When an offloading job runs, the contents of the collection are offloaded. The document-based entities of the Operational Store of {{< product-c8y-iot >}} are transformed into a relational format by flattening the entries and mapping them to relational rows.

{{< c8y-admon-info >}}
The mapping automatically extracts a standard set of attributes from each entity, such as `time`, `source`, `id`, and `type`. It transforms them into columns in the data lake table. Furthermore, it automatically transforms the contents of measurement fragments into columns of the table. Non-standard fields can also be offloaded to a limited extent. [Configuring offloading jobs](/datahub/working-with-datahub/#configuring-offloading-jobs) provides more details and examples for this transformation.
{{< /c8y-admon-info >}}

As a result of these extraction and transformation steps, the flattened data is stored in Parquet files in the data lake. Apache Parquet is a column-based storage format which enables compression and efficient data fetching. These Parquet files are managed in a folder structure based on a temporal hierarchy, because analytical queries commonly have a temporal background. For example, compute the average oil pressure of last month. In order to ensure a compact layout of the Parquet files, {{< product-c8y-iot >}} DataHub also regularly runs a compaction algorithm over these files in the background, which combines multiple smaller files in larger files. As the data is stored in a time-based hierarchical manner in the data lake, {{< product-c8y-iot >}} DataHub can efficiently prune partitions. In addition, queries can explicitly leverage this temporal structure to increase query performance.

{{< c8y-admon-important >}}
You must not modify the folders in the data lake being created by {{< product-c8y-iot >}} DataHub as this will corrupt your offloading pipelines and neither data consistency nor completeness can be guaranteed any more.
{{< /c8y-admon-important >}}

The scheduler of {{< product-c8y-iot >}} DataHub runs the offloading pipelines in a periodic manner. The UI shows for each pipeline the corresponding schedule. Within each of these pipeline executions, newly arrived data is extracted from the {{< product-c8y-iot >}} collection and transformed and stored in the same way as described above. These incremental offloading tasks are designed to ensure a loss-free and duplicate-free offloading from the collection. For example, if one offloading execution fails, the next execution will automatically pick up the increments the failed one should have processed.

For each offloading pipeline, a so-called **target table** is created in Dremio that points to the corresponding data folders in the data lake. When you want to run queries with Dremio against the offloaded data, you must use these target tables.
