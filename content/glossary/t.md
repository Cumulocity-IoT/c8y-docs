---
weight: 160
title: T
layout: bundle
sector:
  - getting_started
---

### Tenant {#tenant}

A tenant represents a logically isolated data space within {{< product-c8y-iot >}}, typically corresponding to a customer or organizational unit. It has its own [users](#user), [devices](#device), [applications](#application), and data.

### Tenant domain {#tenant-domain}

The tenant domain refers to the domain name used to access a {{< product-c8y-iot >}} [tenant](#tenant), in the format `<tenant-name\>.\<instance-name\>`. It is used for login and API access and is distinct from the tenant’s unique identifier ([tenant ID](#tenant-id)). For example, a tenant named "acme" on the instance cumulocity.com would have the tenant domain "acme.cumulocity.com". [Enterprise tenants](#enterprise-tenant) and their [subtenants](#subtenants) can optionally configure custom domains for access using the platform’s custom domain feature.  

### Tenant hierarchy {#tenant-hierarchy}

The tenant hierachy refers to the structure organizing [tenants](#tenant) in {{< product-c8y-iot >}}, typically involving a [{{< management-tenant >}}](#management-tenant) at the top, [{{< enterprise-tenant >}}s](/glossary/e/#enterprise-tenant) below it, and [{{< standard-tenant >}}s](/glossary/s/#standard-tenant) at the lowest level.

### Tenant ID {#tenant-id}

A tenant ID is a unique identifier assigned to each [tenant](#tenant). The tenant ID is often used as a prefix in the username for authentication (for example, `\<tenantID\>/\<username\>`).

### Tenant options {#tenant-options}

Tenant options are configurable key-value pairs associated with a [tenant](#tenant), used to customize platform behavior, [application](#application) settings, or store tenant-specific configurations.  

### Tenant policy {#tenant-policy}

Predefined sets of [tenant options](#tenant-options) and retention rules that can be created in a [{{< management-tenant >}}] or [{{< enterprise-tenant >}}] and applied when creating new [subtenant](#subtenant) to ensure consistent initial configurations.   

### Tech Community {#tech-community}

The official online forum and knowledge base for {{< product-c8y-iot >}} users and developers to ask questions, share solutions, find tutorials, and stay updated on platform news and events. See [https://community.cumulocity.com/](https://community.cumulocity.com/).

### Thick Edge {#thick-edge}

Thick Edge is an informal term for {{< product-c8y-iot >}} Edge, see [{{< product-c8y-iot >}} Edge](#edge).

### thin-edge.io {#thin-edge}

[Thin-edge.io](https://thin-edge.io/) is an open-source software framework recommended by {{< product-c8y-iot >}} for custom device integration. It provides components and tools to connect [devices](#device) to the platform, particularly suitable for implementing device-side logic.
