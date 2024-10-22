---
weight: 20
title: Time series migration
layout: redirect
---

Tenant administrator users can schedule their tenant or any subtenant for time series collection migration. The time series format of measurements brings the following benefits:

* better performance for measurements queries,
* less storage consumption.

Note that certain limitations are induced in the API which are described in [Enhanced time series support](#enhanced-time-series-support).

{{<c8y-admon-req>}}
The user must have following permissions for "Tenant management":
* To view all tenants: READ permission.
* To perform migration activity: ADMIN permission.
{{</c8y-admon-req>}}

### To trigger time series migration {#to-trigger-time-series-migration}

To start the tenant migration follow the steps below:

1. Navigate to **Migration > Time series** in the application where the plugin is installed. By default this is the Administration application.
2. Select the tenant you want to trigger the migration for from the list of available tenants.
3. Hover over the row of the tenant in the tenant list, then click **Add to queue** and confirm the operation. The tenant migration status should be updated to **Queued**, which means that tenant is added into the migration queue.

{{< c8y-admon-important >}}
You can add more than one tenant into the migration queue, but the migration is executed only for one tenant at a time. The migration of the next tenant in the queue will not start until you approve the previously migrated tenant to transition from **Verified** to **Complete** status.
{{< /c8y-admon-important >}}

4. When the migration process is triggered its status for the tenant changes from **Queued** to **In progress**.
After the data is processed, verified and migrated to the new collection the status of the migration changes to **Verified** and the **Approve and finish migration** button is visible in the **Ongoing migration** section and in the tenant list on hovering over the tenant row. Click **Approve and finish migration** to confirm the process.
5. A confirmation pop-up shows up providing the following information:
* The new format for time series measurements, which is used after confirming the data migration process.
* That after seven days the legacy collection is removed.
* That the action of approval is irreversible. 
Click **Confirm**. This will change the status of the migration to **Approved**.
6. After seven days, the legacy measurements collection is going to be deleted and the migration status will change to **Completed**.

{{< c8y-admon-info >}}
The migration of measurements can be cancelled when a tenant has the status **Queued**. After the status is changed to **In progress**, the process can no longer be stopped. However, if the user do not approve the migration manually when it's in the **Verified** state the migration progress stops.
{{< /c8y-admon-info >}}

### Migration states {#migration-states}
|State|Managable by user|Description|
|:-----|:-----|:------|
|Legacy measurements|yes|state which indicates that tenant is not being migrated yet. In case if tenant is using legacy measurements, it will be scheduled for migration.|
|Queued|yes|state which indicates that tenant is being added to the migration queue. Such tenant is available to be picked up by migration service to perform the activity. It is possible to **Cancel migration** from this state.|
|In progress|no| The state indicates that migration of measurements collection is currently in progress.|
|Migrated|no| Indicates that the migration of the measurements collection is done.|
|Verifying|no| Indicates that the verification of the migrated data is in progress.|
|Verified|yes| Indicates that all migration processes are completed and user approval is required.|
|Completed|no|Indicates that the migration is completed and the legacy collection is removed in 7 days.|
|Failed|no| Indicates that an error occurred during the migration process. The information provided in the error message should be forwarded together with the support ticket.|

### Description and progress monitoring {#description-and-progress-monitoring}

**Time series migration** page is divided into 2 sections.
The top one is called **Ongoing migration** and represents data of selected tenant with enabled ongoing migration. This section is designed for monitoring the progress and controlling the process by user by interacting with buttons, which context and availability differs from the tenant's migration status. Section is populated with the information only after the migration is started and is in the **In progress** state.

Here, you can see: 
* **Tenant** field with tenant name which idicates the tenant the migration process is triggered for.
* **Requested by** field shows the user name who started the migration. 
* **Migration range** expose date range, where start date is the date of the oldest measuremet to migrate and end date is the date of the newest measurement (it's also the point in time when migration was started).
*  Loader bar on the right side consists of status (visual progress in percentage indicating how much data has already been migrated to the new collection), state (visual presentation of current state) and buttons for the user to interact with the migration.

Under the **Ongoing migration** section is located **Tenants** list, second part of the **Time series migration** page.
This area displays a list of subtenants in the table grid with more detail information about each subtenant and it's current migration status.
In this section user can select the tenant to enable migration for.

For each tenant following information is displayed: 
* **Tenant** - value of tenant id.
* **ID** - value of tenant id. 
* **Domain** - value of tenant domain.
* **Parent tenant ID** - value of parent tenant id. 
* **Status** - current state of migration for given tenant.
* **RequestedDate** - date when tenant being added to queue for migration.
* **RequestedBy** - tenant id and tenant user which requested migration
* **ApprovedDate** - date when migration being approved by administrator.
* **ApprovedBy** - tenant id and tenant name of the user which approved the migration.

After hoverover on the tenant row user can see one of three buttons according to migration state to controll the flow:
* **Add to queue** if tenant has **Legacy measurement** state.
* **Cancel migration** if tenant is in **Queued** state.
* **Approve and finish migration** if the tenant has **Verified** state and progress is parked until the user approve the continuation of the migration flow

The same buttons are available on loader bar in **Ongoing migration** section except **Add to queue**, adding a new tenant to the migration queue is possible only from tenant list. 
