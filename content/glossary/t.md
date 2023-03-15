---
weight: 160
title: T
layout: bundle
section: 
  - getting_started
---


<a name="tenant"></a>

### Tenant

Tenants are physically separated data spaces with a separate URL, which has a specific set of users, a separate application management and no data sharing by default. Users in a single tenant share the same URL and the same data space.

See also [Tenant hierarchy](#tnt-hierarchy).

<a name="tenant-domain"></a>

### Tenant domain

A key feature of the Enterprise tenant is the ability to operate the {{< product-c8y-iot >}} platform using a custom domain name. This means that you can configure the platform to serve you and your customers using a host name of choice.

For details see [{{< enterprise-tenant >}} > Customizing your platform](/users-guide/enterprise-tenant/#customization) in the *User guide*.

<a name="tnt-hierarchy"></a>

### Tenant hierarchy

The {{< product-c8y-iot >}} tenant concept builds a 3-level hierarchy, including the following levels from bottom to top:

* [{{< standard-tenant >}}](#standard-tenant)
* [{{< enterprise-tenant >}}](#ent-tenant)
* [{{< management-tenant >}}](#mgm-tenant)

These three levels differ in their scope, particularly with regards to administration.

See also [Tenant hierarchy](/concepts/tenant-hierarchy), [{{< standard-tenant >}}](#standard-tenant), [{{< enterprise-tenant >}}](#ent-tenant) and [{{< management-tenant >}}](#mgm-tenant).

<a name="tenant-id"></a>

### Tenant ID

The unique ID of a tenant or subtenant. When a tenant is created, it gets an auto-generated ID, which cannot be changed. The tenant ID is shown in the user dropdown menu in the UI.

### Thin Edge

[Thin-edge.io](https://thin-edge.io/) is an open-source and cloud-agnostic IoT framework designed for lightweight IoT devices. It offers simple and secure device connectivity, freedom of the cloud platform, for example {{< product-c8y-iot >}}, and freedom of the programming language.
