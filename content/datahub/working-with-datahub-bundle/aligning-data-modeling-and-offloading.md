---
weight: 20
title: Aligning data modeling and offloading
layout: redirect
---

### Mapping document data to relational data {#mapping-document-data-to-relational-data}

{{< product-c8y-iot >}} DataHub allows to offload data from the {{< product-c8y-iot >}} platform into a data lake and the subsequent analysis of the offloaded data using SQL. The data within the {{< product-c8y-iot >}} platform is stored in a document-based format in an operational database. For the offloading, {{< product-c8y-iot >}} DataHub must transform the data from the document-based format into a relational, columnar-based format. Following the [domain model of {{< product-c8y-iot >}}](/concepts/domain-model), a document comprises attributes and fragments. These document structures are flattened and mapped to columns of a relational table. Using that relational format, the data is persisted as Parquet files in the data lake and can be queried like a relational table.

For that mapping from a document structure to columns of a relational table schema, the following cases apply:
* **Default columns:** For each collection in the operational database, a set of default columns, like `id` or `creationTime`, is defined, with the according attributes/fragments existing in each document. The relational schema always contains these default columns, all having a fixed type. Thus, each offloading for a collection has this set of default columns defined in its target table in the data lake.
* **Additional columns:** The documents may contain additional top-level attributes/fragments being either based on the {{< product-c8y-iot >}} domain model, like `c8y_Position`, or being custom, like `myCustomFragment`. They are also mapped to relational columns. The offloading of these columns is optional. You can select/deselect them during the offloading configuration process.
* **Missing columns:** During design time of an offloading, the data in the associated collection may not yet contain all columns you want to use in the offloading configuration. In such a case you can adapt the schema by adding a column with a corresponding type. When you have added such a collection column to the schema, you can select it in your offloading configuration.
* **Derived columns:** Given one of the above columns, you can derive a new column using the value of the original column and modifying it. For example, given a column with temperature values, you can define a new column by appending "Celcius" to each value.

