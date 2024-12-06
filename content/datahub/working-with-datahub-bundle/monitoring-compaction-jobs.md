---
weight: 70
title: Monitoring compaction jobs
layout: redirect
helpcontent:
  - label: monitoring-compaction-jobs
    title: Monitoring compaction jobs
    content: "During offloading, data from a Cumulocity base collection is written into files in the data lake. In order to ensure a compact physical layout of those files, the system automatically runs periodic **compaction jobs** in the background for each offloading pipeline. The execution status of each compaction run is monitored and provides details on execution schedule, runtime and so on.

    The **job history** list shows an overview of the last compaction runs for the selected offloading pipeline with options to filter the list by different criteria. To get more details for a specific run, click on the corresponding entry in the list.

    For each offloading pipeline the system keeps a limited history of the last compaction executions."
---

During offloading, data from the Operational Store of {{< product-c8y-iot >}} is written into files in the data lake. In order to ensure a compact physical layout of those files, {{< product-c8y-iot >}} DataHub automatically runs periodic compaction jobs in the background. For each offloading pipeline, a corresponding compaction job is set up and scheduled. {{< product-c8y-iot >}} DataHub UI provides insights into the compaction status of the different pipelines so that you can investigate whether everything is running as expected. For the case of compaction failures, you can also configure the offloading pipeline to raise an alarm as described in [Raising alarms](#raising-alarms).

{{< c8y-admon-req >}}
You need administration permissions to access the compaction job histories. See [Defining {{< product-c8y-iot >}} DataHub permissions and roles](/datahub/setting-up-datahub#defining-permissions) for details.
{{< /c8y-admon-req >}}

### Status of all compaction jobs {#status-of-all-compaction-jobs}

In the navigator, select **Compaction status** under **Administration** to get an overview of the latest status of the compaction jobs for each pipeline. The list shows the corresponding last compaction job for all pipelines. Each compaction consists of the following details:

| Component | Description |
| ---         | --- |
| Status icon | The status of the execution, which is either running, successful, or failed
| Execution time | The point in time the execution was started
| Runtime | The runtime of the execution
| Next execution time | The point in time for which the next execution is scheduled

Click **Reload** to refresh the status being shown.

You can filter the entries by their status by using the filter buttons in the action bar. The pagination buttons can be used to traverse the history entries.

### History of compactions per offloading pipeline {#history-compaction-per-offloading-job}


If you want to examine the compaction history for a particular offloading pipeline, select **Offloading** in the navigation bar and select the offloading job you are interested in.

Click **Show compaction history** in the context menu of the offloading configuration to show the compaction history.

The list shows the execution history with each execution consisting of the following details:

| Component | Description |
| ---         | --- |
| Status icon | The status of the execution, which is either running, successful, or failed
| Execution time | The point in time the execution was started
| Runtime | The runtime of the execution
| Next execution time | The point in time for which the next execution is scheduled

The system is configured to keep a limited history of the last compaction jobs.

Click **Reload** to refresh the list.

You can filter the entries by their status or timestamp by using the filter controls at the top. Click **Apply** to filter entries with the current filter settings. Click **Reset filter** to reset the current filter settings. Per default the entries from the last seven days are shown.

### Details of compaction job {#details-of-compaction-job}

For a given compaction job, you can examine additional details of its execution.

In the corresponding list of jobs click the job you are specifically interested in. A details view encompasses the following information:

**Schedule**

| Component | Description |
| ---         | --- |
| Runtime | The runtime of the execution
| Start time | The point in time the execution was started
| End time | The point in time the execution has ended
| Scheduled execution time | The point in time for which the execution was scheduled
| Next execution time | The point in time for which the next execution is scheduled

**Job details**

| Component | Description |
| ---         | --- |
| Job name | The name of the pipeline
| Job ID | The internal ID of the job
| Job execution ID | The Dremio ID of this execution
| Target table | The folder name in the data lake
| Target folder | The path to the target table in the data lake
| Daily run | Indicates whether the job is a daily execution job
| Monthly run | Indicates whether the job is is a monthly execution job
| Recovery executed | Indicates whether the job has run a recovery from a job that has previously failed

**Daily compaction results**

During daily compaction the files are merged, following a temporal hierarchy. As a result, a folder for each day of the month is built with one or more file(s) combining all values measured for this day. For each of those files the following information is provided:

| Component | Description |
| ---         | --- |
| File size | The size of the file
| Fragment | The hierarchical ID of the fragment
| Partition | The partition with which the file is associated
| Path | The path to the file in the data lake
| Records | The number of records stored in the file

**Monthly compaction results**

During monthly compaction the files are merged, following a temporal hierarchy. As a result, a folder for each month is built with one or more file(s) combining all values measured for this month. For each of those files the following information is provided:

| Component | Description |
| ---         | --- |
| File size | The size of the file
| Fragment | The hierarchical ID of the fragment
| Partition | The partition with which the file is associated
| Path | The path to the file in the data lake
| Records | The number of records stored in the file
