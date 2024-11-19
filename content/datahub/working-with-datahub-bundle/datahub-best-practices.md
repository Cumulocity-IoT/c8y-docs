---
weight: 100
title: Cumulocity DataHub best practices
layout: redirect
---

Learn from well-established usage patterns in order to ensure a robust and scalable processing of your SQL queries.

### Naming policies {#naming-policies}

When defining an offloading configuration, you must specify the task name, the target table, and a description. You should ensure that you provide reasonable names for each of these settings so that afterwards you can easily find the offloading pipelines you are interested in. A reasonable naming scheme also facilitates writing queries.

Also when defining an offloading configuration, you must always define a target table that is unique among the currently saved configurations. You should not re-use a target table from an old offloading configuration which was deleted in the meantime. Otherwise, you might run into the problem that your target table consists of data from multiple configurations with potentially different schemas.

### Careful definition of additional columns and filter predicate {#careful-definition-of-additional-columns-and-filter-predicate}

An offloading configuration allows you to specify additional columns to be offloaded as well as filter predicates for filtering the data. For both settings, you should carefully think about which data you actually need for your processing. Data being filtered out cannot be retrieved any more. Even if you adapt the filter predicate afterwards, the data which would have qualified in previous offloading executions will not be offloaded. You can, however, stop an offloading, change the configuration to include additional fields, and so on, and then restart it. When it is restarted, {{< product-c8y-iot >}} DataHub will ask you whether you want to flush existing data or append. Flushing will delete all data in the data lake so that with the next offloading execution the complete collection will be offloaded again. Note that {{< product-c8y-iot >}} DataHub can only import data that is still present in the Operational Store of {{< product-c8y-iot >}}, that means, be careful with this option and keep in mind that data retention policies in {{< product-c8y-iot >}} might have deleted old data. On the other side, data which will definitely be irrelevant for further analysis should not be included in the offloading process.

### Decomposition of complex additional columns {#decomposition-of-complex-additional-columns}

