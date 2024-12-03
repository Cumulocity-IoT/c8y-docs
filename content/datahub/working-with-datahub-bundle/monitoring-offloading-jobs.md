---
weight: 60
title: Monitoring offloading jobs
layout: redirect
helpcontent:
  - label: monitoring-offloading-jobs
    title: Monitoring offloading jobs
    content: "Once you have configured and started your offloading pipelines, they regularly offload data to the data lake. The execution status of each pipeline run is monitored and provides details on execution schedule, number of offloaded records, runtime and so on. In case an offloading has failed, for example, due to data lake connectivity issues, failure details are provided as well. Also an alarm will be raised.

    The **job history** list shows an overview of the last runs for the selected offloading pipeline with options to filter the list by different criteria. To get more details for a specific run like the generated files in the data lake, click on the corresponding entry in the list.

    For each offloading pipeline the system keeps a limited history of the last executions."
---

Once you have configured and started your offloading pipelines, they regularly offload data to the data lake. The {{< product-c8y-iot >}} DataHub UI provides insights into the execution status of the different pipelines so that you can investigate whether everything is running as expected. For the case of offloading failures, you can also configure the offloading pipeline to raise an alarm as described in [Raising alarms](#raising-alarms).

{{< c8y-admon-req >}}
You need administration or management permissions to access the offloading job histories. See [Defining {{< product-c8y-iot >}} DataHub permissions and roles](/datahub/setting-up-datahub#defining-permissions) for details.
{{< /c8y-admon-req >}}

### History per offloading pipeline {#history-per-offloading-job}

If you want to examine the execution history for a particular pipeline, select **Offloading** in the navigation bar and select the one you are interested in.

Click **Show offloading history** in the context menu of the offloading configuration to show the history of offloading executions.

The list shows the execution history, with each execution consisting of the following details:

| Component | Description |
| ---         | --- |
| Status icon | The status of the execution, which is either running, successful, or error
| Execution mode icon | The type of execution, which is either *scheduled* (calendar icon <i class="dlt-c8y-icon-schedule1 text-muted icon-20"></i> ) or *manual* (user icon <i class="dlt-c8y-icon-supplier text-muted icon-20"></i>)
| Records | The number of records which have been offloaded during this execution
| Execution time | The point in time the execution was started
| Runtime | The execution runtime of the offloading run
| Next execution time | The point in time for which the next execution is scheduled, provided offloading is activated; for a manual execution it is empty

The system is configured to keep a limited history of the last job executions.

Click **Reload** to refresh the list.

You can filter the entries by their status or timestamp by using the filter controls at the top. Click **Apply** to filter entries with the current filter settings. Click **Reset filter** to reset the current filter settings. Per default the entries from the last seven days are shown.

The page navigation buttons at the bottom can be used to traverse the history entries.

### Details of offloading job {#details-of-offloading-job}

For a given offloading job, you can examine additional details of its execution.

In the corresponding list of jobs click the job you are specifically interested in. A details view encompasses the following information:

**Schedule**

| Component | Description |
| ---         | --- |
| Runtime | The execution runtime of the offloading run
| Execution mode | The mode of the execution, which is either *manual* or *scheduled*
| Start time | The point in time the execution was started
| End time | The point in time the execution has ended
| Scheduled execution time | The point in time for which the execution was scheduled
| Previous execution time | The point in time the previous execution was started; for a manual execution it is empty
| Next execution time | The point in time for which the next execution is scheduled, provided offloading is activated; for a manual execution it is empty

**Results**

| Component | Description |
| ---         | --- |
| Records | The number of records which have been offloaded during this execution

**Job details**

| Component | Description |
| ---         | --- |
| Job name | The name of the pipeline
| Job ID | The internal ID of the job
| Job execution ID | The Dremio ID of this execution
| Source collection | The name of the {{< product-c8y-iot >}} base collection
| Target table | The folder name in the data lake
| Target folder | The path to the target table in the data lake
| First run | Indicates whether the execution was the first run for this offloading pipeline
| Data model | The data model, which is either *Time series* or *Standard*, used for a measurements offloading; only available for measuremement pipelines

**Offloading results**

During offloading Dremio organizes the data in newly created files within the data lake, following a temporal folder hierarchy. For each of those files the following information is provided:

| Component | Description |
| ---         | --- |
| File size | The size of the file
| Fragment | The hierarchical ID of the fragment
| Partition | The partition with which the file is associated
| Path | The path to the file in the data lake
| Records | The number of records stored in the file
