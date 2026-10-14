---
title: Run a shell command on a device
description: Check that a device supports shell commands, find a predefined command for its device type, send the command as a c8y_Command operation, and read the result that the device returns.
weight: 270
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
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: getOperationResource
    method: GET
    path: /devicecontrol/operations/{id}
    title: Retrieve a specific operation
---

Many devices accept commands in their own command language, for example AT commands for modems or scripts on gateways. To run such a command, you send the device a `c8y_Command` operation with the command text. The device runs the command, sets the operation to SUCCESSFUL, and writes the result into the same operation. The format and the meaning of the command text are up to the device integration. The operation goes through the same statuses as any other operation, see [Send an operation to a device](/recipes/send-operation/).

In the Device Management application, you run commands in the **Shell** tab of the device, see [Shell](/device-management-application/viewing-device-details/#shell). For the device side, see [Shell](/device-integration/fragment-library/#reference) in the fragment library.

The following cases need a different procedure:

* **LWM2M devices**: A device with the fragment `c8y_IsLwm2mDevice` accepts only a fixed set of commands, see [Handling LWM2M shell commands](/device-integration/lwm2m/#handling-shell-commands).
* **Services**: To stop, start, or restart a software service on a device, send a service command instead, see [Service commands](/device-management-application/managing-device-services/#service-commands).

{{< c8y-admon-important >}}
When you operate machinery remotely, make sure that all remote operations follow the safety standards and do not cause any harm.
{{< /c8y-admon-important >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device and the predefined commands: ROLE_INVENTORY_READ
* To send the command: ROLE_DEVICE_CONTROL_ADMIN
* To read the result: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device and `<operation_id>` for the ID of the operation.

### To check that the device supports shell commands {#to-check-that-the-device-supports-shell-commands}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the managed object. Check the following:

* The fragment `c8y_IsDevice` is present.
* The array `c8y_SupportedOperations` contains `"c8y_Command"`.
* The fragment `c8y_IsLwm2mDevice` is not present.

If `c8y_Command` is missing, do not send a command. No agent executes the operation. Do not send the operation to find out whether the device supports it.

### To find a predefined command {#to-find-a-predefined-command}

Predefined commands for a device type are stored in managed objects of type `c8y_DeviceShellTemplate`. The Device Management application shows them as **Predefined commands** in the **Shell** tab. Skip this procedure if you already have the command text.

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with a query for the device type, here `c8y_Linux`:

```http
GET /inventory/managedObjects?query=$filter=(type eq 'c8y_DeviceShellTemplate' and deviceType eq 'c8y_Linux')&pageSize=1000
```

Encode the spaces in the query as `%20`. The platform returns HTTP 200 and the matching objects in the `managedObjects` array. Each object has a `templates` array. Each entry of this array has a `name` and the command `text`. Use the `text` of one entry as the command text.

If the `managedObjects` array is empty, no predefined commands exist for this device type. Use your own command text.

### To send the command {#to-send-the-command}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Execute shell command",
  "c8y_Command": {
    "text": "get sw.version; get hw.version"
  }
}
```

The property `c8y_Command.text` is mandatory and contains the command text.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422, the device does not exist, or neither the device nor one of its parent devices is an agent.

### To read the result {#to-read-the-result}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request every 5 seconds until the `status` is SUCCESSFUL or FAILED, for example for at most 2 minutes:

* **SUCCESSFUL**: The property `c8y_Command.result` contains the result of the command as a string, for example `"1.2.3; 9.8.7"`. If the property is missing, the device completed the operation without a result.
* **FAILED**: The `failureReason` property describes why the command failed.

If the operation is still PENDING or EXECUTING after the timeout, see [To follow the status of the operation](/recipes/send-operation/#to-follow-the-status-of-the-operation). To cancel an operation that stays PENDING, see [To cancel a pending operation](/recipes/send-operation/#to-cancel-a-pending-operation).
