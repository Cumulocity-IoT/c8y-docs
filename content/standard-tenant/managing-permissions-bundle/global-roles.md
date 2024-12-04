---
weight: 10
title: Global roles
layout: redirect
sector:
  - platform_administration
---

Click **Roles** in the **Accounts** menu to display a list of configured roles.

<img src="/images/users-guide/Administration/admin-global-roles.png" alt="Context menu">

In the **Global roles** tab you can find the roles which grant permissions on a system level. There are several global roles pre-defined, but you can define your own according to your needs.

{{< c8y-admon-info >}}
The pre-defined roles are configured as samples for a particular purpose. You may use them as a starting point and further adapt them to your individual needs.

On creating a new user, make sure that the global roles you assign to the user contain all necessary permissions relevant for this particular user in either of those roles assigned. Permissions from different roles are merged together when assigned to the same user. If, for example, a user only has the role "Cockpit User" (see below), the user is only able to access the Cockpit application and nothing more. But if you also assign inventory permission via some of the available roles, the user will get access to the whole inventory, such as devices, groups, and configurations.
{{< /c8y-admon-info >}}

The roles "admins" and "devices" have a special status:

<table>
<col style="width: 20%;">
<col style="width: 80%;">
<thead>
<tr>
<th align="left">Role&nbsp;&nbsp;&nbsp;</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">admins</td>
<td align="left">Administrative permissions are enabled. The initial administrator, the first user created in a tenant, has this role.</td>
</tr>
<tr>
<td align="left">devices</td>
<td align="left">Typical permission setup for devices. After registration, a device automatically has this role. Edit this role if your devices require less or more permissions, or assign other roles to your devices.</td>
</tr>
</tbody>
</table>

Furthermore, the following pre-configured roles are initially provided.

<table>
<col style="width: 20%;">
<col style="width: 80%;">
<thead>
<tr>
<th align="left">Role</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">CEP Manager</td>
<td align="left">Can access all smart rules and event processing rules.</td>
</tr>
<tr>
<td align="left">Cockpit User</td>
<td align="left">Can access the Cockpit application. In addition, you should add a role providing access to devices.</td>
</tr>
<tr>
<td align="left">Devicemanagement User</td>
<td align="left">Can access the Device Management application. The user will be able to use the simulator and to run bulk operations. In addition, you should add a role providing access to devices.</td>
</tr>
<tr>
<td align="left">Global Manager</td>
<td align="left">Can read and write all data from all devices.</td>
</tr>
<tr>
<td align="left">Global Reader</td>
<td align="left">Can read all data from all devices.</td>
</tr>
<tr>
<td align="left">Global User Manager</td>
<td align="left">Can manage all users.</td>
</tr>
<tr>
<td align="left">Shared User Manager</td>
<td align="left">Can manage sub-users. The subscription plan must include user hierarchies to be able to manage sub-users.</td>
</tr>
<tr>
<td align="left">Tenant Manager</td>
<td align="left">Can manage tenant-wide settings, such as own applications, data brokerage, data retention, options and tenant statistics.</td>
</tr>
</tbody>
</table>

You may also see the following legacy roles:

|Role|Description|
|:---|:---|
|business|Can access all devices and their data but has no management permission in the tenant.
|readers|Can read all data (including users, in contrast to "Global Readers").

### To add a global role {#to-add-a-global-role}

Click **Add global role** in the **Global roles** tab. In the **New global role** page you will see a list of permission types at the left and a list of applications to be accessed at the right. The following screenshot shows the settings for the "admins" role.

![Admin example](/images/users-guide/Administration/admin-global-role-admin.png)

**Permission levels**

For each type, you can select the following permission levels:

- READ - read the specified data.
- CREATE - create new data like users and inventory data and edit users within your hierarchy.
- UPDATE - change and delete the specified data (not including READ).
- ADMIN - create, update or delete the specified data.

{{< c8y-admon-info >}}
CREATE permissions are related to the concept of ownership in {{< product-c8y-iot >}}. If you have created an object, you are the owner of it and can manage it without requiring any further permissions. For example, if you have  CREATE permission for "Inventory", you can create devices and groups, and fully manage these devices and groups. You cannot manage any devices or groups that you did not create yourself, unless you also have the UPDATE permission or an additional inventory role (see below). This concept helps to assign minimal permissions to devices. It also enables you to limit user management permissions to sub-users, if you subscribed to user hierarchies.
{{< /c8y-admon-info >}}

