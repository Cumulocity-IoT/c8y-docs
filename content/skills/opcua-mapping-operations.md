---
title: Re-apply OPC UA device type mappings
description: Make the OPC UA gateway apply all device type mappings again, or read the current values of a generated device and process them through its mappings.
weight: 650
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: getExternalIDCollectionResource
    method: GET
    path: /identity/globalIds/{id}/externalIds
    title: Retrieve all external IDs of a specific managed object
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: getOperationResource
    method: GET
    path: /devicecontrol/operations/{id}
    title: Retrieve a specific operation
---

OPC UA device types, also called device protocols, map the nodes of an OPC UA server to measurements, events, and alarms. The gateway reads the mapped nodes and creates the data that the mappings define, see [Device protocols](/device-integration/opcua/#device-protocols). Two operations make the gateway run the mappings on demand:

* **Apply all mappings**: The gateway reads all device types again and rebuilds the subscriptions for every server that it manages. Use it after you change a device type. Send it to a server device.
* **Process mappings for device values**: The gateway reads the current values of all nodes that the device type of a generated device maps, and processes them through the mappings. Use it to refresh the data of one device now. Send it to the generated device, not to the server.

Like all OPC UA operations, you create them in {{< product-c8y-iot >}}, and the gateway executes them. The gateway does not list its OPC UA operations in `c8y_SupportedOperations`, so do not check this fragment. The gateway writes the result as a string into the property `c8y_Command.result` of the operation.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To check the devices: ROLE_INVENTORY_READ and ROLE_IDENTITY_READ
* To create operations: ROLE_DEVICE_CONTROL_ADMIN
* To read operations: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<server_id>` for the managed object ID of the OPC UA server, `<child_device_id>` for the managed object ID of a device that a device type generated below the server, and `<operation_id>` for the ID of an operation.

### To check the server {#to-check-the-server}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request with the parents of the server:

```http
GET /inventory/managedObjects/<server_id>?withParents=true
```

The platform returns HTTP 200 and the managed object. Check the following properties:

* The `type` is `c8y_OpcuaServer`. If it is `c8y_OPCUA_Device_Agent`, the ID is the ID of the gateway. Use the ID of one of its servers instead.
* One of the entries in `deviceParents.references` has a `managedObject` of type `c8y_OPCUA_Device_Agent`. This is the gateway that executes the operations. If no parent is a gateway, do not create the operations.

### To check the generated device {#to-check-the-generated-device}

This check is only needed before you [process the mappings for a device](#to-process-the-mappings-for-the-values-of-a-device).

Send a [Retrieve all external IDs of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDCollectionResource) request:

```http
GET /identity/globalIds/<child_device_id>/externalIds
```

The platform returns HTTP 200 and the external IDs of the device. One of them must have the type `c8y_OpcuaDevice`. The gateway uses it to find the device type and the mapped nodes of the device. If no external ID has this type, the device is not a device that the OPC UA gateway generated, and the operation reads nothing. If the platform returns HTTP 404, the device does not exist.

### To apply all mappings again {#to-apply-all-mappings-again}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request for the server with the fragment `c8y_ua_command_ApplyAllMappingsOperation`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<server_id>",
  "description": "Apply all mappings",
  "c8y_ua_command_ApplyAllMappingsOperation": {}
}
```

The fragment has no properties. Send it as an empty object, also without an `expirationTime`. The gateway rebuilds the mappings of all its servers, not only of the server that you address.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>` and [follow the operation](#to-follow-the-operation). When the operation is SUCCESSFUL, the result is `OK`.

If the operation fails, and the `failureReason` starts with `Could not complete mappings application:`, the gateway cannot reach a server, or the update stopped before it completed. Send the operation again when the gateway is connected to the servers.

### To process the mappings for the values of a device {#to-process-the-mappings-for-the-values-of-a-device}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request for the generated device with the fragment `c8y_ua_command_ProcessMappingsForDeviceValues`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<child_device_id>",
  "description": "Process mappings",
  "c8y_ua_command_ProcessMappingsForDeviceValues": {
    "maxAge": 0,
    "timestampsToReturn": "Both"
  }
}
```

The gateway takes the nodes to read from the device type of the device. They are not part of the request. The fragment has the following optional properties:

* `maxAge`: The maximum age of the values. With `0`, the default, the server reads new values from the data source.
* `timestampsToReturn`: `Source`, `Server`, `Both`, or `Neither`. The default is `Both`. The values are case-sensitive.
* `expirationTime`: A time in ISO 8601 format. If the gateway picks up the operation later, the operation fails with `Operation expired`.

The platform returns HTTP 201 and the operation. Note its `id` as `<operation_id>` and [follow the operation](#to-follow-the-operation). When the operation is SUCCESSFUL, the result lists each node that the gateway reads, with its status, for example `Read 1 node(s), Details: ns=2;s=TunableStatusCode(GOOD)`.

If the operation fails, the `failureReason` describes why:

* `Operation is not allowed for OPC UA Server!`: The `deviceId` is the ID of the server. Send the operation to the generated device.
* `Internal error: OPCUA Server ID is not present!`: The device is not linked to a server.
* A reason that starts with `Read failed and skipped for`: The gateway cannot read some nodes. It still processes the values of the nodes that it can read. The reason lists the skipped nodes and their status codes.
* A reason that ends with `nodeAttributesMap cannot be empty!`: The device type of the device maps no nodes, so there is nothing to read. Check the device type.

### To follow the operation {#to-follow-the-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the `status` is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/send-operation/#to-follow-the-status-of-the-operation). Read the result in `c8y_Command.result`, or the `failureReason`.

If the operation fails with `Expiration not supported for this operation type`, remove the `expirationTime` from the apply all mappings operation. If it fails with `Operation is not supported!`, the name of the fragment is misspelled.

If the operation stays PENDING, no gateway executes operations for the device. To cancel the operation, see [To cancel a pending operation](/skills/send-operation/#to-cancel-a-pending-operation).
