---
weight: 50
title: Access control
layout: bundle

---

{{< product-c8y-iot >}} uses a standard authentication and authorization process based on realms, users, user groups, and authorities. A *realm* is a database of users and user groups, who follow the same authentication and authorization policy. A *user* is a person or an external system entitled to access protected resources inside {{< product-c8y-iot >}}.

{{< product-c8y-iot >}} creates a new realm for each tenant to store the users of that tenant. Realms provide an own namespace for usernames, allowing users to keep the names that they are familiar with from their own enterprise IT or other IT systems. There is no conflict between usernames: A user "smith" of one particular tenant is different from a user "smith" of another tenant. This username is valid for all {{< product-c8y-iot >}} applications that a tenant subscribes to.

Each new realm is automatically populated with an initial administrator user who can create further users and user groups (that is, global roles), and who can assign permissions to them. This enables an enterprise to manage users and their permissions on their own using the Administration application.

### Permissions and ownership {#permissions-and-ownership}

The ability to execute certain functionality on the system depends on two concepts: Permissions and ownership.

Permissions define explicitly what functionality can be executed by a user.

{{< product-c8y-iot >}} distinguishes read permissions and administration permissions. Read permissions enable users to read data. Administration permissions enable users to create, update and delete data. Read and administration permissions are separately available for the different types of data in {{< product-c8y-iot >}}. For example, there are read permissions for inventory data, measurements, operations and so forth.

To manage permissions more easily, they are grouped into roles. When you assign one or more roles to a user, they gain the combined permissions of all these roles.

The following types of roles can be associated with users:

* **Global roles**: Contain permissions that apply to all data within a tenant.
* **Inventory roles**: Contain permissions that apply to groups of devices.

Objects in the inventory also have an owner associated with them. If you have created an object, you are the owner of it and can manage it without requiring any further permissions. Owners can always, regardless of their other permissions,

-   Read, update and delete the inventory objects they own.
-   Create, read, update and delete data associated with the objects they own.

For example, if you are the owner of a smart meter in the inventory, you can store meter readings for that smart meter even if you do not have any other measurement permissions.

The inventory also features a CREATE permission. A user having just the create permission can store new objects in the inventory, but can not read, modify or delete any other data. This is mainly relevant for devices. The CREATE permission also includes the possibility to link your object to another object as child device or child asset.

However, you cannot manage any devices or groups that you did not create yourself, unless you also have the UPDATE permission or an additional inventory role.

This concept helps to assign minimal permissions to devices.

### Limiting access to managed objects {#limiting-access-to-managed-objects}

{{< product-c8y-iot >}} allows you to set global permissions that are applicable to all managed objects, measurements, events and so forth. It also allows a limitation of permits

* to specific managed objects or a set of managed objects,
* to a single user or a group of users,
* to individual fragments.

### Managing roles and assigning permissions {#managing-roles-and-assigning-permissions}

Global roles and inventory roles are created and managed in the **Roles** page of the Administration application in the UI.

A detailed description on available default roles and on creating and assigning global and inventory roles can be found in [Managing permissions and roles](/standard-tenant/managing-permissions).

For details on permission management using the API refer to [the User API](https://{{< domain-c8y >}}/api/core/#tag/User-API) in the {{< openapi >}}.

{{< c8y-admon-important >}}
In the Cumulocity API, each granular permission is identifed by a unique “permission” string, which is prefixed with `ROLE_` (for example, `ROLE_ALARM_READ`, `ROLE_INVENTORY_ADMIN`). Therefore, permissions are frequently referred to as "roles" throughout the API as well as in the configuration files. For example, the microservice manifest includes a `requiredRoles` field which actually expects a permission string. See also the glossary for the usage of the terms "[permission](/glossary/#permission)" and "[role](/glossary/#role)" in the Cumulocity context.  
{{< /c8y-admon-important >}}

### Globally accessible objects {#globally-accessible-objects}

To make a managed object, such as an inventory object, accessible to all users regardless of their individual permissions, add the c8y_Global fragment to the object. This applies only to inventory objects, not to alarms, events, etc., and the visibility does not extend to the object's children.
