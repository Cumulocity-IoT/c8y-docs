---
weight: 20
title: Time series migration
layout: redirect
---

Tenant administrator user can schedule his tenant or any subtenant for time series collection migration. To have functionality available tenant should be subscribed to **Timeseries-migration** microservice and **c8y-timeseries-migration-plugin** extension should be subscribed for custom application. 

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
You can add more than one tenant into the migration queue, but migration is executed only for one tenant at a time. It means that the migration of the next tenant in the queue will not start until you approve the previously migrated tenant to transition from **Verified** to **Complete** status.
{{< /c8y-admon-important >}}

4. When the migration process is triggered its status for the tenant changes from **Queued** to **In progress**.
After the data is processed, verified and migrated to the new collection status of migration should be updated to **Verified** and **Approve and finish migration** button should be visible in 2 parts of the page in **Ongoing migration** section and in tenant list section after hoveover the tenant row. So now the user can confirm progress and click the button **Approve and finish migration**.
5. A confirmation pop-up shows up providing the following information:
* the new format for time series measurements, which is going to be used after confirming the data migration process.
* after seven days the legacy collection is removed.
* the action of approval is irreversible. 
If the user agreeds with the progress of the process **Confirm** button should be clicked.
Accepting the confirmation pop-up changes the status of the migration to **Approved**.
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
|Migrated|no| The state indicates that migration of measurements collection is done.|
|Verifying|no| The state indicates that verification of migrated data is in progress.|
|Verified|yes| The state indicates that all migration processes are finished and user approval is required to acknowledge it.|
|Completed|no|The state indicates that migration finished and legacy collection is going to be removed within next 7 days.|
|Failed|no| The state indicates that an error occurred during migration process. The information provided in error message should be forwarded together with support ticket.|

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
