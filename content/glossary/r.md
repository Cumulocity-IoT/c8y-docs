---
weight: 140
title: R
layout: bundle
sector:
  - getting_started
_build:
  render: false

---

### RBAC (Role-Based Access Control){#rbac}

RBAC (Role-Based Access Control) is a security model used by {{< product-c8y-iot >}} in which [permissions](#permission) are grouped into [roles](#role), and these roles are then assigned to [users](#user) or user groups. This allows administrators to manage access based on a user's function or responsibilities.

{{< c8y-details title="Developer details" >}}
The RBAC model is implemented and managed through the [User API](https://cumulocity.com/api/core/#tag/User-API). Endpoints under `/user/roles` and `/user/inventoryroles` are used to define roles, while endpoints like `/user/users/{username}/roles` assign them to users.
{{< /c8y-details >}}  


### Release notes  {#release-notes}

Release notes are published for each {{< product-c8y-iot >}} [Yearly release](#yearly-release) and its subsequent [maintenance releases](#maintenance-release), detailing new features, bug fixes, and API changes. Release notes help users track changes and understand their impact on deployments.


### Report {#report}

Reports are global [dashboards](#dashboard), accessible in the [Cockpit application](#cockpit-application), and visible across the entire [tenant](#tenant) regardless of the [asset hierarchy](#asset-hierarchy). A report serves as a customizable container for [widgets](#widget) to visualize and track tenant-wide data like [applications](#application), [alarms](#alarm), and [assets](#asset).

See also [Working with reports](/cockpit/working-with-reports/) in the documentation.   

{{< c8y-details title="Developer details" >}}
Reports are managed as managed objects via the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) (`/inventory/managedObjects`). They are basically a special type of dashboard.
{{< /c8y-details >}}  


### REST API {#rest-api}

The {{< product-c8y-iot >}} REST API is an interface that allows for communication between the {{< product-c8y-iot >}} platform and other systems via HTTP and REST.

For technical details on the available endpoints, see the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/).


### Role {#role}

Roles are named collections of [permissions](#permission) that can be assigned to [users](#user) and/or [devices](#device) to determine the level of authorization on the platform. Roles are the central component of {{< product-c8y-iot >}}'s [RBAC](#rbac) model. The platform distinguishes between [global roles](#global-role) (tenant-wide) and [inventory roles](#inventory-role) (specific to the device data in the [inventory](#inventory)).  

See also [Managing permissions and roles](/standard-tenant/managing-permissions/) in the documentation.

{{< c8y-details title="Developer details" >}}
Roles are managed via the [User API](https://cumulocity.com/api/core/#tag/User-API). Global roles are managed via `/user/roles`, while inventory roles are managed via `/user/inventoryroles`.
**Important**: The platform identifies each granular permission with a unique “permission” string, which is prefixed with ROLE_ (for example, ROLE_ALARM_READ, ROLE_INVENTORY_ADMIN).
This permission strings are frequently referred to as "roles" throughout the API and in the configuration files although they actually refer to a permission.
{{< /c8y-details >}}
