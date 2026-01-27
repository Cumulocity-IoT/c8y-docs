---
weight: 50
title: Managing offloading jobs
layout: redirect
---

The following steps describe how to start and manage an offloading pipeline.

### Scheduling an offloading job {#scheduling-an-offloading-job}

Once you have defined an offloading configuration and saved it, you can start the offloading pipeline.

##### Starting periodic offloading {#starting-periodic-offloading}

Click the **Active** toggle in an offloading configuration to activate the periodic execution of the offloading pipeline, if it was not already activated when configuring the pipeline. The scheduler component of {{< product-c8y-iot >}} DataHub will then periodically trigger the pipeline.

The initial offload denotes the first execution of an offloading pipeline. While subsequent executions only offload data increments, the initial offload moves all collection data from the Operational Store of {{< product-c8y-iot >}} to the data lake. Thus, the initial offload may need to deal with vast amounts of data. For this reason, the initial offload does not process one big data set, but instead partitions the data into batches and processes the batches. If the initial offload fails, for example due to a data lake outage, the next offload checks which batches were already completed and continues with those not yet completed.

If the same pipeline has already been started and stopped in the past, a new start of the pipeline opens a dialog asking you whether you want to flush the existing data or append the data to the existing data. The latter option offloads only data that has been added after the last execution. The first option flushes the data lake. Then the next execution will offload the complete collection.

{{< c8y-admon-caution >}}
The option to flush already offloaded data in the data lake should be used with caution as data deleted in the data lake cannot be recovered.
{{< /c8y-admon-caution >}}

Before restarting the periodic offloading, you may have changed the result schema by adding or removing columns (via adding or removing additional result columns). When you restart the pipeline, existing data in the data lake is not modified, but the new data being offloaded incorporates the new schema. When querying such a data set comprising different schemas, the system computes a merged schema and (virtually) fills it up with null values where fields have not yet been provided. This usually works without problems if additional attributes are included or removed from the offloading configuration. However, schema merging might fail or lead to unexpected behavior in certain cases. One example is if you change data types, for example, if the old configuration contained "myCustomField1" as a string and you change it to a number via "CAST(myCustomField1 AS Integer) AS myCustomField1". Therefore you should take care that the data you offload is consistent.

A previous offloading pipeline may have already written into the same target table, that is, the data is stored in the same folder on the data lake. In this case, when starting the new offloading pipeline, you are asked whether you want to flush the existing data or append the data to the existing data. You should only append the data if old and new data share the same schema. Otherwise, you might end up with a table consisting of disparate data, which hinders meaningful analysis. If the new data differs from the old data, you should use a new target table. Alternatively, you can flush the existing table if its old content is not needed anymore. Again, you should be careful when flushing a table as the data most likely cannot be recovered.

##### Scheduling settings {#scheduling-settings}

The scheduler is configured per default to run the offloading pipeline once an hour. The precise minute of the hour at which the offloading starts is assigned by the system to balance the load on the Operational Store of {{< product-c8y-iot >}}, that is, to avoid that all offloading jobs from different tenants run at the same time.

##### Stopping periodic offloading {#stopping-periodic-offloading}

Use the **Active** toggle in an offloading configuration to stop the periodic offloading. Then the scheduler stops scheduling new jobs; currently running jobs will complete.

### Managing an offloading pipeline {#managing-an-offloading-pipeline}

In the context menu of each offloading pipeline, you will find actions for managing and monitoring the pipeline.

##### Editing/showing an offloading pipeline {#editingshowing-an-offloading-pipeline}

Click **Edit** to edit the current settings. Only inactive pipelines can be edited. Note that you cannot change the {{< product-c8y-iot >}} base collection selected for this pipeline. Additional filter predicates and additional result columns can be changed. 

In case of an inventory offloading, the view can be changed as well, which will also result in different additional result columns being auto-detected. If you change a view and you have selected additional columns beforehand, you can either keep those selected columns or discard them. In case you keep a selected column and it is not among the auto-detected columns of the new view, the offloading configuration cannot be completed as that column is unknown for this view.

Note that these changes are not applied to already exported data. A change to the offloading pipeline only affects data to be exported in upcoming offloading runs.

For active pipelines, click **Show** to browse through the configuration. You cannot edit the settings.

##### Copying an offloading pipeline {#copying-an-offloading-pipeline}

Click **Copy** to copy the current configuration. The new configuration is an identical copy of the selected configuration except for the task name and the target table, both of which will have a unique suffix appended. You can change the settings according to your needs.

##### Deleting an offloading pipeline {#deleting-an-offloading-pipeline}

Click **Delete** to delete a configuration. Only inactive pipelines can be deleted. Data in the data lake which has already been exported by this offloading pipeline is not deleted. To delete the actual data in your data lake, you must use the tooling offered by the data lake provider such as AWS S3 Console or Azure Storage Explorer.

##### Triggering a manual offloading job {#triggering-a-manual-offloading-job}

If the periodic offloading is enabled, you can also manually trigger an offloading job between two scheduled executions. For example, you might not want to wait for the next scheduled execution to offload recent data into the data lake. Click **Offload now** to trigger a manual offloading. As with periodic offloading, a manual offloading execution processes only incremental data that has been added since the last offloading execution (independent of whether this last execution was triggered manually or by the scheduler).

However, we recommend you to rely on the periodic offloading instead of triggering it manually.

##### Monitoring an offloading pipeline {#monitoring-an-offloading-pipeline}

Click **Show offloading history** to examine the execution history of a pipeline. See [Monitoring offloading jobs](/datahub/working-with-datahub/#monitoring-offloading-jobs) for details.


### Importing/exporting offloading configurations {#importingexporting-offloading-configurations}

The import/export functionality allows you to backup your offloading configurations to a file. You can use the backup when editing the data lake settings or to copy offloading configurations from one {{< product-c8y-iot >}} DataHub instance to another. Import/export solely includes the configuration of a pipeline; it includes neither the runtime status of a pipeline nor already exported data.

##### Export of offloading configurations {#export-of-offloading-configurations}

The action bar provides an **Export** button, which exports all offloading configurations. The button is disabled if no offloading configurations are defined. If you click **Export**, all offloading configurations are exported into a file. The file is located in the local download folder used by your browser.

{{< c8y-admon-caution >}}
You must not modify the contents of the export file as this might corrupt the import step.
{{< /c8y-admon-caution >}}

##### Import of offloading configurations {#import-of-offloading-configurations}

The action bar provides an **Import** button, which imports offloading configurations from a file with previously exported configurations.

Click **Import** to open the import dialog. Either drop the file in the import canvas or click into the canvas to browse your file system to select the import file. Once the file is selected, a table with all configurations in the file is shown. For each entry, the table lists the task name, the internal ID of the original configuration, the target table name, and the description. The **Status** column indicates whether an offloading configuration can be imported. If it is green, the configuration is valid and can be imported. If it is yellow, the configuration can be imported, but some of its settings are ignored as they are not supported by the tenant. If it is red, the configuration duplicates an existing configuration and therefore cannot be imported. It is a duplicate if an existing configuration has the same target table name or the same internal ID. The **Import** column provides checkboxes to select the configurations which are to be imported.

To import the selected configurations, click **Import**. Click **Cancel** to cancel the import process.

As the export does not include whether a configuration was active, you must manually activate the configurations after an import.

For the specific case of inventory offloadings, their definition may not yet be based on views as described in [Configure inventory collection](#configuring-inventory-collection). When importing such an offloading, it will be configured so that it still reads directly from the inventory collection. It is advisable, however, to change the configuration and use a view instead in order to ensure that only relevant data is offloaded.
