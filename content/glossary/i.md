---
weight: 80
title: I
layout: bundle
sector:
  - getting_started
---

### Inventory {#inventory}

The inventory stores all master data for [devices](#device) and [assets](#asset), including their configurations and relationships, and serves as the [digital twin](#digital-twin) of physical or logical entities within {{< product-c8y-iot >}}.


### Inventory roles {#inventory-roles}

Inventory [roles](#roles) contain [permissions](#permission) that grant access to specific groups of [devices](#device) or [assets](#asset) in the [inventory](#inventory). They allow fine-grained [authorization](#authorization) to particular assets or device groups and their associated data.  

### Isolation level {#isolation-level}

The isolation level defines how [microservice](#microservice) instances are shared among [tenants](#tenant). Options are either "multi-tenant" (MULTI\_TENANT in the manifest), where a single instance serves multiple subscribed tenants, or "per-tenant" (PER\_TENANT in the manifest), where a dedicated instance is created for each subscribing tenant.  
