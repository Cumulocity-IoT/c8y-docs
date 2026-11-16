---
weight: 30
title: Configuring offloading jobs
layout: redirect
helpcontent:
  - label: configuring-offloading-jobs
    title: Configuring offloading jobs
    content: "Offloading refers to moving data from a **Cumulocity base collection** to a data lake. The document-based entities of the base collection are transformed into a relational format by flattening the entries and mapping them to relational rows. The mapping automatically extracts a standard set of attributes from each entity and transforms them into columns in the data lake table. Contents of measurement fragments and non-standard fields can be offloaded as well. As a result of these extraction and transformation steps, the flattened data is stored in Parquet files in the data lake.


    For each **offloading pipeline**, a **target table** is created in Dremio that points to the corresponding data folders in the data lake. These target tables are used to run queries with Dremio against the offloaded data. Each active pipeline is executed in a periodic manner and offloads newly arrived data from the base collection to the data lake.


    Click **Offload collection** to create a new offloading configuration. Click **Export** to export all configurations to a file and **Import** to import configurations from a file. The offloading list comprises all configured pipelines with options to activate/deactivate, edit, or delete a pipeline. If the pipeline has already been executed, details of the corresponding last run like status, runtime, and number of offloaded records are provided."
---

The following steps describe how to set up an offloading pipeline.

### Defining an offloading configuration {#defining-an-offloading-configuration}

To define an offloading configuration, click **Offload collection** to start a wizard which guides you through the main steps:

