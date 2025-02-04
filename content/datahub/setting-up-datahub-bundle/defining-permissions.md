---
weight: 20
title: Defining Cumulocity DataHub permissions and roles
layout: redirect
---

Dedicated permissions define what a user is allowed to do in {{< product-c8y-iot >}} DataHub. To ease assigning permissions to users, permissions are grouped in roles. During deployment of the {{< product-c8y-iot >}} DataHub applications the corresponding permissions as well as roles are created. If a role with the same name already exists, no new role will be created. The same holds for permissions.

If you do not have corresponding {{< product-c8y-iot >}} DataHub permissions, you will get a warning after login.

{{< c8y-admon-important >}}
When offloading the inventory/events/alarms/measurements collection, {{< product-c8y-iot >}} DataHub does not incorporate access limitations for these collections as set in the {{< product-c8y-iot >}} platform. In particular, [inventory roles](/standard-tenant/managing-permissions/#inventory-roles) defining permissions to device groups are not incorporated in the offloading process. As a consequence, a user with {{< product-c8y-iot >}} DataHub permissions can access all data in the data lake irrespective of access restrictions the user has on the base collections.
{{< /c8y-admon-important >}}

### {{< product-c8y-iot >}} DataHub roles and permissions {#datahub-roles-and-permissions}

#### {{< product-c8y-iot >}} DataHub administrator {#datahub-administrator}
The administrator primarily sets up the data lake and Dremio account and conducts administrative tasks like inspecting audit logs or monitoring the system status. The administrator can also manage offloading pipelines, for example, defining and starting a pipeline.

For those tasks the default role DataHub Administrator is created. The permissions for this role are defined as follows:

|Type|READ|ADMIN|
|:---|:---|:---|
|DataHub administration|yes|yes|
|DataHub management|yes|yes|
|DataHub query|yes|no|

While READ refers to reading the specific data, ADMIN refers to creating, updating, or deleting the specified data.

#### {{< product-c8y-iot >}} DataHub manager {#datahub-manager}
The manager manages offloading pipelines such as defining and starting a pipeline. For those tasks the default role DataHub Manager is created. The permissions for this role are defined as follows:

|Type|READ|ADMIN|
|:---|:---|:---|
|DataHub administration|no|no|
|DataHub management|yes|yes|
|DataHub query|yes|no|

#### {{< product-c8y-iot >}} DataHub user {#datahub-user}
The user executes SQL queries against the data in the data lake. For details on querying the data lake see [Querying offloaded {{< product-c8y-iot >}} data](/datahub/working-with-datahub#querying-offloaded). To execute queries the following approaches can be used:

* Dremio UI: The Dremio account defined in [Setting up Dremio users](/datahub/setting-up-datahub/#setting-up-dremio-users) is used for logging into the Dremio UI and executing queries within that UI.
* Dremio API: Queries can also be executed using the Dremio REST API. The Dremio account defined in [Setting up Dremio users](/datahub/setting-up-datahub/#setting-up-dremio-users) is used for authenticating the requests against that API. Directly invoking Dremio APIs is discouraged; they might be removed or changed at any time without prior notice.
* {{< product-c8y-iot >}} DataHub proxy API: {{< product-c8y-iot >}} DataHub provides an API which proxies requests to the Dremio API. The {{< product-c8y-iot >}} user needs the role DataHub Reader in order to execute queries using the proxy API. The authentication against Dremio is done behind the scenes.

The permissions for the role DataHub Reader are defined as follows:

|Type|READ|ADMIN|
|:---|:---|:---|
|DataHub administration|no|no|
|DataHub management|no|no|
|DataHub query|yes|no|

### Assignment of {{< product-c8y-iot >}} DataHub roles and permissions {#assignment-of-datahub-roles-and-permissions}
The roles DataHub Administrator, DataHub Manager, and DataHub Reader must be assigned to the respective users of your tenant. For assigning roles to users see [Managing permissions](/standard-tenant/managing-permissions/). You need at least one user with the DataHub Administrator role to complete the {{< product-c8y-iot >}} DataHub configuration.

{{< c8y-admon-info >}}
You do not necessarily need to use the predefined roles to enable {{< product-c8y-iot >}} users to work with {{< product-c8y-iot >}} DataHub. Alternatively, you can modify other roles the users are associated with and add the corresponding permissions to those roles. In that case you also must add the DataHub application to the user's applications.
{{< /c8y-admon-info >}}
