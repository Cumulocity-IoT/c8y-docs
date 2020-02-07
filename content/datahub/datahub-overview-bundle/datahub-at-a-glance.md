---
weight: 20
title: Cumulocity IoT DataHub at a glance
layout: redirect
---

The Cumulocity IoT platform allows you to manage and monitor a variety of devices. The data emitted by these devices is stored in Cumulocity's Operational Store, with older data potentially being removed (based on data retention settings). In order to run an ad-hoc query against recent device data, Cumulocity offers a [REST API](/reference/rest-implementation/).

In addition to this simple ad-hoc querying, various use cases require more sophisticated analytical querying over the device data, potentially covering long periods of time. Cumulocity IoT DataHub is the tool designed for this purpose. 

With Cumulocity IoT DataHub, you can connect existing tools and applications to Cumulocity, such as:

* Business Intelligence/reporting tools (using ODBC, JDBC)

* Machine learning applications (mainly written in Python using ODBC)

* Arbitrary custom applications (using JDBC for Java applications, ODBC for .NET, Python, node.js, and others, or REST for [Cumulocity web applications](/concepts/applications/#web-applications)) 

The main features of the Cumulocity IoT DataHub application are:

* It allows you to use scalable and inexpensive storage by providing an easy-to-use data pipeline that extracts data from Cumulocity's Operational Store to a **data lake** for long-term archival and efficient analytical querying.
* It offers an **SQL-based Query Interface** for querying the data lake and enables you to connect arbitrary applications that support ODBC, JDBC, or REST protocols.

The following diagram illustrates the high-level concepts.

<img src="/images/datahub-guide/datahub-highlevel-concept.png" alt="DataHub high level concept"  style="max-width: 100%">

The central component of Cumulocity IoT DataHub is Dremio, a distributed SQL engine that is used for the two purposes mentioned above. It offers an SQL API which can be accessed via JDBC, ODBC, and REST. Dremio enables the creation of Extract-Transform-Load (ETL) pipelines that:

* Periodically extract data from Cumulocity's Operational Store.
* Transform the data into a relational format.
* Persist the data as [Apache Parquet](https://parquet.apache.org/) files in the configured data lake.

When a user submits an SQL query, the query runs against data in the data lake. Thus, Cumulocity's Operational Store is not accessed during query processing; the Operational Store is only accessed by the regular ETL process to extract data.

The table below summarizes the main terms used throughout this documentation.

| Component | Explanation |
| ---  | ---         |
| Cumulocity IoT DataHub | Cumulocity application for offloading data from Cumulocity's Operational Store to a data lake and querying the data lake contents
| DataHub | Scheduler component for triggering periodic offloading and UI component for defining, managing, and monitoring offloading pipelines
| Cumulocity Operational Store | Cumulocity's internal datastore where all data (alarms, events, inventory, measurements, ...) is stored
| Dremio | Internal SQL engine for extracting data from the Cumulocity operational store and writing to and reading from the data lake
| Data lake | Storage container for offloaded data either on the basis of ADLS/Azure Storage (Azure) or S3 (Amazon). 
> **Info:** Google Cloud Storage (GCS) is currently not supported.

### Design of offloading pipeline

Offloading refers to moving data from Cumulocity's Operational Store to a data lake in order to:

* Provide the data in a tabular/relational and condensed format which can be leveraged for efficient SQL-based querying.
* Build a low-cost long-term archive of data.
* Separate analytical workloads from operational workloads.

The starting point is one of the base Cumulocity collections, such as the measurements collection, that is to be offloaded into the data lake. Once an offloading pipeline for this collection has been configured and started, a couple of actions take place.

> **Info:** DataHub only supports offloading for the base Cumulocity collections, which are **alarms**, **events**, **inventory**, **measurements**. Offloading other collections is currently not supported.

When an offloading job runs, the contents of the collection are offloaded. The document-based entities of Cumulocity's Operational Store are transformed into a relational format by flattening the entries and mapping them to relational rows.

> **Info:** The mapping automatically extracts a "standard" set of attributes from each entity, such as "time", "source", "id", and "type". It transforms them into columns in the data lake table. Furthermore, it automatically transforms the contents of measurement fragments into columns of the table. Here, the fragment name becomes part of the column name; the fragment's value is stored in a column suffixed with ".value" (resulting in `<fragment name>.value` as the column name); the unit is stored in a column suffixed ".unit". Non-standard fields can also be processed to a limited extent as described in [Configuring offloading jobs](/datahub/working-with-datahub/#configuring-offloading-jobs).

As a result of these extraction and transformation steps, the flattened data is stored in Parquet files in the data lake. Apache Parquet is a column-based storage format which enables compression and efficient data fetching. These Parquet files are managed in a folder structure based on a temporal hierarchy, because analytical queries commonly have a temporal background, e.g. compute the average oil pressure of last month. In order to ensure a compact layout of the Parquet files, DataHub also regularly runs a compaction algorithm over these files in the background. When data is stored in a time-based hierarchical manner in the data lake, DataHub can efficiently prune partitions. In addition, queries can explicitly leverage the structure to increase query performance.

> **Important:** You must not modify the data lake contents as this will corrupt your offloading pipelines and neither data consistency nor completeness can be guaranteed any more.

DataHub's scheduler runs the offloading pipeline in a periodic manner. The UI displays the execution schedule next to each configuration. Within each of these executions, newly arrived data is extracted from the Cumulocity collection and transformed and stored in the same way as described above. These incremental offloading tasks are designed to ensure a loss-free and duplicate-free offloading from the collection. For example, if one offloading execution fails, the next execution will automatically pick up the increments the failed one should have processed.

For each of the offloading pipelines, target tables are created in Dremio that point to the corresponding data folders in the data lake. When you run queries against the offloaded data, Dremio uses these target tables.

