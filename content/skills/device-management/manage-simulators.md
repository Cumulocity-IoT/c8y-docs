---
title: Manage device simulators
description: Check that the device simulator is available, create, read, start, and change a simulator, find the devices that it creates, and delete it.
weight: 109
requires:
  - authentication
api:
  - operation: getCurrentTenantResource
    method: GET
    path: /tenant/currentTenant
    title: Retrieve the current tenant
  - operation: getExternalIDResource
    method: GET
    path: /identity/externalIds/{type}/{externalId}
    title: Retrieve a specific external ID
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
---

A simulator creates up to ten devices that behave like connected hardware. It sends messages, such as measurements and events, in a loop of instructions. The device simulator is a microservice. You manage simulators with requests to `/service/device-simulator/simulators`. For the concepts and the UI, see [Working with simulators](/device-management-application/working-with-simulators/).

A simulator has the following properties:

* `name`: The name of the simulator. Required.
* `state`: NEW, RUNNING, or PAUSED.
* `instances`: The number of simulated devices, from 1 to 10.
* `c8y_SupportedOperations`: The operations that the simulated devices accept, for example `"c8y_Restart"`.
* `commandQueue`: The instructions that each simulated device runs in a loop, one instruction per step. The queue must contain at least one `sleep` instruction.

The `commandQueue` accepts the following instructions:

* `sleep`: Waits, for example `{ "type": "sleep", "seconds": 5 }`.
* `builtin`: Sends a message of a SmartREST static template. For example, `{ "type": "builtin", "messageId": 200, "values": ["c8y_Temperature", "T", "21.5", "C"] }` creates a measurement with the [static template 200](/smartrest/mqtt-static-templates/#200). The [static template 402](/smartrest/mqtt-static-templates/#402) creates a location update event.
* `message`: Sends a message of a custom SmartREST 2.0 template collection, for example `{ "type": "message", "templateId": "myXId", "messageId": "999", "values": ["v1"] }`.

{{< c8y-admon-important >}}
A PUT request to the device simulator replaces the whole simulator. Always send the complete simulator with all properties, not only the properties that you change.
{{< /c8y-admon-important >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To manage simulators: ROLE_SIMULATOR_ADMIN
* To find the simulated devices: ROLE_IDENTITY_READ
* To delete simulated devices: ROLE_INVENTORY_ADMIN

The device simulator microservice provides the role ROLE_SIMULATOR_ADMIN.
{{< /c8y-admon-req >}}

The examples use `<simulator_id>` for the ID of the simulator and `<device_id>` for the managed object ID of a simulated device.

### To check that the device simulator is available {#to-check-that-the-device-simulator-is-available}

Your tenant must be subscribed to the device simulator microservice. Send a [Retrieve the current tenant](https://{{< domain-c8y >}}/api/core/#operation/getCurrentTenantResource) request:

```http
GET /tenant/currentTenant
```

The platform returns HTTP 200 and your tenant. Check that one of the entries in `applications.references` has `application.contextPath`, or `application.name`, with the value `device-simulator`. Otherwise, your tenant is not subscribed to the microservice.

Do not use the health endpoint `/service/device-simulator/health` for this check. It can return HTTP 200 even if your tenant is not subscribed. A request to a microservice that your tenant is not subscribed to returns HTTP 403 with the error `Microservice/Access Denied`.

### To create a simulator {#to-create-a-simulator}

Send the following request to the device simulator:

```http
POST /service/device-simulator/simulators
Content-Type: application/json
Accept: application/json

{
  "name": "Temperature simulator",
  "state": "PAUSED",
  "instances": 1,
  "c8y_SupportedOperations": ["c8y_Restart"],
  "commandQueue": [
    { "type": "builtin", "messageId": 200, "values": ["c8y_Temperature", "T", "21.5", "C"] },
    { "type": "sleep", "seconds": 5 }
  ]
}
```

The device simulator returns HTTP 201 and the simulator with its `id`. Note the `id` as `<simulator_id>`.

If it returns HTTP 400 or HTTP 500 with a validation message, the simulator does not meet the requirements, for example, the `commandQueue` has no `sleep` instruction, or `instances` is not between 1 and 10. If it returns HTTP 403 without the error `Microservice/Access Denied`, you do not have the role ROLE_SIMULATOR_ADMIN.

### To read simulators {#to-read-simulators}

To read one simulator, send the following request:

```http
GET /service/device-simulator/simulators/<simulator_id>
```

The device simulator returns HTTP 200 and the simulator with all its properties. If it returns HTTP 404, the simulator does not exist.

To list all simulators, send `GET /service/device-simulator/simulators`.

### To start or change a simulator {#to-start-or-change-a-simulator}

Send the complete simulator with your changes. The following request starts the simulator and increases the number of devices to two:

```http
PUT /service/device-simulator/simulators/<simulator_id>
Content-Type: application/json
Accept: application/json

{
  "name": "Temperature simulator",
  "state": "RUNNING",
  "instances": 2,
  "c8y_SupportedOperations": ["c8y_Restart"],
  "commandQueue": [
    { "type": "builtin", "messageId": 200, "values": ["c8y_Temperature", "T", "21.5", "C"] },
    { "type": "sleep", "seconds": 5 }
  ]
}
```

The device simulator returns HTTP 200 and the simulator with `"state": "RUNNING"` and `"instances": 2`. To pause the simulator, send the complete simulator with `"state": "PAUSED"`.

If it returns HTTP 400 or HTTP 500 with a validation message, the simulator does not meet the requirements. If it returns HTTP 404, the simulator does not exist.

### To find the devices of a simulator {#to-find-the-devices-of-a-simulator}

A RUNNING simulator creates one device per instance. It creates the devices in the background and registers each one with an external ID of the type `c8y_Serial` and the value `simulator_<simulator_id>_<index>`. The index starts at 0. A simulator that never ran has no devices.

Send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request for the first device:

```http
GET /identity/externalIds/c8y_Serial/simulator_<simulator_id>_0
```

The platform returns HTTP 200, and `managedObject.id` is the `<device_id>` of the simulated device. If the platform returns HTTP 404, the device does not exist yet. Repeat the request every 5 seconds, for at most 60 seconds.

### To delete a simulator {#to-delete-a-simulator}

1. Send the following request:

    ```http
    DELETE /service/device-simulator/simulators/<simulator_id>
    ```

    The device simulator returns HTTP 204. A GET request for the simulator now returns HTTP 404.

2. The simulated devices are separate managed objects. If you do not need them anymore, send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request for each device:

    ```http
    DELETE /inventory/managedObjects/<device_id>
    ```

    The platform returns HTTP 204, or HTTP 202 if the deletion continues in the background. For details, see [Delete a device](/skills/device-management/delete-device/).