Select the checkbox at the top of a column to set the respective level to all permission types.

**Permission categories**

The following permission categories are available by default:

<table>
<col style="width: 20%;">
<col style="width: 80%;">
<thead>
<tr>
<th align="left">Category</th>
<th align="left">Description</th>
</tr>
</thead>

<tbody>
<tr>
<td align="left">Alarms</td>
<td align="left">View or edit alarms.</td>
</tr>

<tr>
<td align="left">Application management</td>
<td align="left">View or edit the applications available in this account.</td>
</tr>

<tr>
<td align="left">Audits</td>
<td align="left">View or create audit logs.</td>
</tr>

<tr>
<td align="left">Bulk operations</td>
<td align="left">View or create bulk operations.</td>
</tr>

<tr>
<td align="left">CEP management</td>
<td align="left">View or edit CEP rules.</td>
</tr>

<tr>
<td align="left">Data broker</td>
<td align="left">Send data to other tenants or receive data from other tenants.</td>
</tr>

<tr>
<td align="left">Device control</td>
<td align="left">View or edit commands for devices resp. send commands to devices. Also used for device registration.</td>
</tr>

<tr>
<td align="left">Events</td>
<td align="left">View or create events.</td>
</tr>

<tr>
<td align="left">Global smart rules</td>
<td align="left">Configure global smart rules.</td>
</tr>

<tr>
<td align="left">Identity</td>
<td align="left">View or edit identifiers for devices.</td>
</tr>

<tr>
<td align="left">Inventory</td>
<td align="left">View or edit inventory data.</td>
</tr>

<tr>
<td align="left">Measurements</td>
<td align="left">View or create measurements.</td>
</tr>

<tr>
<td align="left">Option management</td>
<td align="left">View or edit account options such as password policies.</td>
</tr>

<tr>
<td align="left">Retention rules</td>
<td align="left">View or edit retention rules.</td>
</tr>

<tr>
<td align="left">Schedule reports</td>
<td align="left">Manage the schedule of report exporting.</td>
</tr>

<tr>
<td align="left">Simulator</td>
<td align="left">Configure simulated devices.</td>
</tr>

<tr>
<td align="left">Sms</td>
<td align="left">Configure SMS.</td>
</tr>

<tr>
<td align="left">Tenant management</td>
<td align="left">View, create, edit or delete subtenants.</td>
</tr>

<tr>
<td align="left">Tenant statistics</td>
<td align="left">View the usage data for this account, as shown on the Home screen of the Administration application.</td>
</tr>

<tr>
<td align="left">User management</td>
<td align="left">View or edit users, global roles and permissions.</td>
</tr>

<tr>
<td align="left">Own user management</td>
<td align="left">View or edit your own user. Note that this permission may only be applicable to technical users.</td>
</tr>
</tbody>
</table>

There may be additional permissions visible depending on the features in your subscription plan. These are documented along with the respective feature.

{{< c8y-admon-important >}}
When new features with new permissions are added to {{< product-c8y-iot >}}, these are not automatically added to existing roles. If you notice that you cannot use a new feature that was recently announced, check your permissions.
{{< /c8y-admon-important >}}

### To assign global roles {#to-assign-global-roles}

You can assign global roles to users either directly in the user list, or by opening the details page for a particular user and adding them there.

{{< c8y-admon-important >}}
By default it is not possible to change roles of SSO users (created automatically during SSO login) as those would be overridden by dynamic access mapping. However this behaviour can be changed. For more information refer to [Custom template configuration](/authentication/sso/#custom-template).
{{< /c8y-admon-important >}}

#### To assign global roles from the user list {#to-assign-global-roles-from-the-user-list}

1. Click the **Global roles** column of a particular user to open a list of global roles.
2. Select or clear the respective checkboxes.
3. Click **Apply** to save your settings.

#### To assign global roles from the user page {#to-assign-global-roles-from-the-user-page}

1. Click on the row of the respective user in the user list.
2. In the user page, select or clear the checkboxes for the relevant global roles at the right.
3. Click **Save** to save your settings.

{{< c8y-admon-important >}}
Users who are logged in via OAI-Secure will be forced to log out of the platform after switching roles. Role changes require confirmation by an administrator.
{{< /c8y-admon-important >}}
