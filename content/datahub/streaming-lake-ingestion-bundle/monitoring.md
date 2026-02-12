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

The service stores IoT data in the lake in near-realtime batches. When the service writes a batch of IoT data, it provides metrics on the data volumes:

* Number and size of files written per batch.
* Number of files written and removed, and the resulting data lake size per optimization run.

Use {{< product-c8y-iot >}} visualization tools to confirm that data arrives as expected and to understand data growth patterns.

### Managing schema evolution

When the structure of incoming data changes, the service automatically adapts the data lake schema. The service creates an event of type `c8y_SchemaEvolved` for each batch that requires a schema change. This event details the new tables created and columns added to existing tables. Monitor these events in the {{< product-c8y-iot >}} event viewer to maintain an audit trail of schema changes.


### Troubleshooting

*TBD: List non-obvious situations here.*

* Characters not compliant to Iceberg naming are transformed using `_x[code]`.
* Properties that change from atomic property to object on top-level are converted to fragment table.

## Migrating from Parquet offloaders to Iceberg

*TBD: Outline migration support.*

## Modeling device data for best analytics performance
-->