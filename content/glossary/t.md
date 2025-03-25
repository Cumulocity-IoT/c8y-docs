---
weight: 160
title: T
layout: bundle
sector:
  - getting_started
---


### Tenant {#tenant}

Tenants are physically separated data spaces with a separate URL, which has a specific set of users, a separate application management and no data sharing by default. Users in a single tenant share the same URL and the same data space.

See also [Tenant hierarchy](#tenant-hierarchy).


### Tenant domain {#tenant-domain}

A key feature of the {{< enterprise-tenant >}} is the ability to operate the {{< product-c8y-iot >}} platform using a custom domain name. This means that you can configure the platform to serve you and your customers using a host name of choice.

For details see [Platform administration > {{< enterprise-tenant >}} administration > Customizing your platform](/enterprise-tenant/customization).


### Tenant hierarchy {#tenant-hierarchy}

The {{< product-c8y-iot >}} tenant concept builds a 3-level hierarchy, including the following levels from bottom to top:

* [{{< standard-tenant >}}](/glossary/s/#standard-tenant)
* [{{< enterprise-tenant >}}](/glossary/e/#enterprise-tenant)
* [{{< management-tenant >}}](/glossary/m/#management-tenant)

These three levels differ in their scope, particularly with regards to administration.

See also [Tenant hierarchy](/concepts/tenant-hierarchy).


### Tenant ID {#tenant-id}

The unique ID of a tenant or subtenant. When a tenant is created, it gets an auto-generated ID, which cannot be changed. The tenant ID is shown in the user dropdown menu in the UI.


### Thick Edge {#thick-edge}
Thick Edge is an informal term sometimes used to refer to Cumulocity Edge, a single-server variant of the Cumulocity platform designed for onsite deployment on industrial PCs or local servers: [Cumulocity Edge Documentation](https://cumulocity.com/docs/sector/edge_server/)

See also [Edge Server](/glossary/e/#edge-server)


### Thin Edge {#thin-edge}

[Thin-edge.io](https://thin-edge.io/) is an open-source and cloud-agnostic IoT framework designed for lightweight IoT devices. It offers simple and secure device connectivity, freedom of the cloud platform, for example {{< product-c8y-iot >}}, and freedom of the programming language.
