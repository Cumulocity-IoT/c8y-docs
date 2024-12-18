---
title: Hierarchy levels
layout: bundle
weight: 30
sector:
  - platform_administration
---

The {{< product-c8y-iot >}} tenant concept builds a 3-level hierarchy, including the following levels from bottom to top:

- [{{< standard-tenant >}}](#standard-tenant)
- [{{< enterprise-tenant >}}](#enterprise-tenant)
- [{{< management-tenant >}}](#management-tenant)


![3-level hierarchy](/images/concepts-guide/tenant-hierarchy.png)

These three levels differ in their scope, particularly with regards to administration, see below.

{{< c8y-admon-info >}}
Please refer to your contract for details on your individual subscriptions.
{{< /c8y-admon-info >}}


### {{< standard-tenant >}} {#standard-tenant}

At the bottom of the hierarchy you can find single tenants which are represented by the concept of {{< standard-tenant >}}s in {{< product-c8y-iot >}}.

A {{< standard-tenant >}} offers most of the device management and monitoring functionality of the {{< product-c8y-iot >}} platform, but has certain limitations when it comes to administrative aspects.

In a {{< standard-tenant >}}, multiple parties are reflected by separate users. Since all users in a tenant share the same URL and data space they can only be separated from each other by assigning access rights based on the [roles concept](/concepts/security/#access-control), that means, using roles you can give certain users only restricted visibility of the tenant (for example only the devices that belong to them).

{{< standard-tenant >}}s, as direct subtenants of the {{< management-tenant >}}, provide fully standardized functionality.

Details on the administration of {{< standard-tenant >}}s are described in [{{< standard-tenant >}} administration](/standard-tenant/).


### {{< enterprise-tenant >}} {#enterprise-tenant}

An {{< enterprise-tenant >}} offers additional administrative functionality compared to a {{< standard-tenant >}}, the major difference being **multi-tenancy**.

Using an {{< enterprise-tenant >}}, you can

* create and manage subtenants
* manage the subscribed applications/features of the subtenants
* invoice subtenants based on usage statistics

See also [Multi-tenancy](/concepts/tenant-hierarchy/#multi-tenancy).

Moreover, an {{< enterprise-tenant >}} includes the following additional features:

* **Branding** -  To configure an individual look & feel
* **Domain name** - To provide an individual domain name
* **Support user** - To support users of other tenants
* **User hierarchy** - To reflect entities with limited permissions to subsets of shared data

{{< enterprise-tenant >}}s offer standardized functionality combined with some individual customization.

Details on the usage of this additional features and on the additional administration options of the {{< enterprise-tenant >}} can be found in [{{< enterprise-tenant >}}](/enterprise-tenant/).


### {{< management-tenant >}} {#management-tenant}

The {{< management-tenant >}} builds the highest level of the {{< product-c8y-iot >}} tenant hierarchy.

Every {{< product-c8y-iot >}} deployment is delivered with a {{< management-tenant >}}. The {{< management-tenant >}} is used to administer all tenants within the same deployment on platform level and thus provides full control of the platform.

On the {{< product-c8y-iot >}} cloud instances, the {{< management-tenant >}} can only be accessed by the {{< company-c8y >}} Operations team.

You will only have access to the {{< management-tenant >}}, when you setup your own {{< product-c8y-iot >}} instance either as a dedicated/hosted cloud deployment, an on-prem deployment, or the {{< product-c8y-iot >}} Edge offering.

For detailed information on the configuration options of a {{< product-c8y-iot >}} deployment on platform level, refer to the operations documentation, see [Additional resources](/additional-resources/).
