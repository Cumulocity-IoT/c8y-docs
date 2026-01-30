---
weight: 20
title: Managing permissions and roles
layout: bundle
outputs:
  - html
  - json
sector:
  - platform_administration
helpcontent:
- label: managing-permissions
  title: Managing permissions
  content: "Permissions define what a user is allowed to do in Cumulocity applications. To manage permissions more easily, they are grouped into global and inventory roles. When you assign one or more roles to a user, they gain the combined permissions of all these roles.


  In the **Global roles** tab you can find the roles which grant permissions on a general level. There are several global roles pre-defined (which may serve as a template), but you can define your own according to your needs.


  In the **Inventory roles** tab you can manage user permissions for particular groups of devices and/or its children. For example, an inventory role can contain the permission to restart a particular device."
---

Permissions define what a user is allowed to do in {{< product-c8y-iot >}} applications.

Permissions are not assigned to users directly. To manage permissions more easily, they are grouped into roles (global and inventory roles). Every user can be associated with a number of roles, adding up permissions of the user.

{{< c8y-admon-info >}}
In the Cumulocity API, each granular permission is identifed by a unique “permission” string, which is prefixed with `ROLE_` (for example, `ROLE_ALARM_READ`, `ROLE_INVENTORY_ADMIN`). Therefore, permissions are frequently referred to as "roles" throughout the API as well as in the configuration files. See also the glossary for the usage of the terms [permission](/glossary/#permission) and [role](/glossary/#role) in the Cumulocity context.  
{{< /c8y-admon-info >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To view global roles, inventory roles, applications: READ permission for the "User management" permission type.
* To manage global roles (assign to users, unassign from users), to manage inventory roles, to manage application access: ADMIN permission for the "User management" permission type.
* To assign owned roles to users ("feature-user-hierarchy" application subscription required): CREATE permission for the "User management" permission type.
* To create new roles with available (owned) permissions: CREATE and ADMIN permission.

The above permissions can be used to create roles for robust user management. Every new tenant has these roles by default:
* Global User Manager - Can access and modify the full user hierarchy
* Shared User Manager - Can create new own sub-users and manage them ("feature-user-hierarchy" application subscription required)
{{< /c8y-admon-req >}}

{{< c8y-admon-related >}}
- [Platform administration > {{< standard-tenant >}} management > Managing users](/standard-tenant/managing-users) for information on managing users in general.
- [Platform administration > {{< standard-tenant >}} management > Managing applications](/standard-tenant/ecosystem/#managing-applications) for more information on managing applications.
- [Platform administration > {{< enterprise-tenant >}} administration > Managing user hierarchies](/enterprise-tenant/managing-user-hierarchies) for more information on managing user hierarchies.
- [Device management & connectivity > Device integration > Fragment library](/device-integration/fragment-library/) for further information on fragment types.
- [Roles](https://{{< domain-c8y >}}/api/core/#tag/Roles) and [Inventory Roles](https://{{< domain-c8y >}}/api/core/#tag/Inventory-Roles) in the {{< openapi >}} for managing permissions via REST.
{{< /c8y-admon-related >}}
