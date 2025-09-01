---
weight: 40
title: Setting up Dremio users
layout: redirect
helpcontent:
- label: setting-up-dremio-users
  title: Managing users
  content: "In the initial configuration the **Dremio API user** is configured, which
    is required to interact with Dremio. This user can also be used to directly interact
    with Dremio in applications, using the credentials in combination with JDBC, ODBC,
    or REST API.\n\nSome use cases might require more than one Dremio user for the
    interaction with Dremio. For that purpose, **additional Dremio users** can be
    added. You can optionally assign each user permissions for the data lake source
    and the space, so that the user can manage grants on source and space for other
    users as well. In Dremio the source connects to the data lake while the space
    provides artifacts like views.\n\nClick **Add user** to create a new Dremio user.
    The user list comprises all configured Dremio users with options to edit or delete
    them."
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:40Z'
---
In the [initial configuration](/datahub/setting-up-datahub/#setting-up-initial-configuration) of {{< product-c8y-iot >}} DataHub, the Dremio API user is configured. This user is required for the proxy REST API, which allows you to interact with Dremio using {{< product-c8y-iot >}} DataHub. This user can also be used to directly interact with Dremio in applications, using JDBC, ODBC, or REST API.

Some use cases might require more than one Dremio user for the interaction with Dremio. For that purpose, additional Dremio users can be added.

{{< c8y-admon-req >}}
You need administration permissions to configure Dremio users. See [Defining {{< product-c8y-iot >}} DataHub permissions and roles](/datahub/setting-up-datahub#defining-permissions) for details.
{{< /c8y-admon-req >}}

### Overview of Dremio users {#overview-of-dremio-users}
In the navigator, select **Dremio users** under **Settings** to get an overview of all Dremio users created by an administrator of your {{< product-c8y-iot >}} DataHub tenant.

The list of Dremio users with their corresponding properties is displayed. The context menu of each user provides actions to edit or delete a user.

If the initial configuration has not been completed yet, no users are shown. If the initial configuration has been completed, the list includes the Dremio API user configured in the initial configuration.

### Properties of a Dremio user {#properties-of-a-dremio-user}

#### Username {#username}
The username is a mandatory setting. It must be a unique value, that is, no other Dremio user has the same username. It consists of the tenant ID plus forward slash and a string with a minimum length of three, starting with a character, and consisting of numbers, characters, dash, or underline. For example, the username may be `t47110815/myUser`.

#### First name, last name, and email {#first-name-last-name-and-email}
The first name, last name, and email of a Dremio user are optional settings.

#### Permissions for data lake and space {#permissions-for-data-lake-and-space}
During the initial configuration of {{< product-c8y-iot >}} DataHub, a so-called source in Dremio is created, which connects Dremio with the data lake. Additionally, a so-called space is created in Dremio, in which Dremio artifacts like views can be organized.

The Dremio user can be assigned additional permissions for the data lake source and the space. If the user has the permission for the data lake source assigned, the user can manage grants on that source for other users as well. The same applies to the space permission. Data lake permission and space permission are independent of each other; the setting of one permission does not affect the setting of the other.

Having the corresponding permission assigned, the user can grant other Dremio users, which do not necessarily relate to {{< product-c8y-iot >}} DataHub, different permissions on the data lake source or the space, for example, for reading data from the data lake or creating a table in the data lake.

{{< c8y-admon-caution >}}
Granting permissions to other users should be done very carefully in order to avoid that sensitive information is exposed to the wrong users. In particular, permissions should never be granted to all users as in that case all Dremio users of the {{< product-c8y-iot >}} instance can access the data lake source or space respectively. For that reason, the system regularly checks for each tenant whether its resources are accessible by all other tenants. If that is the case, the permissions are automatically restricted. Additionally, an alarm is generated whose type is defined as *CDH_privilegeGrantedToPublicOn_* followed by the name of the asset being exposed. 
{{< /c8y-admon-caution >}}

For example, IoT data has been offloaded to the data lake using {{< product-c8y-iot >}} DataHub. A data scientist from a different business unit now wants to access the data lake contents. A Dremio account must be created for the data scientist. Then, a Dremio user created by {{< product-c8y-iot >}} DataHub, having the data lake permission, grants read access on the data lake source to the Dremio account of the data scientist.

{{< c8y-admon-info >}}
Dremio refers to the permissions as [privileges](https://docs.dremio.com/current/security/rbac/privileges/). Privileges include for example SELECT, ALTER, CREATE TABLE, or DROP. A Dremio user with the corresponding permissions can grant permissions to other users via the Dremio UI. In the UI, browse to the data lake or space and select **Edit details** in the context menu. In the editor, the list of privileges for all users is shown, with the option to update privileges and users. Alternatively, you can use the [Dremio SQL API](https://docs.dremio.com/current/reference/sql/commands/rbac) to modify privileges.
{{< /c8y-admon-info >}}

For each user, including the Dremio API user, the `manage grants` permissions on data lake and space are initially not set.

#### Password {#password}
The password must have at least 8 characters with at least one letter and one number.

### Adding a Dremio user {#adding-a-dremio-user}
To add a Dremio user, select **Dremio users** under **Settings** and click **Add user** at the right of the top menu bar. In the editor, provide the corresponding Dremio user properties.

Click **Save** to save the settings and create the new user. Click **Cancel** to cancel the creation of the user.

### Editing a Dremio user {#editing-a-dremio-user}
The **Dremio user** section under **Settings** displays the list of users. For each user, there is a context menu on the right side. Select **Edit** from that menu to edit a user. Except for the username, all settings can be changed. The password can also optionally be changed by clicking **Change password**. Click **Save** to apply the new settings.

### Deleting a Dremio user {#deleting-a-dremio-user}
In the context menu of the Dremio user list, select **Delete** and click **Confirm** in the subsequent confirmation dialog to delete a Dremio user. The Dremio API user defined in the initial configuration cannot be deleted that way. This user can only be deleted if the settings under **Initial configuration** are deleted. In the latter case, all Dremio users associated with this {{< product-c8y-iot >}} DataHub instance are deleted.
