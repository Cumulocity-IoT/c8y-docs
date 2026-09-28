---
title: Tenant hierarchy
layout: bundle
sector:
  - getting_started
weight: 60
---

Tenants are physically separated data spaces with a separate URL, with a specific set of users, a separate application management and no data sharing by default. Users in a single tenant share the same URL and the same data space.

For many scenarios it is sufficient to manage multiple parties within a single tenant. In this case, you [control the user access](/concepts/security/#access-control) by assigning appropriate roles - to specify which devices a user can see - and this way separate and protect multiple parties from each other. This approach corresponds to a [{{< standard-tenant >}}](/concepts/tenant-hierarchy/#standard-tenant) in {{< product-c8y-iot >}}.

For other scenarios this approach might not be sufficient for various reasons and it might be relevant to manage a portfolio of tenants. This [multi-tenancy approach](/concepts/tenant-hierarchy/#multi-tenancy) is reflected by the concept of [{{< enterprise-tenant >}}s](/concepts/tenant-hierarchy/#enterprise-tenant) in {{< product-c8y-iot >}}.  
