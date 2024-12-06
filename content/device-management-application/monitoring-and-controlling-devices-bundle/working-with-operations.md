---
weight: 50
title: Working with operations
layout: redirect
helpcontent:
- label: to-view-single-operations
  title: Single operations
  content: "Using operations, you can control devices remotely. **Single operations** show all operations executed on a single device.


  Single operations can have one of the following four statuses: PENDING, EXECUTED, SUCCESSFUL, FAILED. For each operation, the name, status, and device is provided. Clicking the device leads you to the detailed view of the particular device."
- label: to-view-bulk-operations
  title: Bulk operations
  content: "**Bulk operations** are single operations executed on a set of devices.


  Bulk operations have an operation type, for example 'Software update' or 'Firmware update', and one of the following statuses: SCHEDULED, EXECUTING, CANCELED, COMPLETED WITH FAILURES, COMPLETED SUCCESSFULLY.


  You can filter the list of bulk operations for type, status or date. Click the arrow button at the right of a bulk operation to see its details."
---

Operations are used to remotely control devices.

You can view operations at the level of individual devices and across all devices:

* To view the operations for all devices, click **Device control** in the **Overview** menu in the navigator.
* To view the operations of a particular device, switch to the **Control** tab in the details of this device.

There are two types of operations in **Device control**, each represented by a tab:

