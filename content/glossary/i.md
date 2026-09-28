---
weight: 80
title: I
layout: bundle
sector:
  - getting_started
build:
  render: false

---

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
