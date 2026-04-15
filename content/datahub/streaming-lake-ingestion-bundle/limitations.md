---
weight: 50
title: Current preview limitations
layout: redirect
---

The current preview version includes a number of functional limitations as outlined in this section.

* Inventory synchronization is not yet automatically executed on subscription.
* `latest` data is only recorded for the inventory.
* Delete events are only recorded for the inventory change data capture, not for the latest inventory.
* Custom top-level properties in measurements are ignored.
* There is no automated cleanup of tables and columns that are not in use anymore.
* The automated views only expose change data capture tables.
* Arrays appear as-is in the views.
* You may see an `internal` folder with tables for internal service information. Do not modify these tables.
* The service does not offload any Cumulocity-internal inventory entries, events, measurements and alarms.
* Iceberg credential vending is not yet supported. If you use the Iceberg catalog from another application, you have to provide credentials for the object store that you use.