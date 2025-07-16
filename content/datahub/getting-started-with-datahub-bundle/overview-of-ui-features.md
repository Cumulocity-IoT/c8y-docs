---
weight: 20
title: Overview of UI features
layout: redirect
helpcontent:
  - label: status-offloading-jobs
    title: Getting an overview of offloading jobs
    content: "Once you have configured and started your offloading pipelines, they regularly offload data to the data lake. The overview allows you to quickly check for running, failed, and successful pipelines. These summaries consider for each configured pipeline the corresponding last or current execution. Running and failed pipelines are available in tables, with each entry being linked to the associated job history. Successful pipelines are depicted in a graph, based on their execution time and the number of offloaded records. More details of a successful execution are shown when hovering over an entry or clicking on it, which navigates you to the job history."
---

{{< product-c8y-iot >}} DataHub provides the UI for managing and monitoring your offloading pipelines. The main navigation bar at the left provides links to the relevant pages. The access to these pages is restricted and depends on corresponding user roles/permissions as defined in [Defining {{< product-c8y-iot >}} DataHub permissions and roles](/datahub/setting-up-datahub#defining-permissions).

| Page | Description | Required role | Prerequisites
| ---  | --- | --- | ---
| Home | Get an introduction to {{< product-c8y-iot >}} DataHub, access quick links with related functionality, or investigate the current offloading status | DataHub Reader, DataHub Administrator, or DataHub Manager | -
| Offloading | Configure and manage your offloading pipelines | DataHub Administrator or DataHub Manager | -
| Query log | View the query log | DataHub Reader, DataHub Administrator, or DataHub Manager | Tracking of usage statistics must be enabled
| Settings / Initial configuration | Set up {{< product-c8y-iot >}} DataHub | DataHub Administrator | -
| Settings / Dremio users | Manage Dremio users | DataHub Administrator | -
| Settings / Microsoft Power BI | Set up connection to Microsoft Power BI | DataHub Administrator | -
| Microsoft Power BI | View Microsoft Power BI reports | DataHub Reader, DataHub Administrator, or DataHub Manager | Connection to Microsoft Power BI has been set up
| Administration / Usage statistics | View usage statistics | DataHub Reader, DataHub Administrator, or DataHub Manager | Tracking of usage statistics must be enabled
| Administration / Compaction status | View the latest compaction job status of your offloading pipelines | DataHub Administrator | -
| Administration / System status | Check system status | DataHub Administrator | -

### Home {#home-screen}

The Home screen is the starting point for working with {{< product-c8y-iot >}} DataHub. **Next Steps** provides a collection of links which directly navigate you, for example, to the Dremio UI or to the offloading configuration form. **Info** provides for the different connectivity options of {{< product-c8y-iot >}} DataHub, like ODBC or JDBC, the corresponding connection details.

Once you have offloading pipelines configured, the Home screen provides an offloading status overview. The overview is based on the latest execution of each currently configured offloading pipeline. The latest execution has either failed or succeeded or it is still running. Click **Reload** in the action bar to reload the status and refresh the overview. Running and failed pipelines are available in tables. Clicking on a table entry navigates you to the job history of the corresponding offloading pipeline. Successful pipeline executions are depicted in a graph, wich has the execution time on the x-axis and the number of offloading records on the y-axis. You can use that graph to find offloading pipelines with an unexpected behavior. For example, the pipeline offloads a moderate number of records, but requires a very long timespan for the execution. More details of a successful execution are shown when hovering over an entry or clicking on it, which navigates you to the job history.
