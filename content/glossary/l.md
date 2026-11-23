---
weight: 90
title: L
layout: bundle
sector:
  - getting_started
build:
  render: false

---

### Lakehouse {#lakehouse}

A lakehouse stores data in files, like a [data lake](#data-lake), and adds the structure of a database: a catalog of tables, a schema for each table, and transactions for every change. [Streaming Lake Ingestion](#streaming-lake-ingestion) builds the lakehouse of a tenant from [Apache Iceberg](#iceberg) tables and an [Iceberg catalog](#iceberg-catalog), and {{< company-c8y >}} provides its storage.

See [DataHub 2.0 overview](/streaming-lake-ingestion/datahub-2-overview/) in the documentation.


### Location {#location}

The location represents the geographical position of a [managed object](#managed-object). The location is represented by the standard `c8y\_Position` [fragment](#fragment), which contains altitude, longitude, and latitude coordinates. Managed objects with this fragment can be displayed on Map widgets.  

{{< c8y-details title="Developer details" >}}
Location information is updated by sending an event of type `c8y_LocationUpdate` that contains a `c8y_Position fragment` (`POST /event/events`). Additionally, the `c8y_Position` fragment must be updated directly in the managed object (`PUT /inventory/managedObjects/{id}`).
{{< /c8y-details >}}  
