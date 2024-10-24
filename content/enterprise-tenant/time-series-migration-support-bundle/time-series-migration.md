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
To have this functionality available the tenant must be subscribed to the Timeseries-migration microservice.
The Administration application must have subscribed the extension c8y-timeseries-migration-plugin.

The user must have following permissions for "Tenant management":

- To view all tenants: READ permission.
- To perform migration activity: ADMIN permission.
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
6. After seven days the legacy measurements collection is deleted and the migration status changes to **Completed**.

{{< c8y-admon-info >}}
The migration of measurements can be cancelled when a tenant has the status **Queued**. After the status is changed to **In progress**, the process can no longer be stopped. However, if the user does not approve the migration manually when it's in the **Verified** state the migration progress stops.
{{< /c8y-admon-info >}}

### Migration states {#migration-states}

|State|Managable by user|Description|
|:-----|:-----|:------|
|Legacy measurements|yes|Indicates that the tenant is not being migrated yet. If the tenant uses legacy measurements, it will be scheduled for migration.|
|Queued|yes|Indicates that the tenant is added to the migration queue. Tenants in this state can be picked up for migration. It is possible to **Cancel migration** from this state.|
|In progress|no| Indicates that the migration of the measurements collection is currently in progress.|
|Migrated|no| Indicates that the migration of the measurements collection is done.|
|Verifying|no| Indicates that the verification of the migrated data is in progress.|
|Verified|yes| Indicates that all migration processes are completed and user approval is required.|
|Completed|no|Indicates that the migration is completed and the legacy collection is removed in 7 days.|
|Failed|no| Indicates that an error occurred during the migration process. The information provided in the error message should be forwarded together with the support ticket.|

### Description and progress monitoring {#description-and-progress-monitoring}

**Time series migration** page is divided into 2 sections.
The top one is called **Ongoing migration** and displays current state of ongoing migration for respective tenant. This section provides controls over active process. The information is displayed only after the migration is started and is in one of the progressing states (In progress, Migrated, Verifying, Verified).

Here you can see the following information:

- **Tenant** - Tenant name of the tenant the migration process is triggered for.
- **Requested by** - Name of the user that started the migration.
- **Migration range** expose date range, where start date is the date of the oldest measuremet to migrate and end date is the date of the newest measurement (it's also the point in time when migration was started).
  **Migration status** - bar displayed on the right is multipurpose. Depending on state it provides either visual information on the actual state of the ongoing process or allows to control certain process states. For details of states, see [Migration states](/#migration-states).

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
- **Add to queue** - To assign the tenant to the migration queue when it is in **Legacy measurement** state
- **Cancel migration** - To resign tenant from migration queue when it is in **Queued** state. Note that when progress starts, it is not possible to resign from migration.
- **Approve and finish migration** - To approve the migration when it is in **Verified** state. Note that no other migration will start if there is a tenant pending acceptance.
