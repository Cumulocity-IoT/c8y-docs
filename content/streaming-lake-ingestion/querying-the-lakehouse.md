---
title: Querying the lakehouse
description: "Query the lakehouse of Streaming Lake Ingestion with SQL, with example queries for the inventory, events, and measurements, and keep your queries fast."
weight: 40
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - data_analytics
---

The following queries demonstrate how to extract common metrics and insights from the lakehouse. They use the Dremio SQL dialect as an example. Other query engines may need small changes, such as quoting reserved words or unnesting arrays. To keep the queries concise, they refer to tables by namespace and table name only, such as `cdc_event.event`. Depending on your query engine, add the name of the catalog as a prefix, or set the catalog as the default.

### Basic inventory queries {#basic-inventory-queries}

To list all devices registered in your tenant, use the `latest_inventory` tables to get the most recent state and filter for the marker fragment `c8y_IsDevice` in the `fragments` array.

```sql
SELECT id, name
FROM latest_inventory.inventory
WHERE ARRAY_CONTAINS(fragments, 'c8y_IsDevice')
```

To find the current location of all devices within a specific geographic boundary, query the `c8y_Position` fragment in the `latest_inventory` folder.

```sql
SELECT id, lat, lng
FROM latest_inventory.c8y_Position
WHERE lat BETWEEN 50.0 AND 52.0
  AND lng BETWEEN 6.0 AND 8.0
```

### Basic time series queries {#basic-time-series-queries}

To retrieve all events recorded for a specific device within a given timespan, query the `cdc_event.event` table. Note that `time` is a reserved word in Dremio SQL, so it must be quoted.

```sql
SELECT "time", type, text
FROM cdc_event.event
WHERE source = '52277201'
  AND "time" BETWEEN '2026-04-16 00:00:00' AND '2026-04-16 23:59:59'
ORDER BY "time" DESC
```

### Parent and child queries {#parent-and-child-queries}

To find a parent device or asset linked to a specific device, you can search for the child's ID within the `childDevices` array.

```sql
SELECT id, name
FROM latest_inventory.inventory
WHERE ARRAY_CONTAINS(childDevices, '102938')
```

Conversely, to retrieve all child devices belonging to a specific asset, use Dremio's `FLATTEN` function to unroll the asset's `childDevices` array and select the matching devices.

```sql
SELECT id, name
FROM latest_inventory.inventory
WHERE id IN (
  SELECT FLATTEN(childDevices)
  FROM latest_inventory.inventory
  WHERE id = '102938'
)
```

### Measurement queries {#measurement-queries}

To view a specific measurement series for a device over time, query the corresponding measurement fragment table. The following example fetches voltage measurements.

```sql
SELECT "time", b.voltage."value" AS voltage, b.temperature."value" AS temperature
FROM cdc_measurement.c8y_Battery b
WHERE source = '47635' AND
 "time" BETWEEN '2026-04-02 00:00:00' AND '2026-04-02 23:59:59'
ORDER BY "time" DESC
```

Note that Dremio SQL requires you to add a table name or table reference when accessing structured properties. In the example, it is not enough to only refer to `voltage."value"`, `b.voltage."value"` has to be used. You can build on the previous query by adding a condition to filter for values that cross a certain threshold limit.

```sql
SELECT "time", b.voltage."value" AS voltage, b.temperature."value" AS temperature
FROM cdc_measurement.c8y_Battery b
WHERE source = '47635' AND
 "time" BETWEEN '2026-04-02 00:00:00' AND '2026-04-02 23:59:59' AND
 b.voltage."value" < 11.5
ORDER BY "time" DESC
```

To create reports that are easier to read, you can join the historical measurement data together with the latest inventory data. This allows you to display the current device name alongside the recorded measurement values.

```sql
SELECT b."time", i.name, b.voltage."value" AS voltage
FROM cdc_measurement.c8y_Battery b JOIN latest_inventory.inventory i ON b.source = i.id
WHERE source = '47635' AND
 "time" BETWEEN '2026-04-02 00:00:00' AND '2026-04-02 23:59:59' AND
 b.voltage."value" < 11.5
ORDER BY "time" DESC
```


### Ensuring good query performance {#ensuring-good-query-performance}

While the lakehouse offers the flexibility of arbitrary SQL querying, performance can vary depending on the complexity of your query. To ensure fast responses for common IoT use cases, performance is highly optimized for queries that select a specific set of devices, a particular time range, and, for measurements, a limited set of data points.

Conversely, other types of queries may exhibit slower responses. These include queries that process a very large base set of data with complex aggregations or execute multi-level joins with selections on non-indexed properties. To improve query performance for your specific applications, you have several options:

* Pre-process the data before it enters {{< product-c8y-iot >}} using Edge functionality or Data Preparation functions.
* Process the data within {{< product-c8y-iot >}} using Streaming Analytics or a custom microservice to create refined data streams.
* Post-process the data in the lakehouse by creating your own "gold layer" tables with pre-aggregated and materialized results, using external lakehouse tools.
