---
title: Send an operation to a device
description: Check that a device supports an operation, create the operation, follow it until the device reports SUCCESSFUL or FAILED, and cancel an operation that stays PENDING.
weight: 295
sector:
  - recipes
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: getOperationResource
    method: GET
    path: /devicecontrol/operations/{id}
    title: Retrieve a specific operation
  - operation: getOperationCollectionResource
    method: GET
    path: /devicecontrol/operations
    title: Retrieve a list of operations
  - operation: putOperationResource
    method: PUT
    path: /devicecontrol/operations/{id}
    title: Update a specific operation status
---

Operations control devices remotely, for example to restart a device, to install software, or to run a shell command. You create an operation in the platform, and the device picks it up, executes it, and reports the result.

### How an operation moves through its statuses {#how-an-operation-moves-through-its-statuses}

Every operation has one of the following statuses:

* **PENDING**: The platform created the operation. No device has picked it up yet.
* **EXECUTING**: The device picked up the operation and runs it.
* **SUCCESSFUL**: The device completed the operation.
* **FAILED**: The operation did not complete. The `failureReason` property describes why.

The platform sets PENDING when you create the operation. The device sets all other statuses. SUCCESSFUL and FAILED are final.

A device only executes an operation if both of the following conditions apply:

* The device, or one of its parent devices, is an agent. That means its managed object has the fragment `com_cumulocity_model_Agent`. Otherwise, the platform rejects the operation with HTTP 422.
* The device lists the operation in its `c8y_SupportedOperations` fragment. Otherwise, no agent picks up the operation, and it stays PENDING.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and cancel operations: ROLE_DEVICE_CONTROL_ADMIN
* To read operations: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device and `<operation_id>` for the ID of the operation. They restart the device with the `c8y_Restart` operation.

### To check that the device supports the operation {#to-check-that-the-device-supports-the-operation}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

Check the following properties in the response:

* The fragment `c8y_IsDevice` is present.
* The array `c8y_SupportedOperations` contains the operation, for example `"c8y_Restart"`.

If the operation is missing in `c8y_SupportedOperations`, do not create it. The device does not execute it.

### To create the operation {#to-create-the-operation}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Restart device",
  "c8y_Restart": {}
}
```

The operation fragment, here `c8y_Restart`, contains the parameters of the operation. A restart has no parameters, so the fragment is empty. Do not send a `status`. The platform sets it.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422, the device is not an agent, and none of its parent devices is an agent.

### To follow the status of the operation {#to-follow-the-status-of-the-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request every 5 seconds until the `status` is SUCCESSFUL or FAILED. Stop after a timeout that fits the operation, for example 2 minutes for a restart:

* **SUCCESSFUL**: The device completed the operation.
* **FAILED**: The response contains a `failureReason`.
* **Still PENDING after the timeout**: No agent picked up the operation. The device is offline, or it does not listen for this operation. Cancel the operation, see [To cancel a pending operation](#to-cancel-a-pending-operation).
* **Still EXECUTING after the timeout**: The device started the operation but did not report a result. Do not cancel the operation, because the device can still complete it.

### To list the operations of a device {#to-list-the-operations-of-a-device}

Send a [Retrieve a list of operations](https://{{< domain-c8y >}}/api/core/#operation/getOperationCollectionResource) request:

```http
GET /devicecontrol/operations?deviceId=<device_id>&status=PENDING
```

You can filter by `deviceId`, `status`, `fragmentType`, `agentId`, `bulkOperationId`, `dateFrom`, and `dateTo`. The platform returns the operations in the order of their IDs.

To find a pending restart of a device, combine the filters, for example `deviceId=<device_id>&status=PENDING&fragmentType=c8y_Restart`.

### To cancel a pending operation {#to-cancel-a-pending-operation}

The platform has no separate cancel request. To cancel an operation, set its status to FAILED.

Send an [Update a specific operation status](https://{{< domain-c8y >}}/api/core/#operation/putOperationResource) request:

```http
PUT /devicecontrol/operations/<operation_id>
Content-Type: application/json
Accept: application/json

{
  "status": "FAILED",
  "failureReason": "Canceled by operator"
}
```

The platform returns HTTP 200 and the operation with `"status": "FAILED"`. If the platform returns HTTP 422, the operation already completed with SUCCESSFUL and you cannot change it.

In the Device Management application, you can cancel pending operations in the **Control** tab of the device, see [Working with operations](/device-management-application/monitoring-and-controlling-devices/#to-cancel-pending-single-operations).
