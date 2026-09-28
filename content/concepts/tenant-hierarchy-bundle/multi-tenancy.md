---
title: Multi-tenancy
layout: bundle
weight: 20
sector:
  - platform_administration
---

With the {{< enterprise-tenant >}} concept, {{< product-c8y-iot >}} supports full multi-tenancy. All data related to a tenant is stored in a dedicated data space. This includes user data, inventory, events, measurements, operations and alarms.

The {{< enterprise-tenant >}} can create subtenants that will then again function like {{< standard-tenant >}}s in the platform and have their own tenant management.

This multi-tenancy approach has various advantages:

* **User and permission management**
<br>Each tenant has full admin access to their user and permission management and can create its own roles.
* **Application management**
<br>Each tenant can manage their applications separately and extend the platform by adding applications.
* **Usage statistics and billing**
<br>Having separate tenants allows for cloud-based business models, which typically charge per API call and storage.

However, since every tenant has its dedicated database, only the IoT data of the tenant itself can be accessed within each tenant. While this has many advantages in terms of clear data separation it also means that, in order to share data between tenants it is required to copy the data over, which means that data is stored twice.

You can find a detailed discussion on the advantages and disadvantages of the role-based access control in a single tenant versus the multi-tenant approach in [RBAC versus multi-tenancy approach](/concepts/tenant-hierarchy/#comparison).  
