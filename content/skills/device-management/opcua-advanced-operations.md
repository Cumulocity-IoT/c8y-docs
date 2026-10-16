---
title: Read complex values and write attributes of OPC UA nodes
description: Read selected attributes of several OPC UA nodes in one operation, including parts of array values, and write any writable attribute of OPC UA nodes.
weight: 630
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
---

The read complex operation reads several attributes of several OPC UA nodes in a single operation. The write attribute operation writes any writable attribute of a node, not only its value. Like all OPC UA operations, you create them in {{< product-c8y-iot >}}, and the OPC UA gateway executes them on the OPC UA server.

For simple value reads and writes, and for method calls, see [Read and write OPC UA values](/skills/device-management/read-write-opcua-values/). That skill also describes how the gateway executes OPC UA operations and which node ID forms it accepts. The most important rules are:

* The `deviceId` of the operation is the OPC UA server or a device that a device protocol generated below the server.
* The gateway does not list its OPC UA operations in `c8y_SupportedOperations`. Do not check this fragment.
* The gateway writes the result as a JSON string into the property `c8y_Command.result` of the operation.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To check the device: ROLE_INVENTORY_READ
* To create operations: ROLE_DEVICE_CONTROL_ADMIN
* To read operations: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the managed object ID of the OPC UA server or of a generated device, and `<operation_id>` for the ID of an operation.

### To check the target device {#to-check-the-target-device}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request with the parents of the device:

```http
GET /inventory/managedObjects/<device_id>?withParents=true
```

The platform returns HTTP 200 and the managed object. Check that its `type` is `c8y_OpcuaServer`, or that it is a device that a device protocol generated below a server. One of the entries in `deviceParents.references` must have a `managedObject` of type `c8y_OPCUA_Device_Agent`, which is the gateway.

If the `type` is `c8y_OPCUA_Device_Agent`, the ID is the ID of the gateway. Use the ID of one of its servers instead. If no parent is a gateway, no gateway executes the operations. Do not create them.

### To read several attributes at once {#to-read-several-attributes-at-once}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_ReadComplex`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Read complex",
  "c8y_ua_command_ReadComplex": {
    "nodeAttrs": {
      "ns=2;s=MyEnumObject": {
        "13": "",
        "4": ""
      },
      "ns=3;s=FloatArray": {
        "13": "0:1"
      }
    },
    "timestampsToReturn": "Both"
  }
}
```

The fragment has the following properties:

* `nodeAttrs`: A map from node ID to a map from attribute ID to index range. Mandatory. The attribute IDs follow the OPC UA specification, for example `"13"` for the value and `"4"` for the display name. The index range selects a part of an array value, for example `"0:1"` for the first two elements of a one-dimensional array or `"0:1,0:1"` for a two-dimensional array. An empty string `""` reads the whole value.
* `timestampsToReturn`: The timestamps to return with each value: `Source`, `Server`, `Both`, or `Neither`. The default is `Both`. The values are case-sensitive.
* `maxAge`: The maximum age of the values. With `0`, the default, the server reads new values from the data source.
* `expirationTime`: An optional time in ISO 8601 format. If the gateway picks up the operation later, the operation fails with `Operation expired`.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`. If the platform returns HTTP 422, the device does not exist, or no gateway is above it.

When the operation is SUCCESSFUL, its result has the following structure:

```json
{
  "results": {
    "ns=3;s=FloatArray": {
      "13": {
        "value": {
          "value": [1.0, 2.0]
        },
        "statusCode": 0,
        "sourceTimestamp": 1566572540173,
        "serverTimestamp": 1566574513935
      }
    }
  }
}
```

A `statusCode` of 0 means Good. If one attribute cannot be read, for example because the node does not have this attribute, the operation fails, and the `failureReason` names the OPC UA status code, for example `Bad_AttributeIdInvalid (0x80350000)`. The gateway stops at the first attribute that cannot be read, but still writes the attributes that it read before into `c8y_Command.result`.

See [Read complex](/device-integration/opcua/#read-complex) for details.

### To write an attribute {#to-write-an-attribute}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_WriteAttribute`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Write attributes",
  "c8y_ua_command_WriteAttribute": {
    "values": {
      "ns=3;s=LocalizedText": {
        "attribute": "13",
        "value": "This is a localized text"
      },
      "ns=3;s=FloatArray": {
        "attribute": "13",
        "ranges": "0:1",
        "value": "2.0,4.0"
      }
    }
  }
}
```

The `values` map contains one entry per node. The key is the node ID. Each entry has the following properties:

* `attribute`: The ID of the attribute according to the OPC UA specification, as a string. Mandatory.
* `value`: The value to write, as a string. Mandatory. The gateway converts it to the data type of the attribute.
* `ranges`: An index range to write a part of an array value. In the example, the gateway writes the first two elements of the array.

The fragment also accepts an `expirationTime`, as for reading.

The platform returns HTTP 201 and the operation. When the operation is SUCCESSFUL, its result is a write response with one status code per node in its `results` array. The gateway sets the operation to SUCCESSFUL as soon as the server answers. Check each status code: a status other than Good means that the write of this node failed.

See [Write attribute](/device-integration/opcua/#write-attribute) for details.

### To read the result of an operation {#to-read-the-result-of-an-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the `status` is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation). Then parse the JSON string in `c8y_Command.result`.

If the status is FAILED, the `failureReason` describes why, for example:

* `Operation expired`: The expiration time passed before the gateway picked up the operation. Create the operation again with a later time.
* A reason that starts with `Internal error: Invalid string representation of a nodeId:`: A node ID has an invalid form.
* `Internal error: UA Server is not resolvable / not connected!`: The gateway runs, but it is not connected to the OPC UA server.
* `Error parsing operation JSON! This operation is not supported.`: A property of the fragment has the wrong JSON type.

If the operation stays PENDING, no gateway executes operations for the device. To cancel the operation, see [To cancel a pending operation](/skills/device-management/send-operation/#to-cancel-a-pending-operation).