You may have stored complex data using JSON fragments as an additional column in a {{< product-c8y-iot >}} collection. As described in [Configuring offloading jobs](/datahub/working-with-datahub/#configuring-offloading-jobs), you can add additional columns so that they are included in the offloading process. Within these additional columns, you can apply functions to decompose the fragments into flat data.

Writing these functions is often an iterative process that requires multiple adaptations of the underlying logic. Leverage the Dremio SQL editor and define a dummy offloading configuration which moves a small portion of the data into the data lake for testing purposes. You can use the filter predicate to retrieve such a portion of the data; see below for time filter examples. Then you can open the table created by the offloading configuration with Dremio; using Dremio's SQL editor, you can develop the extraction logic. When your decomposition logic for your additional columns is complete, you can copy the column transformations and use them to define a corresponding offloading configuration in {{< product-c8y-iot >}} DataHub. Once that is done, the dummy offloading pipeline can be deleted.

### Examples for additional filter predicates {#examples-for-additional-filter-predicates}

When defining an offloading configuration, you can define an additional filter predicate to filter out unwanted entries in the offloading process.

#### Examples for time filters {#examples-for-time-filters}

Depending on the collection, you can use different time filters. All collections support `creationTime` which represents the timestamp when the entity was persisted by the platform (UTC timezone). Mutable entities (alarms, events, inventory) also support `lastUpdated` which is the timestamp when the entity was last changed (UTC timezone). `time` is the application timestamp written by the client; it is supported in alarms, events, and measurements.

{{< c8y-admon-caution >}}
Dremio offers functions like CURRENT_TIME() to determine the current time or date the system has when executing the query. You should try to avoid filter logic depending on such dynamic data as the offloading results are inherently non-deterministic.
{{< /c8y-admon-caution >}}

The below time filters are examples only; you can use much more complex or simpler combinations with a mixture of AND/OR-connected conditions.

**Alarms/events**
To offload all alarms or events which have the application time set to between 2020-02-08 14:00:00.000 and 2020-02-08 15:00:00.000, use:

```
src."time"."date" >= {ts '2020-02-08 14:00:00.000'} AND
src."time"."date" <= {ts '2020-02-08 15:00:00.000'}
```
To offload all alarms or events which were persisted after 2020-02-08 15:00:00.000, use:

```
src."creationTime"."date" > {ts '2020-02-08 15:00:00.000'}
```
Restricting the offloading to alarms and events last modified before 2020-02-08 14:00:00.000, use:
```
src."lastUpdated"."date" < {ts '2020-02-08 14:00:00.000'}
```
**Inventory**
To offload all data which was persisted between 2020-02-08 14:00:00.000 and 2020-02-08 15:00:00.000, use:
```
src."creationTime"."date" >= {ts '2020-02-08 14:00:00.000'} AND
src."creationTime"."date" <= {ts '2020-02-08 15:00:00.000'}
```
or, to offload all data that was last updated after 2020-02-08 14:00:00.000, use:
```
src."lastUpdated"."date" > {ts '2020-02-08 14:00:00.000'}
```

**Measurements**
To offload all data with application time between 2020-02-08 14:00:00.000 and 2020-02-08 15:00:00.000, use:
```
src."time"."date" >= {ts '2020-02-08 14:00:00.000'} AND
src."time"."date" <= {ts '2020-02-08 15:00:00.000'}
```
or, to offload all data received by the platform after 2020-02-08 14:00:00.000, use:
```
src."creationTime"."date" > {ts '2020-02-08 14:00:00.000'}
```

#### Examples for alarms filters {#examples-for-alarms-filters}
To filter by current critical alarms, use:
```
status != 'CLEARED' AND severity = 'CRITICAL'
```

#### Examples for events filters {#examples-for-events-filters}
To filter by position, provided the field c8y_Position exists, use:
```
src.c8y_Position.lat > 49.8146 AND src.c8y_Position.lat > 8.6372
```

To filter by text, use:
```
text LIKE '%Location updated%'
```

#### Examples for inventory filters {#examples-for-inventory-filters}
To limit devices to a specific firmware version, provided the field c8y_Firmware exists, use:
```
src.c8y_Firmware.version='v1.32'
```

To limit the offloaded inventory objects to devices, use:
```
convert_from(convert_to("_fragments", 'JSON'), 'UTF8') LIKE '%"c8y_IsDevice"%'
```

### Querying additional data with {{< product-c8y-iot >}} DataHub {#querying-additional-data-with-datahub}
Main use case of {{< product-c8y-iot >}} DataHub is to offload data from the internal {{< product-c8y-iot >}} database to a data lake and query the data lake contents afterwards. In some use cases, {{< product-c8y-iot >}} DataHub is required to query additional data which is not kept in the {{< product-c8y-iot >}} platform. For a cloud environment, the
additional data must be provided as Parquet files and must be located in the data lake as configured in the initial configuration of {{< product-c8y-iot >}} DataHub. The Parquet files must not be stored in folders that are used as targets for offloadings as this could corrupt offloading pipelines of {{< product-c8y-iot >}} DataHub (if the schema doesn't match with the schema of the Parquet files created via offloading jobs). In addition, the Parquet files must be compliant with the [Dremio limitations for Parquet files](https://docs.dremio.com/current/sonar/query-manage/data-formats/parquet-files).

For a dedicated environment, the additional data can be located somewhere else, provided it can be accessed via Dremio, for example, in a relational database. For performance and cost reasons, however, data and processing should always be co-located.

If you want to combine your offloaded IoT data with the new, additional data, you can define a join query in Dremio and store the query as a view. The view can then be queried like any other table in Dremio and provides the combined data.

### Modifying data in the data lake {#modifying-data-in-the-data-lake}
{{< product-c8y-iot >}} DataHub offloads IoT data into a data lake. Within this process, the original data is transformed into a relational format and finally stored in files, using the Apache Parquet format. Each offloading configuration has a unique folder in the data lake, which is referred to as target table. The files in that folder are organized in a folder hierarchy based on temporal information. In order to ensure an efficient and in particular correct querying of the data, the files in the data lake must not be modified.

In rare cases, however, the modification of the files is required. You might either want to drop old data or delete one or more columns. First step is to stop and delete the offloading configuration associated with this target table. Next, you can either externally rewrite the data or use Dremio's [CTAS query](https://docs.dremio.com/current/reference/sql/commands/tables/) feature to query the data from this target table, filter obsolete data, and use projections to skip unwanted columns. The query results must be written to a new folder of the data lake. To make the folder accessible as a table in Dremio, promote the folder to a dataset. Then, you can delete the old folder from the data lake. Next, you must define a new offloading configuration which uses the new folder name as target table name. Define the same filter criteria and columns as in the CTAS query to ensure that the data has the same format. Save the offloading configuration, select the append mode for storing the data, and activate the offloading.

It must be emphasized that this use case is not officially supported by {{< product-c8y-iot >}} DataHub. While there is nothing wrong in particular with rewriting data (or importing legacy data this way), there is a high risk that the manually created files are not compliant to the required table schema and thus offloading additional data to the target table would not work, that means, the corresponding offloading pipeline would be broken. In particular, one must be careful to use the correct data type (`TIMESTAMPMILLIS`) for all timestamp columns (`time`, `timeWithOffset`, `creationTime`, `creationTimeWithOffset`).
