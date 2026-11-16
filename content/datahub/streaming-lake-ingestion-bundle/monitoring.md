---
weight: 30
title: Monitoring the data flow
layout: redirect
---


<!--

### Monitoring the data flow {#monitoring-the-data-flow}

The service stores IoT data in the lake in near-realtime batches. When the service writes a batch of IoT data, it provides metrics on the data volumes:

* Number and size of files written per batch.
* Number of files written and removed, and the resulting data lake size per optimization run.

Use {{< product-c8y-iot >}} visualization tools to confirm that data arrives as expected and to understand data growth patterns.

### Schema change and violation notifications {#schema-change-and-violation-notifications}

-->


The service automatically updates the data lake schema when the structure of the incoming data changes. You receive notifications
in the form of {{< product-c8y-iot >}} events for schema changes and alarms for schema violations. These notifications help you stay informed about changes and be able to address any issues.

The following notifications appear in the system:

* **Schema evolved event** (`c8y_StreamingLakeIngestion_SchemaEvolved`): You see this event in the {{< product-c8y-iot >}} event viewer when the service detects a change in the structure of the incoming data.
The event appears when new tables are created or new columns are added to existing tables. If several changes happen at once, the service combines them into a single event.
The event lists all new tables and columns added during that period. This helps you track how your data structure grows over time.

  ![Schema evolved event in event viewer](/images/datahub-guide/schema-evolution-event-viewer.png)

* **Schema violation alarm**: This alarm appears in the alarm viewer when the service detects message payloads that do not match the expected schema (binned data). The alarm provides high-level information about the schema violation. For detailed information about the affected messages, query the `trash` table.

  ![Schema violation alarm in alarm UI](/images/datahub-guide/schema-evolution-alarm-ui.png)

### Offloading failure alarms {#offloading-failure-alarms}

When the service repeatedly fails to offload your data, for example because it cannot access your data lake or the catalog, it retries with a growing delay and raises an alarm with the severity MAJOR. You see the alarm in the alarm viewer. While the alarm is active, no new data reaches the affected tables.

Each part of the service raises its own alarm type:

* `c8y_StreamingLakeIngestion_CdcWriterInitializationFailed`: The service cannot write the change data capture tables.
* `c8y_StreamingLakeIngestion_LatestWriterInitializationFailed`: The service cannot write the `latest_inventory` tables.
* `c8y_StreamingLakeIngestion_AppenderInitializationFailed`: The service cannot make new data files visible in the tables.

The alarm text starts with "Offloading into the data lake has stopped" and ends with the cause of the failure, such as a missing permission on your storage. Fix the cause. The service retries automatically and clears the alarm when that part of the service offloads successfully again.
