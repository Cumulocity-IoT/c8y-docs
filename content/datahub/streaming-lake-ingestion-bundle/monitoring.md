---
weight: 30
title: Monitoring the data flow
layout: redirect
---


<!--

The service provides diagnostic tools to monitor the data offloading process. Use these tools to verify data flow, understand schema evolution, and troubleshoot data quality issues.

In addition to diagnostic tools, {{< company-c8y >}} provides a [service definition](service-definition.md) that outlines key quality objectives.

{{< c8y-admon-preview >}}
*This feature is not part of the current Private Preview release.*
{{< /c8y-admon-preview >}}

### Monitoring the data flow

<!-- 

The service stores IoT data in the lake in near-realtime batches. When the service writes a batch of IoT data, it provides metrics on the data volumes:

* Number and size of files written per batch.
* Number of files written and removed, and the resulting data lake size per optimization run.

Use {{< product-c8y-iot >}} visualization tools to confirm that data arrives as expected and to understand data growth patterns.

-->

### Schema change and violation notifications (#schema-change-and-violation-notifications)

The service automatically updates the data lake schema when the structure of the incoming data changes. You receive clear notifications 
in the form of Cumulocity events for schema changes and alarms for schema violations. These notifications help you stay informed about changes and quickly address any issues.

The following notifications appear in the system:

* **Schema evolved event** (`c8y_StreamingLakeIngestion_SchemaEvolved`): You see this event in the {{< product-c8y-iot >}} event viewer when the service detects a change in the structure of the incoming data. 
The event appears when new tables are created or new columns are added to existing tables. If several changes happen at once, the service combines them into a single event. 
The event lists all new tables and columns added during that period. This helps you track how your data structure grows over time.

  ![Schema evolved event in event viewer](/images/datahub-guide/schema-evolution-event-viewer.png)

* **Schema violation alarm**: This alarm appears in the alarm UI when the service detects message payloads that do not match the expected schema (binned data). 
The alarm provides high-level details about the schema violation. For more information about the affected messages, query the `trash` table.

  ![Schema violation alarm in alarm UI](/images/datahub-guide/schema-evolution-alarm-ui.png)

Result: You always have a clear record of schema changes and immediate alerts for any issues affecting your data lake.

<!--

### Troubleshooting

*TBD: List non-obvious situations here.*

* Characters not compliant to Iceberg naming are transformed using `_x[code]`.
* Properties that change from atomic property to object on top-level are converted to fragment table.

## Migrating from Parquet offloaders to Iceberg

*TBD: Outline migration support.*

## Modeling device data for best analytics performance
-->