* [Select collection](#select-collection)
* [Configure target table](#configure-target-table)
* [Set additional result columns](#set-additional-result-columns)
* [Set filter predicate](#set-filter-predicate)
* [Set task details](#set-task-details)
* [Configure additional settings and complete configuration](#configure-additional-settings)

The wizard prepopulates settings for the different steps to ease the configuration process. You can modify those settings according to your needs.

#### Select collection {#select-collection}

In the dropdown box select one of the {{< product-c8y-iot >}} base collections, which are:

* alarms
* events
* inventory
* measurements

{{< c8y-admon-info >}}
You can define multiple offloading pipelines for each {{< product-c8y-iot >}} collection. As an example for multiple pipelines, you can filter the alarms collection by different criteria with each one resulting in a separate pipeline.
{{< /c8y-admon-info >}}

In [Offloading {{< product-c8y-iot >}} base collections](/datahub/working-with-datahub/#offloading-base-collections) you will find a summary of the default attributes being offloaded per base collection.

#### Configuring inventory collection {#configuring-inventory-collection}

The inventory collection stores data related to devices and managed objects. In order to confine the offloading pipeline to the data you need, there are different views defined over the collection, with each one defining a subset of all inventory entries. Select the view fitting best to your needs.

* **All devices**: This view provides all documents with device-related data, indicated by having the `c8y_isDevice` fragment set.
* **All device groups**: This view provides all documents with data related to device groups, indicated by having the `c8y_isDeviceGroup` fragment set.
* **Inventory data tagged for DataHub**: This view provides all documents that are specifically tagged for DataHub and not related to devices. Corresponding documents have the fragment `c8y_DataHubInclude` set, but not the fragments `c8y_isDevice`, `c8y_isDeviceGroup`, or `c8y_DataHubExclude`. You can utilize the fragment `c8y_DataHubInclude` in your data-generating application to configure a custom view that offloads only selected documents.
* **All data**: This view provides all documents, except for those having the fragment `c8y_DataHubExclude` set. You can utilize the fragment `c8y_DataHubExclude` in your data-generating application to configure a custom view which excludes selected documents. Using this view is not recommended. First, it includes the offloading of data typically not required in your application, and second, the schema detection may suffer from the heterogeneity of the data.
* **All remaining inventory entries**: This view provides all documents, except for those having the fragments `c8y_isDevice`, `c8y_isDeviceGroup`, `c8y_DataHubInclude`, or `c8y_DataHubExclude` set. Using this view is not recommended. First, it includes the offloading of data typically not required in your application, and second, the schema detection may suffer from the heterogeneity of the data.

{{< c8y-admon-info >}}
The {{< product-c8y-iot >}} DataHub Edge version currently does not support inventory views.
{{< /c8y-admon-info >}}

Older offloading configurations not yet based on a view are still supported. They are configured to directly read from the inventory collection, without an intermittent view. When editing such an offloading, the above list contains an additional option **Raw inventory collection**, which is automatically selected. It is advisable to select one of the other views to ensure that only relevant data is offloaded.

{{< c8y-admon-info >}}
The view may be empty as no documents in the inventory collection qualify for the view definition. Then the offloading configuration cannot be completed as no schema can be derived.
{{< /c8y-admon-info >}}

#### Configure measurements collection {#configure-measurement-collection}

Measurements in the **measurements** base collection may have different types. For example, the collection may contain temperature, humidity, and pressure measurements. As the resulting table in the data lake must only contain measurements of one specific type, you must additionally specify the **measurement type** to which the offloaded measurements are restricted. To identify existing measurement types, {{< product-c8y-iot >}} DataHub automatically inspects a subset of the data, including initial as well as latest data. In the measurement type dropdown field, these auto-detected types are listed. If a specific type you are looking for has not been detected, you can manually enter it in this field. Alternatively, you can click **Refresh** next to the dropdown field to manually re-trigger the detection of measurement types. As this might be a performance-intensive process, you should trigger it only if you know that the expected measurement type is present in data recently inserted into the collection. You can trigger such a refresh only every five minutes for performance reasons.  

Click **Next** to proceed with the next configuration step. Click **Cancel** to cancel the offloading configuration.

#### Configure target table {#configure-target-table}

Once you have selected a collection for offloading, you must specify the target table in the data lake. The **Target table name** denotes the folder name in the data lake. In this folder, which will be automatically created, the offloaded data will be stored. In Dremio a table is created with the same name, pointing to this data lake folder. This table is used when querying the corresponding data lake folder and thus the offloaded data. The target table name must follow these syntax rules:

* It must start with an alphanumeric character (letters and numbers).
* It may contain alphanumeric characters, underscores (_) and dashes (-).
* Each underscore or dash must be preceded by an alphanumeric character.
* The name must be at least two characters long.

Each pipeline must have its own target table in the data lake. Thus, you must select distinct target table names for each offloading configuration.

For each base collection, a default set of data fields is derived. This set defines the default schema of the target table with the columns capturing the data fields. The set is fix for each collection, including the views of the inventory collection, and cannot be modified. Select **Show default schema** to show the columns of the default schema with their corresponding name and type.

Click **Next** to proceed with the next configuration step. Click **Finish** to jump directly to the final step. Both steps will fail if the associated base collection is empty, as it prevents necessary schema investigations. In such a case you must ensure that the base collection is not empty before you can proceed with the offloading configuration. Click **Previous** to go back one configuration step. Click **Cancel** to cancel the offloading configuration wizard.

#### Set additional result columns {#set-additional-result-columns}

Each base collection has a set of default columns, which are always offloaded. If you have fed data into {{< product-c8y-iot >}} with additional top-level fields, you can include them as well in the offloading process by setting them as additional result columns. You can also use additional result columns to offload data fields in the base collection which are not part of the default schema. Additionally, if columns are not yet present in the data or have not been auto-detected, you can add them to the collection schema used by Dremio. See also [Mapping document data to relational data](#mapping-document-data-to-relational-data) for the relationship between data in the operational store and columns in a data lake table.

While default columns are per default selected for the offloading process, the selection of additional result columns is optional. If selected, the corresponding values in the documents of the operational store are offloaded into the associated column in the data lake.

**Auto-detected columns**

To ease the configuration process, {{< product-c8y-iot >}} DataHub auto-detects additional result columns. Using a sample of the base collection, {{< product-c8y-iot >}} DataHub searches for additional top-level fields and provides them as additional result columns. For the specific case of the inventory collection, a sample of the selected view is used to derive the additional columns. Therefore they can vary with the view being selected. As the auto-detection logic relies on a sample, not all additional top-level fields present in the data might be captured.

**Overview of additional result columns**

When entering the configuration step for additional result columns, all columns and their properties are shown in a table. You can use the filter controls to filter for columns by name or column type. Click the expand icon <i class="dlt-c8y-icon-expand-arrow text-muted icon-20"></i> to get further details for a column. In the context menu of a column you find actions for editing, duplicating, or deleting the column. The column name can also be edited inline by clicking into the name field, adapting the name, and clicking once outside the field. If you enter the additional result columns step for an active offloading pipeline, you cannot modify the columns.

Each additional result column has the following properties:

- **Selected**: With this checkbox, you define whether the column is included in the offloading pipeline or not.
- **Column name**: The column name is the name the column will have in the target table. The column name must be unique, non-empty, and contain at least one non-whitespace character.
- **Column type**: The column type denotes whether the column is missing, has been auto-detected, manually added by the user, or derived from another column.
- **Source definition**: The source definition is the actual SQL expression, which defines what the data in this column looks like.
- **Data type**: The data type defines which kind of data the column contains, for example, DOUBLE for double values or VARCHAR for strings. When expanding an additional column by clicking the expand icon <i class="dlt-c8y-icon-expand-arrow text-muted icon-20"></i>, sample data of the column is shown. Additionally, the complete data type definition for complex types like LIST or STRUCT is shown.

**Add a missing column**

Click **Collection column** to add a column not yet present in the schema Dremio associates with the collection. In the upcoming dialog you need to specify the name of the columnn as well as its type. The name must be unique. When the name shall contain special characters like spaces or quotes, you need to escape it with double quotes, for example "Column with spaces". Select a type from the type dropdown. For the complex types LIST and STRUCT, you need to specify the structure, for example STRUCT(NestedColumn1 VARCHAR, NestedColumn2 BOOLEAN). Click **Confirm** to add the column to the schema or **Cancel**. If the offloading pipeline is executed, the column in the data lake table will be NULL until the data in the operational store contains the corresponding values.

{{< c8y-admon-info >}}
When you manually add a column to the schema, it will not be considered by the schema learning periodically executed by Dremio. Thus, if the type evolves, these changes will not be captured. For example, the column is defined as STRUCT(NestedColumn1 VARCHAR, NestedColumn2 BOOLEAN). Over time, the data contains a new substructure NestedColumn3 of type INTEGER. Then the column will still be defined as STRUCT(NestedColumn1 VARCHAR, NestedColumn2 BOOLEAN). To capture this change, you need to manually adapt the type definition.
{{< /c8y-admon-info >}}

**Add a derived column**

Click **Derived Column** to add a derived column, which opens a dialog box for defining the column. You must define a unique column name as well as a source definition. Regarding the source definition, the first step is to specify a field from the base collection in the source definition editor. Then you can optionally apply SQL functions to adapt the data of this field to your needs, for example, by trimming whitespace or rounding decimal values. The source definition editor supports you in this process with content completion and syntax highlighting. The **Change data type** controls helps you to define a function which changes the data type of the source definition. For example, the source definition is of type VARCHAR and corresponding values are always either true or false. Then you can select BOOLEAN in the **Change data type** dropdown box to define a function which casts the VARCHAR values to BOOLEAN. Different target data types are available in the control, with some of them having options for dealing with non-matching values. For example, if you want to cast all values to type INTEGER and the non-matching literal N/A is processed, you can configure the casting function to use value 0 instead. If you have selected a target data type, click **Apply** to apply or **Cancel** to revert that type change. Note that functions you can apply to the source definition are not limited to the data type change functions provided under **Change data type**. In the source definition editor you can apply all SQL functions supported by Dremio, as listed under [SQL Function Categories](https://docs.dremio.com/current/reference/sql/sql-functions/).

If you want to derive columns from nested content, you can specify the nested fields using the prefix "src." and the path to the nested field. For example, if you have a top-level field "someField" with a nested field "someSubField", add "src.someField.someSubField" as additional result column. In the same way you can access nested arrays. If you have a top-level field "someField" with a nested array field "someArraySubField", add "src.someField.someArraySubField[0]" as additional result column to access the first array entry.

To validate the source definition and preview its results click **Load samples**. The system retrieves data of the associated collection, per default from the last 24 hours, and evaluates the source definition against that data. Results being **NULL** are filtered out. The maximum number of results is limited to 100. You can adjust the timeframe from which data is sampled using the time controls at the right top. The timeframe covers at maximum the last seven days. To search for specific sample values, filter the current list of sample results with the filter controls at the top. The type of the sample results depends on the source data and the source definition. For complex types like **STRUCT** browse through the nested content of a sample entry by clicking at the nodes within the entry. If you want to set the source definition to a specific path of an entry, navigate to that path and click the hand icon right next to the path. You can also copy the path using the copy icon next to the path. Once you modify the source definition, the current sample results typically do not match anymore. Click **Reload** to retrieve a list of sample results with respect to the new source definition.

Click **Save** to add the column, which will be selected for offloading by default. If the source definition is invalid, for example when accessing an unknown column, you get an error message like *Column "UnknownColumn" not found in any table*. You must fix the source definition before you can proceed. Click **Cancel** to cancel the configuration.

**Edit an additional result column**

In the context menu of an additional result column, select **Edit** to open the dialog for editing the column. Adapt the settings according to your needs. Click **Save** to update the column with the new settings or **Cancel**.

For auto-detected columns the source definition cannot be modified. If you want to modify the source definition, you must duplicate the auto-detected column and modify the source definition as required.

**Duplicate an additional result column**

In the context menu of an additional result column, select **Duplicate** to open the dialog for duplicating the column. The source definition of the duplicate column is the same as of the original column and can be adapted to your needs. The new column name initially uses the original column name plus a counter suffix to make the name unique. You can change the name as required. You can also rename the original column. New as well as original column name must be unique.

Click **Save** to complete or **Cancel**.

A common use-case for duplication is to change the data type of an auto-detected column. For example, duplicate the column "statusOrdinal" and apply the corresponding casting function in the source definition editor. Use as new column name "statusOrdinal" and rename the original column to "statusOrdinal_Old". In the additional columns list select "statusOrdinal" and deselect "statusOrdinal_Old".

**Delete an additional result column**

In the context menu of an additional result column, select **Delete** to open the dialog for deleting the column. Click **Confirm** to proceed or **Cancel** to cancel the deletion. Auto-detected columns cannot be deleted.

When deleting an additional result column, the data will no longer be included in the next offloading run. Data which has already been offloaded to the data lake is not affected by the deletion of the column. Thus, the column itself will still be present in the data lake, but will have value NULL once the additional result column has been deleted.

Click **Next** to proceed with the next configuration step. Click **Previous** to go back one configuration step. Click **Cancel** to cancel the offloading configuration.

#### Set filter predicate {#set-filter-predicate}

Optionally you can define a filter predicate. Per default, all entries in the base collection are offloaded to the data lake; you can use the predicate to filter out entries you do not want to persist in the data lake. For example, you can filter out invalid values or outliers. In the **Additional filter predicate** field, you can specify such a filter in SQL syntax. For example, for the alarms collection the filter might be `status='ACTIVE' AND severity='WARNING'` to only persist active alarms with a severe warning. The filter predicate functionality supports complex SQL statements, that is, a combination of `AND/OR`, clauses like `IN(...)` / `NOT IN(...)`, and functions such as `REGEXP_LIKE(text, 'MyText\S+')`.

In the filter predicate you can query all standard attributes of the base collection as well as the custom fields. The additional result columns defined in the previous configuration step cannot be accessed by their name in the filter predicate. You must use the source definition as defined in the corresponding column instead.

{{< c8y-admon-info >}}
For querying the attribute `id`, you must use `_id`. For examples on querying different attributes and guidelines for filters, see also [{{< product-c8y-iot >}} DataHub best practices](/datahub/working-with-datahub/#datahub-best-practices).
{{< /c8y-admon-info >}}

When defining an additional filter predicate, you can click **Validate** to validate your predicate. If the validation fails, you will get an error description. You must fix these errors before you can proceed.

Click **Next** to proceed with the next configuration step. Click **Previous** to go back one configuration step. Click **Cancel** to cancel the offloading configuration.

#### Set task details {#set-task-details}

The task configuration step includes the offloading task name and the description. The **Offloading task name** is an identifier for the offloading pipeline. It must have at minimum one non-whitespace character and must not contain HTML tokens like backticks or ampersand. Even though the task name does not have to be unique, it is advisable to use a unique name.

In the **Description** field, you can add a description for this offloading pipeline. The description is optional, but we recommend you to use it, as it provides additional information about the pipeline and its purpose.

Click **Next** to proceed with the next configuration step. Click **Previous** to go back one configuration step. Click **Cancel** to cancel the offloading configuration.

#### Configure additional settings and complete configuration {#configure-additional-settings}

The final step provides a summary of your settings, the configuration of additional settings, and a result preview. The summary includes the settings from the previous steps as well as the internal UUID of this configuration. The UUID is generated by the system and cannot be modified. With the UUID you can distinguish configurations having the same task name, for example, when browsing the audit log or the offloading status. In the summary, you also get the schedule with which the offloading pipeline will be executed once it is started, for example, "every hour at minute 6". With the **Inactive**/**Active** toggle at the end of the summary you select whether the periodic offloading execution should be activated upon save or not.  

In the offloading preview you can inspect how the actual data will be stored in the data lake. For this purpose, an offloading preview is executed, returning a sample of the resulting data. The header row of the sample data incorporates the column name as well as the column type. Use **Hide time columns** to either show the default columns with a temporal notion or not. Note that the preview does not persist data to the data lake.

**Offloading frequency**

Per default each active offloading pipeline is executed once an hour, at the same minute. You can adapt the offloading frequency by setting in the dropdown box the hours per day at which the offloading will to be executed. As with the default setting, the exact minute of the hour for the execution is selected by the system. The hours are defined with respect to UTC as timezone. You must select at least one hour; otherwise the configuration cannot be saved.

**Compaction strategy**

In the additional settings, you can define the compaction strategy for the offloading pipeline. The compaction strategy refers to how {{< product-c8y-iot >}} DataHub automatically combines multiple smaller files in the data lake into one or more larger files. {{< product-c8y-iot >}} DataHub periodically executes the compaction for an offloading pipeline as a large number of small files may adversely affect the query performance. The compaction is executed once per day; the compaction schedule cannot be modified.

{{< product-c8y-iot >}} DataHub automatically sets the compaction strategy, but allows you to optionally change the strategy. Available compaction strategies are:

- **Monthly & daily compaction:** {{< product-c8y-iot >}} DataHub selects for each day all files in the data lake which contain data from that day. These files will be combined into one or more larger files containing all data for this day. Additionally, all days for one month are combined into one or more larger files containing all data for this month. This results in summary files for each day and for each month, while the original files are deleted.
- **Daily compaction:** {{< product-c8y-iot >}} DataHub selects for each day all files in the data lake which contain data from that day. These files will be combined into one or more larger files containing all data for this day. This results in summary files for each day, while the original files are deleted.
- **No compaction:** Compaction is disabled. This setting is not recommended and must be used with caution as it has most likely negative impact on the query performance.

You can change the compaction strategy of an already running offloading pipeline by deactivating the pipeline, editing the compaction strategy, and reactivating the pipeline. If a compaction was already executed in the past, changing the compaction strategy does not revert the previous compaction results.

**View materialization**

In the additional settings, you can enable/disable view materialization for an offloading pipeline based on the alarms, events, or inventory collection. For these three collections, additional views over the target table are defined in the tenant’s space in Dremio. The *_latest* view maintains the latest status of all entities, excluding intermediate transitions of an entity. For large tables, the maintenance of the view might adversely affect overall performance. For that reason, the *_latest* view can be materialized so that the latest state of each entity will be persisted in the data lake. If that setting is activated for a pipeline, the materialized view will be created with the next offloading run and updated for each subsequent run. If you deactivate the setting for a pipeline, the view is still available, but no more materialized.

{{< c8y-admon-info >}}
When view materialization is activated, additional data is stored in the data lake, which might affect your storage costs.
{{< /c8y-admon-info >}}

**Duplicate column names**

Another setting, which applies only for the measurements collection, is the handling of duplicate column names. During offloading, measurement values are transformed into a relational format. Corresponding column names of measurement values are constructed by concatenating path and unit/value. This may lead to columns having the same name except for their case. Then the entries would all be offloaded into the same column. As this may be an unwanted behaviour in the offloading process, the names can be sanitized. When activated, for each generated column name, which would be equal to another column name in terms of case-insensitivity, a new column will be created, whose name includes the originally derived name plus a unique suffix.

The following two example documents from two different offloading runs would be processed as follows.

First document:
````json
{
    "id": "4711",
    ...
    "time": {
      "date": "2020-03-19T00:00:00.000Z",
      "offset": 0
    },
    "type": "c8y_Temperature",
    "_seriesValueFragments": [{
      "unit": "C",
      "value": 17.3,
      "path": "c8y_TemperatureMeasurement.T"
    }]
}
````

Second document:
````json
{
    "id": "4711",
    ...
    "time": {
      "date": "2020-03-20T00:00:00.000Z",
      "offset": 0
    },
    "type": "c8y_Temperature",
    "_seriesValueFragments": [{
      "unit": "C",
      "value": "NaN",
      "path": "c8y_temperaturemeasurement.T"
    }]
}
````

The two paths `c8y_TemperatureMeasurement.T` and `c8y_temperaturemeasurement.T` are equal in terms of case-insensitivity. Without name sanitization, only the column `c8y_TemperatureMeasurement.T.unit` will be created, which stores all unit entries. Analogously, one column `c8y_TemperatureMeasurement.T.value` will be created, which stores all value entries. In the latter case, the column would have a mixed type of DOUBLE and VARCHAR, which Dremio would then coerce to type VARCHAR for the column.

The first time an offloading run processes multiple fragments with the corresponding column names being equal with respect to case-insensitivity, the sanitization also generates distinct column names, with each name having a unique suffix.

This handling of duplicate column names does not apply when the time series data model is used. This model does not support separating incoming names which differ in case. All of them will go to the same data lake column in the offloading process. The case of the column name is determined by the first occurrence that was encountered.

##### Raising alarms {#raising-alarms}

Offloading as well as compaction runs may fail due to various reasons such as network issues and timeouts. As described in [History per offloading pipeline](/datahub/working-with-datahub/#history-per-offloading-job) and [History of compactions per offloading pipeline](/datahub/working-with-datahub/#history-compaction-per-offloading-job), the offloading and compaction job histories provide details for successful and failed runs. Additionally, an alarm can be raised within the {{< product-c8y-iot >}} platform in case of a failure.

Under **Create alarm on** you can activate raising alarms for offloading as well as compaction failures. Per default, the setting is activated for offloading and deactivated for compaction failures. When activated and an offloading run fails, an alarm is raised. If the offloading fails multiple times in a row, the associated alarm is updated with each new failure. The more successive runs fail, the higher the severity of the alarm will be, ranging from warning up to critical. Each alarm comprises information which offloading pipeline has failed and how often it has failed in a row. The same applies to alarms being raised for compaction failures. The type of an alarm is named *CDH_offloading_* or *CDH_compaction_* respectively, followed by the UUID of the offloading pipeline. Such an alarm is available in the {{< product-c8y-iot >}} [Device Management application](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms).

The alarm will be active until it is cleared. The latter is the case when either an offloading run completes successfully, or the offloading configuration is deleted. Then, the active alarm is cleared, no matter if the alarms setting is activated or not. The alarm remains active if the offloading is unscheduled or raising alarms is deactivated. Again, the same applies to alarms being raised for compaction failures.

##### Raising events on completion {#raising-events}

The sections [History per offloading pipeline](/datahub/working-with-datahub/#history-per-offloading-job) and [History of compactions per offloading pipeline](/datahub/working-with-datahub/#history-compaction-per-offloading-job) describe the offloading and compaction job history respectively, both providing details for successful and failed runs. Additionally, an event can be raised within the {{< product-c8y-iot >}} platform when an offloading or compaction job has completed, either with success or failure. Under **Create events on** you can activate raising events for completed offloading and compaction runs. When activated and an offloading or compaction run is completed, a new event with execution details is raised. Per default, the setting is deactivated in order to prevent sending events unnecessarily.

The event is available in the {{< product-c8y-iot >}} [Device Management application](/device-management-application/monitoring-and-controlling-devices/#to-view-events). Each event comprises the standard event properties like time and type. The latter is named *CDH_offloading_* or *CDH_compaction_* respectively, followed by the UUID of the offloading pipeline. Additionally, each event comprises the name, ID, execution ID, and status of the associated offloading or compaction job. The status provides details of the offloading run like start and end time, failure/success, number of offloaded records.

The option to send and receive such events allows you to act upon completion of an offloading run. Given the event type of the offloading you are interested in, for example CDH_offloading_92622259-c78b-408e-95e2-30944de2cc95, you can use the [Events REST API](http://cumulocity.com/api/core/#tag/Events) to retrieve associated events for that offloading pipeline. Alternatively, you can use the [Event notification API](https://cumulocity.com/api/core/#tag/Event-notification-API).

##### Dealing with mixed types {#mixed-types}

Each offloading pipeline must ensure that the columns of the result table in the data lake have a unique data type each. A mixed type situation occurs if an offloading run detects a data type not matching the expected column data type. For example, the type of a column is INTEGER. Then, the offloading processes the literal N/A, which is of type VARCHAR. To resolve such a mixed type constellation, you can either use the **Automatically evolve schema** or the **Stop pipeline** strategy.

**Automatically evolve schema**: This is the default strategy. The system automatically evolves the schema by introducing a new column for the data with a new type. The name of that column is built by combining the original column name, the literal *_CDH_*, and the new data type. For example, such a column is named *ValvePressure_CDH_DOUBLE* if the new type is *DOUBLE*. Each new value will from now on be stored in the new column, having the new type. It is no more stored in the original column, where it will be *NULL* instead. In the job history of the pipeline the job having detected the mixed type is marked as successful.

**Stop pipeline**: The system stops the pipeline in order to allow for corrective actions like modifying the data or adapting the additional result columns. After those corrections you must manually re-activate the pipeline. In the job history of the pipeline the job having detected the mixed type is marked as erroneous.

When a mixed type constellation has been detected, an alarm will be additionally raised in the {{< product-c8y-iot >}} platform with further details like involved column and types. When schema evolution is selected, an alarm is raised having type *CDH_schemaEvolved_* plus offloading UUID and alarm type WARNING. When pipeline stop is selected, an alarm is raised having type *CDH_pipelineStopped_* plus offloading UUID and alarm type CRITICAL. Such an alarm is always raised, independent of the configuration for raising alarms as described in the previous section. The alarm must be manually cleared. It is only automatically cleared if the offloading pipeline is deleted.

For more details on data modeling and mixed types see also [Aligning data modeling and offloading](/datahub/working-with-datahub/#aligning-data-modeling-and-offloading).

**Completing the offloading configuration**

Finally, click **Save** to save the offloading pipeline. Otherwise click **Cancel** to cancel the offloading configuration. You can also navigate back to adapt previous settings, using the **Previous** buttons.
