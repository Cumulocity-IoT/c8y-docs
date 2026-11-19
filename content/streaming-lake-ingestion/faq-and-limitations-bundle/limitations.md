---
weight: 50
title: Current limitations
layout: redirect
---

Streaming Lake Ingestion has the following functional limitations:

* `latest` data is only recorded for the inventory.
* Delete events are only processed for the inventory.
* Custom top-level properties in measurements are ignored.
* There is no automated cleanup of tables and columns that are not in use anymore.
* The automated views only expose change data capture tables.
* Arrays appear as-is in the views.
* You may see an `internal` folder with tables for internal service information. Do not modify these tables.
* The service does not offload any {{< product-c8y-iot >}}-internal inventory entries, events, measurements, and alarms.
* Users automatically get read permissions to the Dremio data source assigned. These read permissions cannot be manually revoked.

For the limitations of your own storage on dedicated environments, see [Limitations of your own storage](/streaming-lake-ingestion/bringing-your-own-storage/#limitations-of-your-own-storage).
