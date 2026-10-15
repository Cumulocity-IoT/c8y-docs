---
title: Manage fieldbus device protocols
description: Create, list, read, and delete the fieldbus device protocols that map the data of Modbus, CAN bus, and CANopen devices.
weight: 410
requires:
  - authentication
api:
  - operation: postManagedObjectCollectionResource
    method: POST
    path: /inventory/managedObjects
    title: Create one or multiple managed objects
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
---

A device protocol, also called device type, describes the data of a type of device. Fieldbus device protocols for Modbus, CAN bus, and CANopen devices are managed objects in the inventory. They have the following properties:

* The marker fragment `c8y_IsDeviceType`. The **Device protocols** page of the Device Management application lists all managed objects with this fragment.
* The property `fieldbusType`, which names the fieldbus family, for example `modbus`.
* The fragments `c8y_Coils` and `c8y_Registers`, which contain the coil and register definitions of the protocol.

This skill covers the device protocol as a managed object. It does not describe the coil and register definitions. To configure them, see [Configuring fieldbus device protocols](/device-integration/cloud-fieldbus/#configuring-fieldbus). The **Device protocols** page also shows LWM2M, OPC UA, and LPWAN protocols. Their own services manage them, so this skill does not cover them.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and delete device protocols: ROLE_INVENTORY_ADMIN
* To read device protocols: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<protocol_id>` for the ID of the device protocol.

### To create a device protocol {#to-create-a-device-protocol}

Send a [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) request:

```http
POST /inventory/managedObjects
Content-Type: application/json
Accept: application/json

{
  "name": "My Modbus device protocol",
  "type": "c8y_ModbusDeviceType",
  "fieldbusType": "modbus",
  "c8y_IsDeviceType": {},
  "c8y_Coils": [],
  "c8y_Registers": []
}
```

The request creates a protocol without coils and registers. Add them in the Device Management application, see [Configuring fieldbus device protocols](/device-integration/cloud-fieldbus/#configuring-fieldbus).

The platform returns HTTP 201 and the device protocol with its `id`. Note the `id` as `<protocol_id>`.

### To list the device protocols {#to-list-the-device-protocols}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with a query for the fragment `c8y_IsDeviceType`. This is the query that the Device Management application uses:

```http
GET /inventory/managedObjects?query=$filter=has(c8y_IsDeviceType)&pageSize=2000
```

URL-encode the value of the `query` parameter.

The platform returns HTTP 200. The `managedObjects` array contains the device protocols with their `id`, `name`, and `fieldbusType`.

### To read a device protocol {#to-read-a-device-protocol}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<protocol_id>
```

The platform returns HTTP 200 and the device protocol with its `name`, `type`, `fieldbusType`, coils, and registers. If the response does not contain the fragment `c8y_IsDeviceType`, the managed object is not a device protocol.

If the platform returns HTTP 404, the device protocol does not exist.

### To delete a device protocol {#to-delete-a-device-protocol}

{{< c8y-admon-info >}}
Deleting a device protocol does not change the devices that use it. Their fieldbus fragments still refer to the deleted protocol.
{{< /c8y-admon-info >}}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<protocol_id>
```

The platform returns HTTP 204. If the deletion takes longer than 30 seconds, the platform returns HTTP 202 and completes it in the background. If the platform returns HTTP 404, the device protocol does not exist anymore.

In the Device Management application, you manage device protocols on the **Device protocols** page, see [Managing device types](/device-management-application/managing-device-types/).
