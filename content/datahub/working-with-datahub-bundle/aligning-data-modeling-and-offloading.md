---
weight: 40
title: Aligning data modeling and offloading
layout: redirect
---

### Mapping document data to relational data {#mapping-document-data-to-relational-data}

{{< product-c8y-iot >}} DataHub allows to offload data from the {{< product-c8y-iot >}} platform into a data lake and the subsequent analysis of the offloaded data using SQL. For that purpose, {{< product-c8y-iot >}} DataHub must transform the data from the document-based format into a relational format, which is then persisted as Parquet files in the data lake.

When the offloading is configured, data from the documents in the operational database of the {{< product-c8y-iot >}} platform is transformed and stored in columns of the target table in the data lake. The system either automatically generates those transformations or proposes them to the user with the option to modify them. The user can also configure additional transformations. A configuration defining how a data field is transformed into a column comprises:
- The expression how to retrieve the data from the source document.
- The name of the target column.
- The type of the target column.

For built-in data attributes specified by the platform, the type is fixed and known to {{< product-c8y-iot >}} DataHub. For other attributes {{< product-c8y-iot >}} DataHub determines the type by evaluating the aforementioned expression on the data stored in the operational database. Dremio either does this based on the database state at configuration time or on metadata captured earlier. For performance reasons, the evaluation is based on a subset of data, namely the first 4095 documents of the collection. When evaluating the expression and all instances of the attributes have the same type, this type defines the column type.

### Managing mixed types {#managing-mixed-types}

If instances of the attribute have diverging types, then the system can apply a type coercion mechanism to resolve such a mixed type constellation. The coercion mechanism derives a single, suitable type from the diverging types. For example, INTEGER and FLOAT are coerced to FLOAT while TIMESTAMP and VARCHAR are coerced to VARCHAR. You can configure how to deal with mixed types for each offloading pipeline. By default the system automatically resolves the mixed type by evolving the schema. That schema evolution uses the type coercion to introduce a new column with the coerced type. Alternatively the system stops the pipeline to allow for corrections. [Dealing with mixed types](/datahub/working-with-datahub/#mixed-types) describes how to configure those strategies.

{{< c8y-admon-important >}}
Even though the system can resolve mixed types, it is strongly advised to avoid them as they may introduce additional adaptation effort. Take care that your data model does not mix up types and that you feed only type-consistent data into the {{< product-c8y-iot >}} platform.
{{< /c8y-admon-important >}}

### Mapping measurement fragments to relational data {#mapping-measurement-fragments-to-relational-data}

The offloading configuration mechanisms differ when dealing with series-value fragments of measurements. As additional fragments are often added dynamically, {{< product-c8y-iot >}} DataHub automatically picks up each series at runtime without the need to reconfigure the offloading pipeline.

Each series must have a mandatory value of type NUMBER and an optional unit of type STRING. If the value is not of type NUMBER, {{< product-c8y-iot >}} DataHub determines a type for each series at offloading runtime. It evaluates the runtime type of each value and derives the column type for the corresponding offloading run. If all values for a series can be cast to BOOLEAN, FLOAT, STRUCT or LIST consistently, this will be the type of the resulting column. Otherwise, DataHub will use VARCHAR. If the use case mixes types for the same series, the aforementioned mixed type handling applies.

{{< c8y-admon-info >}}
Since version 10.16, the {{< product-c8y-iot >}} platform supports the time series model, which is a new internal data model for the measurements collection. For details on how to activate that model see [Enhanced time series support](/enterprise-tenant/enhanced-time-series-support/). {{< product-c8y-iot >}} DataHub supports that data model when offloading the measurements collection. However, the specific case of measurements offloading in the TrendMiner mode is not supported when the time series model is used. When you switch from the default data model to the time series model, measurements offloadings still work. The switch back from the time series model to the default model is not supported. In that case the offloading cannot guarantee that all data is offloaded into the target table. To ensure completeness, re-configure the offloading to use a different target table when switching to the default data model.
{{< /c8y-admon-info >}}

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
|If two attribute names in a document only differ by case, only one of the values will be used.|
|If the collection to be offloaded has JSON attributes consisting of more than 32,000 characters, its data cannot be offloaded. One specific case where this limitation applies is the {{< product-c8y-iot >}} application builder, which stores its assets in the inventory collection when being used.|
|If the collection to be offloaded has more than 800 JSON attributes, its data cannot be offloaded. This limitation also includes nested JSON content, which will be expanded into columns during offloading. Therefore, measurements documents with more than 800 series/series value fragments are not supported.|
