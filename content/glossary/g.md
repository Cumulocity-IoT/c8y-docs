---
weight: 70
title: G
layout: bundle
sector:
  - getting_started
_build:
  render: false

---

### General Availability (GA) {#ga}

In the [Continuous Deployment model](#continuous-deployment), General Availability (GA) refers to the availability of a feature to all customers (as compared to [Private Preview](#private-preview) and [Public Preview](#public-preview)). In the [Yearly release](#yearly-release) model, General Availability (GA) refers to the general availability of a Yearly release. This is the stage where a feature is fully released and supported.


### Global role {#global-role}

A type of [role](#role) in {{< product-c8y-iot >}}'s [permission](#permission) model that contains permissions applying to all data within a [tenant](#tenant). Unlike [inventory roles](#inventory-role), which grant permissions to specific [assets](#asset) or [groups](#group), global roles apply tenant-wide.

{{< c8y-details title="API details" >}}
Global roles are managed via the User API. They are defined under `/user/roles` and can be assigned to users via `POST /user/users/{username}/roles`.
{{< /c8y-details >}} 


### Group {#group}

A group is  a special type of [asset](#asset) used to organize [devices](#device) and other assets for structural and [permission](#permission)-management purposes. Groups support flexible organization and, when paired with [inventory roles](#inventory-role), can grant or restrict [user](#user) access to the contained devices and assets.