See [Set additional result columns](/datahub/working-with-datahub/##set-additional-result-columns) for details on how to work with additional, missing, and derived columns.

The data in the operational store is document-based and organized within collections like alarms or measurements. The operational store does not impose a schema for a collection. However, Dremio as internal query engine of {{< product-c8y-iot >}} DataHub reads data from the collections and derives a relational schema based on the data. With new data entering the platform, the schema of the collections may also evolve. For example, a new firmware of a device introduces new data fragments in the documents. To keep track with potential schema evolutions, the system periodically inspects a sample of the documents in the operational store for new schema information. This process also includes deriving the type of the columns from the sample data.

### Managing mixed types {#managing-mixed-types}

If instances of the attribute have diverging types, then the system can apply a type coercion mechanism to resolve such a mixed type constellation. The coercion mechanism derives a single, suitable type from the diverging types. For example, INTEGER and FLOAT are coerced to FLOAT while TIMESTAMP and VARCHAR are coerced to VARCHAR. You can configure how to deal with mixed types for each offloading pipeline. By default the system automatically resolves the mixed type by evolving the schema. That schema evolution uses the type coercion to introduce a new column with the coerced type. Alternatively the system stops the pipeline to allow for corrections. [Dealing with mixed types](/datahub/working-with-datahub/#mixed-types) describes how to configure those strategies.

{{< c8y-admon-important >}}
Even though the system can resolve mixed types, it is strongly advised to avoid them as they may introduce additional adaptation effort. Take care that your data model does not mix up types and that you feed only type-consistent data into the {{< product-c8y-iot >}} platform.
{{< /c8y-admon-important >}}

### Mapping measurement fragments to relational data {#mapping-measurement-fragments-to-relational-data}

The offloading configuration mechanisms differ when dealing with series-value fragments of measurements. As additional fragments are often added dynamically, {{< product-c8y-iot >}} DataHub automatically picks up each series at runtime without the need to reconfigure the offloading pipeline.

Each series must have a mandatory `value` of type NUMBER and an optional `unit` of type STRING. If the value is not of type NUMBER, {{< product-c8y-iot >}} DataHub determines a type for each series at offloading runtime. It evaluates the runtime type of each value and derives the column type for the corresponding offloading run. If all values for a series can be cast to BOOLEAN, FLOAT, STRUCT or LIST consistently, this will be the type of the resulting column. Otherwise, DataHub will use VARCHAR. If the use case mixes types for the same series, the aforementioned mixed type handling applies.

{{< c8y-admon-info >}}
The {{< product-c8y-iot >}} platform supports the time series model, which is an internal data model for the measurements collection. For details on how to activate that model see [Enhanced time series support](/standard-tenant/enhanced-time-series-support/). {{< product-c8y-iot >}} DataHub supports that data model when offloading the measurements collection. When you switch from the default data model to the time series model, measurements offloadings still work. The switch back from the time series model to the default model is not supported. In that case the offloading cannot guarantee that all data is offloaded into the target table. To ensure completeness, re-configure the offloading to use a different target table when switching to the default data model.
{{< /c8y-admon-info >}}

### Dealing with case-sensitivity {#dealing-with-case-sensitivity}

Case-sensitivity issues arise when attributes have the same name, except for their case. For example, a device measurement has an attribute named `c8y_pressure`, while a subsequent measurement has an attribute named `C8Y_Pressure`. When offloading such data with mixed cases, the resulting table schema as well as the table contents in the data lake may not meet your expectations. 

Along the offloading workflow, different components are involved with a different handling of case-sensitivity. The operational store is configured to read the data case-sensitively, which then also applies to querying via the {{< product-c8y-iot >}} REST API. Thus, given two measurements each with an attribute named `c8y_pressure` and `C8Y_Pressure` respectively, only the document with `c8y_pressure` is returned when querying for `c8y_pressure`. Dremio and its SQL interface in turn are case-insensitive. In the offloading process, Dremio queries the operational store and derives a schema for the table in the data lake. This schema consists of default columns, additional result columns, and, for the measurements collection, columns derived from series values fragments.

#### Case-sensitivity and default column names {#case-sensitivity-and-default-column-names}
For each base collection [default columns](#offloading-the-base-collections) are defined, based on attributes in the operational store. When feeding data into the platform, the correct case for the associated attribute must be used. For example, an alarm has the attribute `status`; the corresponding value is then stored in the `status` default columm in the data lake table. When using `Status` as attribute name, not the data in the document will be offloaded, but a default value, in this case ACTIVE, will be set in the data lake.

#### Case-sensitivity and additional result column names {#case-sensitivity-and-additional-result-column-names}
In addition to the default columns, the data in the operational store may have additional top-level attributes, which can be used as additional result columns in the offloading process. If the same top-level attribute is defined with different cases in the documents, not all associated attribute values will be offloaded into the corresponding column. Dremio maintains one column in its collection metadata. For all documents whose attribute name exactly equals that column name the corresponding value will be offloaded. For documents with a different attribute name case, the value in the data lake will be set to NULL. Thus, using different cases in attribute names will cause data loss. For example, a top-level attribute in an alarm is named `owner`; Dremio uses this name in its metadata on the alarms collection. The `owner` value of all alarms is then offloaded into the `owner` column in the data lake. If an alarm has an attribute `Owner`, not the associated value will be stored in the `owner` column in the data lake, but NULL instead. You also have to take the case-sensitivity of the column name into account when adding a column missing so far.

#### Case-sensitivity and measurement column names {#case-sensitivity-and-measurements-column-names}
For the measurements collection operating in the non-time-series mode, duplicate column names can occur. Section [Configure additional settings and complete configuration](#configure-additional-settings) describes the background and how to enable a name sanitization mechanism, which generates new columns in case of duplicate names. This configuration option is only available in the legacy non-time-series mode.

#### Duplicate names in one document {#duplicate-names-in-one-document}
If two attribute names in a document only differ by case, only one of the values will be used for the offloading. For example, an alarm has an attribute `owner` as well as an attribute `Owner`. Then only one attribute value will be offloaded and the other one will be ignored.

{{< c8y-admon-important >}}
It is strongly advised to avoid feeding data into the platform which is ambiguous with respect to case-sensitivity. This problem mainly refers to the naming of attributes in documents sent to the platform. Such data might cause unexpected results in the data lake, including data loss.
{{< /c8y-admon-important >}}

#### Dealing with case-sensitivity issues {#dealing-with-case-sensitivity-issues}
The system does not raise a warning when case-sensitivity issues occur, but processes the data as described above. If your application may be prone to generating data causing case-sensitivity issues, you should regularly check your data lake contents for unexpected entries. For example, you can run a SQL query to check for unexpected NULL values in the data lake.

When a case-sensitivity issue has occurred, several steps have to be conducted. If possible, the document in the operational store having introduced the issue needs to be adapted so that the expected case is used for the attribute name. The collection schema in Dremio might need to be adapted. Also the data lake might need a cleanup, including a rerun of the offloading process for that data. Also the component generating the data should be adapted so that case-sensitivity issues do not occur anymore. Adapting the schema in Dremio and cleaning up the data lake typically require additional support.

### Guidelines {#guidelines}

When modelling your data, take the following guidelines into account:

|<div style="width:250px">Description</div>
|:---
|The data type of an attribute should be static as otherwise mixed type constellations may occur.|
|When modelling measurements and large volumes of them are likely to be generated, leverage the time series data model. When using this model, the offloading and query performance is typically better compared to the default data model.|
|When modelling measurements, you should separate the measurements by specifying measurement types. Then each measurement type can be modeled within a separate offloading pipeline, which in turn leads to a cleaner data architecture in the data lake as well as better query performance.|
|Avoid offloading lists with many entries as this leads to broad tables in the data lake.|
|Avoid having a large number of columns in the data lake as this adversely affects query performance and complicates data access in follow-up applications.|
|When defining attribute names in your data model, avoid special characters in attribute names. The attribute names are used as column names in the resulting offloading table and special characters may hinder working with those columns in follow-up applications.|
|When modelling data within arrays, ensure that the position of the values within the array is fix throughout the documents being fed into the platform. Otherwise further processing might run into problems.|

### Limitations {#limitations}

When modeling your data, you must be aware of the following limitations:

|<div style="width:250px">Description</div>
|:---
|If the collection to be offloaded has JSON attributes consisting of more than 32,000 characters, its data cannot be offloaded. One specific case where this limitation applies is the {{< product-c8y-iot >}} application builder, which stores its assets in the inventory collection when being used.|
|If the collection to be offloaded has more than 800 JSON attributes, its data cannot be offloaded. This limitation also includes nested JSON content, which will be expanded into columns during offloading. Therefore, measurements documents with more than 800 series/series value fragments are not supported.|
