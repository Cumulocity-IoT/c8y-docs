---
title: Run a bulk operation on a device group
description: Schedule an operation for every device of a group as a bulk operation, monitor its progress, retry the operations that failed, and cancel a bulk operation.
weight: 380
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: postBulkOperationCollectionResource
    method: POST
    path: /devicecontrol/bulkoperations
    title: Create a bulk operation
  - operation: getBulkOperationResource
    method: GET
    path: /devicecontrol/bulkoperations/{id}
    title: Retrieve a specific bulk operation
  - operation: getOperationCollectionResource
    method: GET
    path: /devicecontrol/operations
    title: Retrieve a list of operations
  - operation: deleteBulkOperationResource
    method: DELETE
    path: /devicecontrol/bulkoperations/{id}
    title: Delete a specific bulk operation
---

A bulk operation distributes one operation to all devices of a group, for example a restart, a firmware update, or a device profile. From a start date on, the platform creates one single operation for each device of the group and waits a configured delay between two operations. Each single operation then follows the lifecycle in [Send an operation to a device](/skills/send-operation/).

Bulk operations are an asynchronous, best-effort mechanism, not a precision scheduler. The exact creation and delivery times of the single operations can vary.

Bulk operations work with static groups and dynamic groups. Every device of the group must list the operation in its `c8y_SupportedOperations` fragment. Otherwise, its single operation stays PENDING.

### How a bulk operation moves through its statuses {#how-a-bulk-operation-moves-through-its-statuses}

A bulk operation has two statuses and a progress counter:

* `status`: The processing status. A new bulk operation is ACTIVE, then IN_PROGRESS. It is COMPLETED when the platform has created all single operations. A canceled bulk operation is DELETED.
* `generalStatus`: The result as users see it. It is SCHEDULED, then EXECUTING or EXECUTING_WITH_ERRORS, and finally SUCCESSFUL, FAILED, or CANCELED.
* `progress`: The number of single operations in each state: `pending`, `executing`, `successful`, `failed`, and `all`.

A bulk operation is finished when its `status` is COMPLETED and `progress.all` equals `progress.successful` plus `progress.failed`.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create, retry, and cancel bulk operations: ROLE_BULK_OPERATION_ADMIN
* To read bulk operations: ROLE_BULK_OPERATION_READ
* To read the group: ROLE_INVENTORY_READ
* To read the single operations: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<group_id>` for the ID of the device group, `<bulk_operation_id>` for the ID of the bulk operation, and `<start_date>` for the date and time when the platform starts to create the single operations. They restart the devices with the `c8y_Restart` operation.

### To check the device group {#to-check-the-device-group}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<group_id>
```

Check that the `type` of the response is `c8y_DeviceGroup` for a static group or `c8y_DynamicGroup` for a dynamic group. If the platform returns HTTP 404, the group does not exist. The group ID is the `id` that the platform assigned to the group, not its name.

### To create the bulk operation {#to-create-the-bulk-operation}

Send a [Create a bulk operation](https://{{< domain-c8y >}}/api/core/#operation/postBulkOperationCollectionResource) request:

```http
POST /devicecontrol/bulkoperations
Content-Type: application/json
Accept: application/json

{
  "groupId": "<group_id>",
  "startDate": "<start_date>",
  "creationRamp": 1,
  "operationPrototype": {
    "description": "Restart device",
    "c8y_Restart": {}
  }
}
```

The request has the following properties:

* `groupId`: The ID of the device group.
* `startDate`: The date and time when the platform starts to create the single operations, in ISO 8601 format with a time zone, for example `2026-11-02T22:00:00.000Z`.
* `creationRamp`: The delay in seconds between the creation of two single operations.
* `operationPrototype`: The operation that the platform creates for each device. It contains the `description` and the operation fragment with its parameters, as in a single operation.

The platform returns HTTP 201 and the bulk operation with its `id` and `"status": "ACTIVE"`. Note the `id` as `<bulk_operation_id>`.

If the platform returns HTTP 422, the request is invalid, for example because it contains both `groupId` and `failedParentId`.

### To monitor the progress {#to-monitor-the-progress}

Send a [Retrieve a specific bulk operation](https://{{< domain-c8y >}}/api/core/#operation/getBulkOperationResource) request:

```http
GET /devicecontrol/bulkoperations/<bulk_operation_id>
```

Repeat the request every 5 seconds until the bulk operation is finished. Choose a timeout that fits the number of devices and the creation ramp. Then check the `generalStatus`:

* **SUCCESSFUL**: All single operations are SUCCESSFUL.
* **FAILED** or **EXECUTING_WITH_ERRORS**: Some single operations failed. You can retry them, see [To retry the failed operations](#to-retry-the-failed-operations).
* **CANCELED**: The bulk operation was canceled.

If `progress.pending` is still greater than 0 after the timeout, no agent handles the operations. Check `c8y_SupportedOperations` of the devices. To stop the bulk operation, see [To cancel a bulk operation](#to-cancel-a-bulk-operation).

To see which devices failed, send a [Retrieve a list of operations](https://{{< domain-c8y >}}/api/core/#operation/getOperationCollectionResource) request for the single operations of the bulk operation:

```http
GET /devicecontrol/operations?bulkOperationId=<bulk_operation_id>&status=FAILED
```

Each operation in the response contains the `deviceId` and the `failureReason`.

### To retry the failed operations {#to-retry-the-failed-operations}

Send a [Create a bulk operation](https://{{< domain-c8y >}}/api/core/#operation/postBulkOperationCollectionResource) request with `failedParentId` instead of `groupId`:

```http
POST /devicecontrol/bulkoperations
Content-Type: application/json
Accept: application/json

{
  "failedParentId": "<bulk_operation_id>",
  "startDate": "<start_date>",
  "creationRamp": 1,
  "operationPrototype": {
    "description": "Restart device",
    "c8y_Restart": {}
  }
}
```

The new bulk operation creates single operations only for the devices whose operations failed in the bulk operation `<bulk_operation_id>`. Do not send `groupId`, because `groupId` and `failedParentId` are mutually exclusive.

The platform returns HTTP 201 and the new bulk operation with its own `id`. Monitor it like the first one.

If the platform returns HTTP 422, the bulk operation `<bulk_operation_id>` has no failed operations, or the request contains both `groupId` and `failedParentId`. If it returns HTTP 404, the bulk operation `<bulk_operation_id>` does not exist.

### To cancel a bulk operation {#to-cancel-a-bulk-operation}

You can cancel a bulk operation until its `status` is COMPLETED, that is, until the platform has created all single operations.

Send a [Delete a specific bulk operation](https://{{< domain-c8y >}}/api/core/#operation/deleteBulkOperationResource) request:

```http
DELETE /devicecontrol/bulkoperations/<bulk_operation_id>
```

The platform returns HTTP 204 and creates no more single operations. Single operations that already exist remain. To cancel those that are still PENDING, see [To cancel a pending operation](/skills/send-operation/#to-cancel-a-pending-operation). If the platform returns HTTP 404, the bulk operation does not exist or is already deleted.

In the Device Management application, you can manage bulk operations in the **Bulk operations** tab, see [Working with operations](/device-management-application/monitoring-and-controlling-devices/#to-view-bulk-operations).
