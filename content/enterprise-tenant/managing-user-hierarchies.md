---
weight: 20
title: Managing user hierarchies
layout: bundle
sector:
  - platform_administration
---

With user hierarchies you can model the structure of organizational entities in your company which share the same database in {{< product-c8y-iot >}} platform. These entities can have limited permissions to subsets of the shared data and can manage their own sub-users.

{{< c8y-admon-req >}}
SUBSCRIPTIONS:

The tenant must be subscribed to the application "feature-user-hierachy".

APPLICATION ACCESS:

The user must have access to the Administration application.

ROLES & PERMISSIONS:

The user must have one or more of "User management" permissions:
* To view all users: READ permission.
* To manage all users: ADMIN permission.
* To create users: CREATE permission. By assigning this permission you can create own sub-users and manage the underlying hierarchy of users.

On tenant creation, default roles are available which can be used as a sample configuration for the above-mentioned permissions:
* Global User Manager - Can access and modify the full user hierarchy (all users).
* Shared User Manager - Can create new own sub-users and manage the underlying user hierarchy.

{{< /c8y-admon-req >}}

### To view user hierarchies {#to-view-user-hierarchies}

In the **Users** page, user hierarchies are indicated by an arrow left <i class="dlt-c8y-icon-expand-arrow text-primary icon-20"></i> from the user icon. Clicking on the arrow unfolds the user hierarchy. You can also fold and unfold the entire user hierarchy using the **Expand all** and **Collapse all** links at the right of the top menu bar.

A small number next to the username shows how many direct sub-users a user has. Sub-users are users that can be managed by their respective parent user and that have at most the permissions of that parent user. In the example below, the user "Demo user" has one direct sub-user.

![User hierarchies](/images/users-guide/enterprise-tenant/et-user-hierarchy.png)


### To create a sub-user {#to-create-a-subuser}

User hierarchies are created by assigning an "owner" to a user. The owner can manage the user. The user can have at most the same permissions as the owner.

1. Select the user in the **Users** page.
2. In the **Owner** field, select the user you want to assign as owner from the dropdown list.
3. Click **Done** to confirm.

![Select owner](/images/users-guide/enterprise-tenant/et-user-hierarchy-assign-owner.png)

{{< c8y-admon-info >}}
When creating a new user, the owner is automatically set to the user who is logged in if the logged-in user has only "User management" CREATE permission. The owner can be changed later by a user with 'User management' ADMIN permission, or by a user with 'User management' CREATE permission if they are the current owner (parent) of the account.

If you want an owner to manage only their sub-users, make sure that the owner does not have a global role with "User management" permission for all users.
{{< /c8y-admon-info >}}

**Example**

A user A has the role "business". User A becomes the owner of a new user B. User B can then only get a business role assigned (and not for example an admin role) as the user cannot have higher permissions than the owner. If you try to assign any other role except "business" for user B, then the role will be unavailable for subscription and will be indicated by a warning icon <i class="dlt-c8y-icon-warning text-warning icon-20"></i> with a notification that this operation is not permitted.


### To delegate user hierarchies to other users {#to-delegate-user-hierarchies-to-other-users}

In {{< product-c8y-iot >}}, users can delegate their user hierarchies and permissions to another user. The delegated user then has the same user management permissions as the user who activated the delegation. To do user management, the delegated user must have CREATE permission for the "User management" permission type, which can be granted by assigning a predefined global role "Shared User Manager" or by assigning a custom global role with this permission.

You may of course also delegate on a temporary basis, for example if you are temporarily unavailable.

#### To delegate permissions to a user {#to-delegate-permissions-to-a-user}

Either open the user and click the delegate icon <i class="dlt-c8y-icon-batch-assign text-primary icon-20"></i> in the **Delegated by** field, or click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the user entry in the user list and from the context menu, select **Delegate**.

#### To undelegate permissions {#to-undelegate-permissions}

Remove the delegation in the **Delegate by** field, or click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> in the user list and from the context menu, select **Undelegate**.

If the delegated user must also manage specific devices, the admin user must assign this device permissions (inventory roles) directly to the intended user. This can be done by using **Copy inventory roles from another user**. For details refer to [Assigning inventory roles to users](/standard-tenant/managing-permissions/#to-assign-inventory-roles-to-users).

{{< c8y-admon-info >}}
Delegation works only inside user management and does not have any implication to other places.
{{< /c8y-admon-info >}}

### Troubleshooting sub-users {#troubleshooting-sub-users}

In the example below the user cannot change the access to the Administration application, because the owner of the user has no "User management" permission. As a result, the owner user can not assign built-in applications (and the owned user cannot use them).

![Warning message](/images/users-guide/enterprise-tenant/et-warning.png)
