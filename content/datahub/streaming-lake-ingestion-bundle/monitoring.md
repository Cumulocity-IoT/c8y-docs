---
weight: 30
title: Monitoring the data flow
layout: redirect
helpcontent:
  - label: monitoring
    title: Monitoring the data flow
    content: "This page shows how Streaming Lake Ingestion runs for your tenant.


    The tiles at the top summarize the **Health** of the setup and the lake access, the **Data quality** of your data, the **Schema changes** of the last 7 days, and the **Ingestion** backlog. Below, **Active alarms** lists the alarms of the service, for example rejected records by cause, which you can acknowledge or clear. **Events** lists schema changes, such as new tables and columns."
---

### Monitoring page {#monitoring-page}

To monitor Streaming Lake Ingestion, open the Administration application and click **Monitoring** > **DataHub**. The **Monitoring** page does not refresh; click **Reload** to update it.

#### Summary tiles {#summary-tiles}

* **Health**: Whether Streaming Lake Ingestion is set up for your tenant and can write to your data lake, for example, "Provisioned", "Setting up", "Setup incomplete", "Setup failed", or "Lake access refused". If a setup step is missing, the tile names what does not work and what to do. The tile also shows:
  * **Lake access**: The result of the regular check whether the service can write to your data lake.
  * **Initial inventory load**: The status of the load that copies the current inventory data into your data lake when setup completes.
  * **Connect to DataHub**: The values your Iceberg services, tools, and libraries need to read your tables, and a credential to sign in with. Shown when setup is complete and your environment provides temporary storage credentials. For details, see [Reading the lake with an Iceberg client](#reading-with-an-iceberg-client).
* **Data quality**: The number of active alarms of the service, split into recurring and quiet alarms. A schema alarm is quiet when it had no new occurrence for 7 days. The tile shows the most recent alarm and the alarm that has been quiet the longest. It shows a warning while schema alarms recur, and an error while any other alarm is active.
* **Schema changes**: The number of new tables and new columns in the last 7 days, and the date of the last change.
* **Ingestion**: The share of the message backlog in use and the time the service last finished a batch, read from the Messaging service. From 50 % the tile shows a warning. If the last batch is more than 15 minutes old and messages are waiting, processing has stopped. If the last batch is more than 15 minutes old and nothing is waiting, no new data arrives. The tile appears only if you can open the Messaging service pages.

The service automatically updates the data lake schema when the structure of the incoming data changes. It reports schema changes as {{< product-c8y-iot >}} events and schema violations as alarms. Until setup completes, the page shows no events. If the setup fails, the page shows the [setup failure alarm](#setup-failure-alarm).

#### Active alarms {#active-alarms}

The table lists the active and acknowledged alarms of the service with severity, cause, the date the alarm became active, the last occurrence, and the number of occurrences. Recurring alarms come first, then quiet alarms.

* **Schema violation alarms** (`c8y_StreamingLakeIngestion_<cause>`): The service raises an alarm when it rejects records that do not match the expected schema, one alarm type per cause:
  * **Property too large** (`SizeExceeded`)
  * **Maximum depth exceeded** (`MaxDepthExceeded`)
  * **Too many fragments** (`NumberOfFragmentsExceeded`)
  * **Too many columns** (`NumberOfColumnsExceeded`)
  * **Illegal field name** (`IllegalFieldName`)
  * **Conflicting data types** (`UnresolvableTypeConflict`)
  * **Multi-dimensional array not supported** (`MultiDimensionalArrayDetected`)

* The service writes the rejected records to the `cdc_rejected.trash` table. The number of occurrences is the number of processing batches that contained the problem, not the number of rejected records.
* Click **Acknowledge** to show that you are working on an alarm. The alarm stays in the list, marked **Acknowledged**.
* Click **Clear** after you fixed the cause. If the problem occurs again, the service raises a new alarm.
* Acknowledging and clearing need the ADMIN permission for **Alarms** (ROLE_ALARM_ADMIN).
* The **Lake access lost** alarm and the [offloading failure alarms](#offloading-failure-alarms) clear themselves when the service works again. The [setup failure alarm](#setup-failure-alarm) clears when the next setup succeeds. These alarms offer **Acknowledge** but not **Clear**.

To see alarms, your user needs the READ permission for **Identity** (ROLE_IDENTITY_READ) and **Alarms** (ROLE_ALARM_READ). For details, see [Global roles](/standard-tenant/managing-permissions/#global-roles).

#### Events {#events}

The table lists the schema change events of the service in a timeline. The service raises a schema change event (`c8y_StreamingLakeIngestion_SchemaEvolved`) when it creates new tables or adds new columns to existing tables. If several changes happen at once, the service combines them into a single event that lists all new tables and columns. Expand a schema change to see its new tables and columns. Select a range of 1, 7, 30, or 60 days, and filter by type, table, or column. Retention rules can delete events before they are 60 days old. The page loads the newest 2,000 events.

To see events, your user needs the READ permission for **Identity** (ROLE_IDENTITY_READ) and **Events** (ROLE_EVENT_READ).

### Setup failure alarm {#setup-failure-alarm}

When an attempt to set up your tenant does not complete, for example, because a check of your storage fails or your storage cannot be reached, the service raises the alarm **Data lake setup failed** (`c8y_StreamingLakeIngestion_ProvisioningFailed`) with the severity MAJOR. You see the alarm under **Active alarms** on the [Monitoring page](#monitoring-page) and in the alarm viewer.

The alarm text starts with "Setting up the data lake failed" and names the setup step that failed and the reason, such as a missing permission on your storage. If a later attempt fails for a different reason, the service clears the alarm and raises a new one with the new text.

Fix the cause and try again. For details, see [If something fails on AWS](#if-something-fails-on-aws) or [If something fails on Microsoft Azure](#if-something-fails-on-azure). The service clears the alarm when the setup succeeds.

If the page refuses your entries, for example, a rejected external ID or a base location that overlaps the location of another tenant, it shows the reason. A refused attempt raises no alarm and leaves an open alarm unchanged.

### Offloading failure alarms {#offloading-failure-alarms}

When the service repeatedly fails to offload your data, for example because it cannot access your data lake or the catalog, it retries with a growing delay and raises an alarm with the severity MAJOR. You see the alarm under **Active alarms** on the [Monitoring page](#monitoring-page) and in the alarm viewer. While the alarm is active, no new data reaches the affected tables.

Each part of the service raises its own alarm type:

* **Offloading stopped: change data** (`c8y_StreamingLakeIngestion_CdcWriterInitializationFailed`): The service cannot write the data files of the change data capture tables to your data lake.
* **Offloading stopped: latest inventory** (`c8y_StreamingLakeIngestion_LatestWriterInitializationFailed`): The service cannot write the data files of the `latest_inventory` tables to your data lake.
* **Offloading stopped: new data not committed** (`c8y_StreamingLakeIngestion_AppenderInitializationFailed`): The service cannot commit new data files to the tables, so new data does not appear in queries.

The alarm text starts with "Offloading into the data lake has stopped" and ends with the cause of the failure, such as a missing permission on your storage. The Monitoring page shows the text below the alarm name. Fix the cause. The service retries automatically and clears the alarm when that part of the service works again.