* **Single operations** execute on a single device, see [To view single operations](#to-view-single-operations).
* **Bulk operations** comprise of the same single operation executed on a set of devices, see [To view bulk operations](#to-view-bulk-operations).

### To view single operations {#to-view-single-operations}

See the list of single operations in the **Single operations** tab.

![Single operations list](/images/users-guide/DeviceManagement/devmgmt-devicecontrol-single-operations-list.png)

Single operations can have one of the following four statuses:

| Status     | Description                                                                      |
| :--------- | :------------------------------------------------------------------------------- |
| PENDING    | The operation has just been created and is waiting for the device to pick it up. |
| EXECUTING  | The operation has been picked up by the device and is being executed.            |
| SUCCESSFUL | The operation has been successfully executed by the device.                      |
| FAILED     | The operation could not be executed by the device.                               |

In each row, the following information for an operation is provided:

| Info   | Description                                                                             |
| :----- | :-------------------------------------------------------------------------------------- |
| Status | One of PENDING, EXECUTING, SUCCESSFUL, FAILED (see above).                              |
| Name   | Name of the operation.                                                                  |
| Device | The name of the device. Clicking the name leads you to the detailed view of the device. |

Clicking a row expands it and displays further details on the operation.

* **Details**: Providing information on the operation name and status. In case of status = FAILED the reason for the failure is provided. In case the single operation is part of a [bulk operation](#to-view-bulk-operations), you can see the bulk operation details.
* **History of Changes**: Providing information on the past changes of the operation.

To filter the list of single operations by status, click one of the status buttons in the top menu bar.
Click **All** to clear the filter.

Click **Realtime** at the right of the top menu bar to see operations coming in from the devices in realtime.
Click **Reload** to update the list once manually.

{{< c8y-admon-info >}}
Single operations are listed in descending time order. Operations are executed strictly according to this order.
{{< /c8y-admon-info >}}

### To add and execute a single operation {#to-add-and-execute-a-single-operation}

Single operations can be created either from bulk operations or via the different types of operations that the device supports: [managing firmware](/device-management-application/managing-device-data/#to-manage-firmware-on-a-device), [software](/device-management-application/managing-device-data/#managing-software), [configurations](/device-management-application/managing-device-data/#managing-configurations) and more.

When you create a [bulk operation](#to-view-bulk-operations), the single operations entailed in the bulk operation are also added to the list of single operations.

Operations for a specific device can also be created and executed in the **Shell** tab of the device, see [Shell](/device-management-application/viewing-device-details/#shell).

{{< c8y-admon-important >}}
When using {{< product-c8y-iot >}} to remotely operate machinery, make sure that all remote operations follow the safety standards and do not cause any harm.
{{< /c8y-admon-important >}}

### To cancel pending single operations {#to-cancel-pending-single-operations}

To cancel a particular pending single operation, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the respective single operation entry and select **Cancel operation**.

### To create a smart rule from a single operation {#to-create-a-smart-rule-from-a-single-operation}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the single operation that you want to create a smart rule for, and select **Create smart rule**.

See [To create a smart rule](/cockpit/smart-rules/#to-create-a-smart-rule) for further steps.

### To view bulk operations {#to-view-bulk-operations}

See the list of bulk operations in the **Bulk operations** tab.

![Bulk operations list](/images/users-guide/DeviceManagement/devmgmt-devicecontrol-bulk-operations-list.png)

Bulk operations have an operation type and status.

You can add bulk operations of the following operation types with the [bulk operation wizard](#to-add-a-bulk-operation-using-the-wizard):

| Operation type       | Description                                                           |
| :------------------- | :-------------------------------------------------------------------- |
| Configuration update | The bulk operation updates the configuration of the selected devices. |
| Firmware update      | The bulk operation updates the firmware on the selected devices.      |
| Software update      | The bulk operation updates the software on the selected devices.      |
| Apply device profile | The bulk operation applies a device profile on the selected devices.  |

Bulk operations can have other operation types as well, for example when you [schedule a single operation as bulk operation](#to-schedule-a-single-operation-as-bulk-operation) and the single operation has a different operation type.

Bulk operations can have one of the following statuses:

| Status                  | Description                                                                  |
| :---------------------- | :--------------------------------------------------------------------------- |
| SCHEDULED               | The bulk operation has been created and is on hold until the scheduled time. |
| EXECUTING               | The bulk operation is being executed.                                        |
| CANCELED                | The bulk operation was created but canceled before the scheduled time.       |
| COMPLETED WITH FAILURES | The bulk operation completed with failures for some devices.                 |
| COMPLETED SUCCESSFULLY  | The bulk operation has been successfully executed on all devices.            |

In each row, the following information for a bulk operation is provided:

| Info                   | Description                                                                                                                                                |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status                 | One of SCHEDULED, EXECUTING, CANCELED, COMPLETED WITH FAILURES, COMPLETED SUCCESSFULLY (see above).                                                        |
| Name                   | Name of the operation.                                                                                                                                     |
| Progress bar           | Only for executing and completed bulk operations. Shows the operation's progress in percent.                                                               |
| Start and finish dates | Only for executing and completed bulk operations. For executing bulk operations, the finish date is an approximation based on the bulk operation settings. |
| Refresh button         | Only for executing bulk operations. Updates the progress bar.                                                                                              |

Clicking the arrow button at the right in a row expands the row and displays further details on the bulk operation.

* **Details**: Providing information on the start date, delay, status and result of the bulk operation. The result lists the number of successful, failed and pending operations. If the bulk operation is a [retry attempt for failed operations](#to-retry-failed-operations), there will be an additional row that shows the index of the bulk operation it was retried from. Click the index to scroll to that bulk operation. If a description was added when [the bulk operation has been created](#to-add-a-bulk-operation), there will be an additional row that shows this description.
* **Operation**: Providing information on the operation in the form of a JSON object.
* **Operations**: Only present for executing or completed bulk operations. Providing information on the status and the device of single operations entailed in the bulk operation. Can be filtered by status. You may also either retry all failed operations by clicking **Retry failed operations** at the top right of the **Operations** section or retry single operations by hovering over them and then clicking the **Retry operation** button that appears right next to it. Also see [To retry failed operations](#to-retry-failed-operations).
* **History of Changes**: In a second tab, providing information on the past changes of the bulk operation.

To filter the list of bulk operations by operation type, click the dropdown list in the top menu bar and select a set of operation types, then click **Apply**.
To clear the filter, select **All** in the dropdown list and click **Apply** once more.

To filter the list of bulk operations by status, click one of the status buttons in the top menu bar.
Click **All** to clear the filter.

To filter the list of bulk operations by date, select a date in both the **Date from** and **Date to** datepickers, then click **Apply** right next to it.
To clear the filter, click **Clear** right next to it.

To clear both filters, click **Reset filters** at the bottom of the list (only visible if filters are applied).

### To add a bulk operation {#to-add-a-bulk-operation}

There are two ways of creating a bulk operation:

* Use the [bulk operation wizard](#to-add-a-bulk-operation-using-the-wizard)
* [Schedule a single operation as bulk operation](#to-schedule-a-single-operation-as-bulk-operation)

#### To add a bulk operation using the wizard {#to-add-a-bulk-operation-using-the-wizard}

Follow these steps:

1. In the **Bulk operations** tab, click **New bulk operation** at the right of the top menu bar.
2. In the resulting dialog, select an operation type.
3. The resulting wizard has four steps. The first two steps differ depending on the operation type:
  * **Configuration update**
      * Select a configuration from the list. The list can be filtered by configuration type or by configuration name. Click **Next**.
      * Check the preview of the selected configuration. Click **Next**.
  * **Firmware update**
      * Select a firmware from the list. The list can be filtered by firmware name. Click **Next**.
      * Expand a version and select a patch. Click **Next**.
  * **Software update**
      * Expand a software from the list and select a version, then also choose to install/update or remove the software from the dropdown list. The list of available software can be filtered by device type, by software type or by software name. Click **Next**. If you selected software for multiple device types, a warning dialogue appears and informs you that some operations may fail due to unsupported software, and ask for confirmation.
      * Confirm the selection and click **Next**.
  * **Apply device profile**
      * Select a device profile from the list. The list can be filtered by device type or by profile name. Click **Next**.
      * Confirm the selection and click **Next**.
4. Select target devices by applying filters to the paginated list of all devices. You can filter by status, name, type, model, group, registration date and alarms. You may apply multiple filters. To apply a filter, click the column header, make your filter option choices in the context menu and click **Apply**. The group filter also allows filtering by subgroups. To select a subgroup, if there are any, click the arrow button at the right of a group and select the desired subgroups from the dropdown. You can clear all filters by clicking **Clear filters** above the list. For the operation types "configuration update", "software update" and "apply device profile", the list is already filtered by the according device type. Click **Next**.
5. Enter a new title or use the preset title. Optionally enter a description. Select a start date and a delay. The delay may either be in seconds or milliseconds and is the time spent between each single operation of the bulk operation. Click **Schedule bulk operation** to create the bulk operation.


#### To schedule a single operation as bulk operation {#to-schedule-a-single-operation-as-bulk-operation}

You can schedule a single operation as a bulk operation either from the **Single operations** tab or from a **Control** tab of a particular device.
Follow these steps:

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the right of the single operation that you want to schedule as a bulk operation and then click **Schedule as bulk operation**.
2. The resulting wizard is similar to the new bulk operation wizard described in [To add a bulk operation using the wizard](#to-add-a-bulk-operation-using-the-wizard). However, there are just two steps because the operation type is inferred from the operation that is scheduled as a bulk operation. See the description of the [full wizard](#to-add-a-bulk-operation-using-the-wizard) and follow it.

### To edit the schedule of bulk operations {#to-edit-the-schedule-of-bulk-operations}

You may only edit the schedule of bulk operations with status = SCHEDULED.

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> to the right of the bulk operation that you want to edit, and then click **Edit schedule**.
3. In the resulting dialog box you may change the **Start date** and **Delay** values.
5. Click **Reschedule** to apply your changes.

The changes are applied to the bulk operation accordingly.

### To cancel bulk operations {#to-cancel-bulk-operations}

You may only cancel bulk operations with status = SCHEDULED or EXECUTING.
If it is executing, you may only cancel the operation until all of its single operations are created.
This way, you can cancel the creation of the remaining single operations.

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> to the right of the bulk operation that you want to cancel, then click **Cancel bulk operation**.

### To retry failed operations {#to-retry-failed-operations}

You may retry the failed operations of a bulk operation that is either executing or completed with failures.

To do so, expand the desired bulk operation, then click **Retry failed operations** under **Operations** to create a new bulk operation with all failed operations.
To retry a single operation, hover over the operation and click **Retry operation**.
This will create a new single operation.

For a bulk operation that completed with failures, you may also click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> to the right of the operation, then click **Retry failed operations**.

### To manually set failed bulk operations to successful {#to-manually-set-failed-bulk-operations-to-successful}

You may manually set a failed bulk operation to the status SUCCESSFUL.

To do so, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> to the right of the bulk operation, then click **Set operation to successful**.

This may be useful if the operation is generally a success, but contains operation failures on devices that are not too important. These failures would otherwise still leave the bulk operation in status FAILED.

{{< c8y-admon-info >}}
**Calculation of completion percentage**

The completion percentage is determined by comparing the total number of initiated operations to the number of operations that have reached a final state (success or failure). The total count is established at operation creation and remains static thereafter. This static value may lead to inaccuracies in the completion percentage if the overall number of operations subsequently changes.

* **Operation removal**: Operations can be implicitly removed when their associated devices are deleted. This deletion goes unaccounted for in the completion percentage calculation.
* **Operation addition**: Retrying failed operations can introduce new entries without modifying the original total count. This again results in a misrepresentation of the completion percentage.

The completion percentage is calculated based on the information available at the time an operation is created and further changes are not applied.
{{< /c8y-admon-info >}}
