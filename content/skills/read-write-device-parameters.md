---
title: Read and write device parameters
description: Read a device parameter from the device managed object, send a new value to the device with a c8y_ParameterUpdate operation, and check the value that the device reports back.
weight: 710
sector:
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
  - operation: getEventCollectionResource
    method: GET
    path: /event/events
    title: Retrieve all events
---

A device parameter is a fragment on the device managed object, for example `"reportingInterval": 60`. You read a parameter from the managed object. To change it, you create a `c8y_ParameterUpdate` operation:

1. The device picks up the operation and applies the new value.
2. The device reports the value with an event of the type `c8y_ParameterUpdate`, see [Device parameter](/device-integration/fragment-library/#parameter-status).
3. The device-parameter microservice copies the reported value to the device managed object.

The device-parameter microservice only copies the value if the property definition of the parameter in the Digital Twin Manager allows the asset context, or if the parameter has no property definition. To check the definition, see [Inspect the definition of a device parameter](/skills/inspect-parameter-definitions/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device: ROLE_INVENTORY_READ
* To create the operation: ROLE_DEVICE_CONTROL_ADMIN
* To read the operation: ROLE_DEVICE_CONTROL_READ
* To read the parameter update events: ROLE_EVENT_READ

Your tenant is subscribed to the microservices `device-parameter` and `dtm`. The **Parameters** tab of the device needs both.
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device and `<operation_id>` for the ID of the operation. They set the parameter `reportingInterval` to 60.

### To read a parameter {#to-read-a-parameter}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the device. Check the following properties in the response:

* The fragment `reportingInterval` contains the current value of the parameter. If the fragment is missing, the device never reported this parameter. You can still set it.
* The array `c8y_SupportedOperations` contains `"c8y_ParameterUpdate"`. If it is missing, do not create the operation. No agent picks it up.

If the platform returns HTTP 404, the device does not exist.

### To send a new value to the device {#to-send-a-new-value-to-the-device}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Update parameter 'reportingInterval'",
  "c8y_ParameterUpdate": {},
  "c8y_ParameterUpdate_reportingInterval": {},
  "reportingInterval": 60
}
```

The operation has three fragments. In the list, `<parameter_key>` stands for the fragment name of the parameter, here `reportingInterval`:

* `c8y_ParameterUpdate`: An empty marker fragment for parameter updates.
* `c8y_ParameterUpdate_<parameter_key>`: An empty marker fragment for the parameter.
* `<parameter_key>`: The new value. Use any JSON value that the device accepts for this parameter, for example a number or an object.

Do not send a `status`. The platform sets it.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422, the device is not an agent, and none of its parent devices is an agent. The platform cannot deliver operations to it.

### To follow the operation {#to-follow-the-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request every 5 seconds until the `status` is SUCCESSFUL or FAILED, for at most 2 minutes:

* **SUCCESSFUL**: The device applied the value. It reports the value with a `c8y_ParameterUpdate` event.
* **FAILED**: The `failureReason` property describes why the device did not apply the value.
* **Still PENDING after 2 minutes**: No agent picked up the operation. The device is offline, or it does not listen for parameter updates. Cancel the operation, see [To cancel a pending operation](/skills/send-operation/#to-cancel-a-pending-operation).

For details on the statuses of an operation, see [Send an operation to a device](/skills/send-operation/#how-an-operation-moves-through-its-statuses).

### To check the reported value {#to-check-the-reported-value}

The device-parameter microservice writes the reported value to the managed object asynchronously, after the device sends its event.

Send the [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request again:

```http
GET /inventory/managedObjects/<device_id>
```

Repeat the request every 10 seconds, for at most 2 minutes, until the fragment `reportingInterval` contains the new value.

If the value does not change, check the property definition of the parameter, see [Inspect the definition of a device parameter](/skills/inspect-parameter-definitions/):

* **The definition does not allow the asset context**: The device-parameter microservice does not write this parameter to the managed object. Read the value from the latest parameter update event instead, as described below.
* **The definition allows the asset context, or no definition exists**: The device did not send a `c8y_ParameterUpdate` event, or its event is not the latest one for this parameter.

To read the latest value that the device reported, send a [Retrieve all events](https://{{< domain-c8y >}}/api/core/#operation/getEventCollectionResource) request:

```http
GET /event/events?source=<device_id>&type=c8y_ParameterUpdate&fragmentType=reportingInterval&pageSize=1
```

The platform returns HTTP 200 and the newest matching event in the `events` array. The fragment `reportingInterval` of the event contains the reported value.
