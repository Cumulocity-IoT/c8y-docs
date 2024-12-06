---
weight: 30
title: Viewing audit logs
layout: redirect
helpcontent:
  - label: query-log
    title: Query log
    content: "Offloading pipelines moving data from a Cumulocity base collection to a data lake basically rely on queries executed by **Dremio**. Other than for these offloading queries Dremio can also be leveraged to run ad-hoc queries against the data lake. Both kinds of queries are monitored with respect to their runtime and the data scanned. The **query log** comprises those details for offloading and ad-hoc queries.


    The query audit log provides controls to select the query type and to limit the corresponding log entries being shown."
  - label: system-log
    title: System log
    content: "The system logs system-relevant events for the administrator, like updates on offloading pipelines, creation of additional Dremio users, or setup of the data lake.


    The system audit log provides filter controls to limit the corresponding log entries being shown."
---

Auditing shows in the query log the queries being executed and in the system log the operations that users have carried out.

### Query log {#query-log}

In the navigator, select **Auditing** and then **Query log** to view the query log.

{{< c8y-admon-req >}}
The {{< product-c8y-iot >}} DataHub feature for storing query profiles must be enabled. The profiles are deleted after a retention period, so for older months profiles may no longer be available.
{{< /c8y-admon-req >}}

At the top of the page you can select either offload or ad-hoc queries, define a text filter on the offloading task/ad-hoc query string, and select a time period. Use the pagination buttons at the bottom of the page to navigate through the result list.

For each offloading query, the following information is provided:

| Column name | Description
| ---         |  ---
| Offloading task | The task name of the offloading pipeline, complemented by a status icon showing success or failure of the pipeline execution
| Runtime | The execution runtime of the Dremio queries related to the offloading run
| Data scanned (MB) | The amount of data the offloading query has read from the Operational Store of {{< product-c8y-iot >}}
| Data billed (MB) | The amount of data being billed (depending also on your contract); amounts of data less than 10 MB in an offloading query will be billed as if they were 10 MB
| Details | The internal task UUID in an expandable box

For each ad-hoc query, the following information is provided:

| Column name | Description
| ---         |  ---
| User | The username of the Dremio user, which has been used to execute the query
| Query | The SQL query, complemented by a status icon showing success or failure of the query execution
| Runtime | The execution runtime of the query
| Data scanned (MB) | The amount of data the ad-hoc query has read from the data lake
| Data billed (MB) | The amount of data being billed (depending also on your contract); amounts of data less than 10 MB in an ad-hoc query will be billed as if they were 10 MB
| Details | The query string as well as a link to the associated Dremio job in an expandable box

### System log {#system-log}

In the navigator, select **Auditing** and then **System log** to view the system log.

At the top of the page you can select log entries having status all/successful/errorneous/running, define a text filter on the log entries, and select a time period. Use the pagination buttons at the bottom of the page to navigate through the result list.

For each log entry, the following information is provided:

| Column name | Description
| ---         |  ---
| User | The user that has carried out the operation
| Event | The type of operation
| Details | The details of the operation and, if available, further information in an expandable box
