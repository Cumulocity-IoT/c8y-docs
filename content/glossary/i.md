---
weight: 80
title: I
layout: bundle
sector:
  - getting_started
build:
  render: false

---

### Iceberg {#iceberg}

Apache Iceberg is an open source table format for large analytic datasets, governed by the Apache Software Foundation. An Iceberg table consists of data files and of metadata files that record the schema of the table and every change to it. Many query engines and data platforms read Iceberg tables. [Streaming Lake Ingestion](#streaming-lake-ingestion) stores the data of the [lakehouse](#lakehouse) in Iceberg tables.

See [Apache Iceberg](https://iceberg.apache.org/).


### Iceberg catalog {#iceberg-catalog}

An Iceberg catalog lists the [Iceberg](#iceberg) tables and views of a [lakehouse](#lakehouse) and records the current version of each table. Clients connect to the catalog to find and read the tables. {{< product-c8y-iot >}} provides an Iceberg REST catalog with one warehouse for each tenant. Clients sign in to the catalog with the client ID and secret of a [principal](#principal).

See [Connecting to the lakehouse](/streaming-lake-ingestion/connecting-to-the-lakehouse/) in the documentation.

{{< c8y-details title="Developer details" >}}
The catalog implements the [Iceberg REST catalog specification](https://iceberg.apache.org/rest-catalog-spec/) at `https://iceberg.<INSTANCE>/api/catalog`. Clients sign in with the OAuth 2.0 client credentials grant.
{{< /c8y-details >}}


### Inventory {#inventory}

The inventory stores all master data for [devices](#device) and [assets](#asset), including their configurations and relationships, and serves as the [digital twin](#digital-twin) of physical or logical entities within {{< product-c8y-iot >}}.

{{< c8y-details title="Developer details" >}}
The inventory is managed via the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) (`/inventory/managedObjects`). It allows creating (POST), retrieving (GET), updating (PUT), and deleting (DELETE) managed objects.
{{< /c8y-details >}}


### Inventory role {#inventory-role}

Inventory [roles](#role) contain [permissions](#permission) that grant access to specific groups of [devices](#device) or [assets](#asset) in the [inventory](#inventory). They allow fine-grained [authorization](#authorization) to particular assets or device groups and their associated data.

For details, see [Inventory roles](/standard-tenant/managing-permissions/#inventory-roles) in the documentation.

{{< c8y-details title="Developer details" >}}
Inventory roles are managed via the [User API](https://cumulocity.com/api/core/#tag/User-API) (`/user/inventoryroles`). They are assigned to users for specific managed object groups via `/user/users/{username}/inventoryroles`, linking the user ID, group ID, and inventory role ID.
{{< /c8y-details >}}  


### Isolation level {#isolation-level}

The isolation level defines how [microservice](#microservice) instances are shared among [tenants](#tenant). Options are either "multi-tenant" (MULTI\_TENANT in the manifest), where a single instance serves multiple subscribed tenants, or "per-tenant" (PER\_TENANT in the manifest), where a dedicated instance is created for each subscribing tenant.  

{{< c8y-details title="Developer details" >}}
The isolation level is a declarative setting configured in the *cumulocity.json* manifest file within the microservice package.
{{< /c8y-details >}}
