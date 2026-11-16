---
title: Read and write OPC UA values
description: Read and write the values of OPC UA nodes, read node attributes, and call OPC UA methods through operations that the OPC UA gateway executes.
when: "the user wants to read or write the values of OPC UA nodes, read the attributes of a node, or call OPC UA methods"
weight: 620
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

To read or write a value on an OPC UA server, you create an operation in {{< product-c8y-iot >}}. The OPC UA gateway picks up the operation, executes it on the OPC UA server, and writes the result back into the same operation. See [Operations](/device-integration/opcua/#operations) for all OPC UA operations.

### How the gateway executes OPC UA operations {#how-the-gateway-executes-opc-ua-operations}

OPC UA operations follow the usual operation statuses, see [Send an operation to a device](/skills/device-management/send-operation/#how-an-operation-moves-through-its-statuses). In addition, the following rules apply:

* The `deviceId` of the operation is the OPC UA server or a device that a device protocol generated below the server. On a generated device, you can only run operations for nodes, not general operations such as an address space scan.
* Each operation contains exactly one `c8y_ua_command_*` fragment. Do not put a `deviceId` or an operation ID into the fragment.
* The gateway does not list the `c8y_ua_command_*` operations in `c8y_SupportedOperations`. Do not check this fragment before you create an operation.
* The gateway writes the result as a string into the property `c8y_Command.result` of the operation, not into the `c8y_ua_command_*` fragment. Structured results are JSON documents inside this string.
* The platform does not check the content of the fragment. If you misspell a property, the operation does not fail, but the gateway ignores the property.

A node ID must have one of the following forms. Otherwise, the operation fails with a `failureReason` that starts with `Internal error: Invalid string representation of a nodeId:`.

```text
ns=<int>;i=<int>    i=<int>
ns=<int>;s=<string> s=<string>
ns=<int>;g=<guid>   g=<guid>
ns=<int>;b=<base64> b=<base64>
nsu=<namespace_uri>;<identifier>
```

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

The platform returns HTTP 200 and the managed object. Check the following properties:

* The `type` is `c8y_OpcuaServer`, or the device is a device that a device protocol generated below a server.
* One of the entries in `deviceParents.references` has a `managedObject` of type `c8y_OPCUA_Device_Agent`. This is the gateway that executes the operations.

If the `type` is `c8y_OPCUA_Device_Agent`, the ID is the ID of the gateway. Use the ID of one of its servers instead. If no parent is a gateway, no gateway executes the operations. Do not create them.

### To read the values of nodes {#to-read-the-values-of-nodes}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_ReadValue`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Read value",
  "c8y_ua_command_ReadValue": {
    "nodes": ["ns=2;s=MyLevel"],
    "timestampsToReturn": "Both"
  }
}
```

The fragment has the following properties:

* `nodes`: The IDs of the nodes to read. Mandatory.
* `timestampsToReturn`: The timestamps to return with each value: `Source`, `Server`, `Both`, or `Neither`. The default is `Both`. The values are case-sensitive.
* `ranges`: An index range to read a part of an array value, for example `"0:1"` for the first two elements of a one-dimensional array, or `"0:1,0:1"` for a two-dimensional array.
* `maxAge`: The maximum age of the value. With `0`, the default, the server reads a new value from the data source.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>` and [read the result](#to-read-the-result-of-an-operation). If the platform returns HTTP 422, the device does not exist, or no gateway is above it.

See [Reading the value of a node/nodes](/device-integration/opcua/#reading-the-value-of-a-nodenodes) for details.

### To read the attributes of a node {#to-read-the-attributes-of-a-node}

To read one attribute of one or more nodes, send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_ReadAttribute`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Read attribute",
  "c8y_ua_command_ReadAttribute": {
    "nodes": ["ns=3;s=FloatArray"],
    "attribute": "13",
    "ranges": "0:1"
  }
}
```

The `attribute` is the ID of the attribute according to the OPC UA specification, as a string. `"13"` is the value attribute. The `nodes`, `ranges`, `maxAge`, and `timestampsToReturn` properties work as for [reading values](#to-read-the-values-of-nodes).

To read all attributes of one node, use the fragment `c8y_ua_command_ReadNodeAttributes` with the ID of the node:

```json
"c8y_ua_command_ReadNodeAttributes": {
  "node": "ns=2;s=MyEnumObject"
}
```

The platform returns HTTP 201 and the operation. See [Reading an attribute](/device-integration/opcua/#reading-an-attribute) and [Reading all attributes of a node](/device-integration/opcua/#reading-all-attributes-of-a-node) for details.

### To write the values of nodes {#to-write-the-values-of-nodes}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_WriteValue`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Write values",
  "c8y_ua_command_WriteValue": {
    "values": {
      "ns=3;s=LocalizedText": {
        "value": "This is a localized text"
      },
      "ns=3;s=Double": {
        "value": "3.14159"
      }
    }
  }
}
```

The `values` map contains one entry per node. The key is the node ID. Each entry has the following properties:

* `value`: The value to write, as a string, also for numbers. Mandatory.
* `ranges`: An index range to write a part of an array value, for example `"0:1"` for the first two elements.

The platform returns HTTP 201 and the operation. See [Write value](/device-integration/opcua/#write-value) for details.

### To call a method {#to-call-a-method}

1. Read the description of the method. Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_GetMethodDescriptionOperation` and the ID of the method node:

    ```http
    POST /devicecontrol/operations
    Content-Type: application/json
    Accept: application/json

    {
      "deviceId": "<device_id>",
      "description": "Get method description",
      "c8y_ua_command_GetMethodDescriptionOperation": {
        "nodeId": "ns=2;s=MyMethod"
      }
    }
    ```

    [Read the result](#to-read-the-result-of-an-operation) of the operation. It contains the `inputArguments` and `outputArguments` of the method, each with `name`, `dataType`, and `dataTypeId`, and the `parentNodeId` of the method.

2. Call the method. Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_CallMethodOperation`:

    ```http
    POST /devicecontrol/operations
    Content-Type: application/json
    Accept: application/json

    {
      "deviceId": "<device_id>",
      "description": "Call method",
      "c8y_ua_command_CallMethodOperation": {
        "request": {
          "nodeId": "ns=2;s=MyMethod",
          "arguments": [
            {
              "name": "Operation",
              "dataType": "String",
              "dataTypeId": "i=12",
              "value": "pow"
            },
            {
              "name": "Parameter",
              "dataType": "Double",
              "dataTypeId": "i=11",
              "value": "5"
            }
          ]
        }
      }
    }
    ```

    Send one entry in `arguments` per input argument, in the order of the method description. Each entry needs the `dataType`, the `dataTypeId`, and the `value` as a string. For a method without input arguments, omit `arguments`. Send only the `nodeId` of the method. The gateway finds the object of the method from the method description. Do not copy the `parentNodeId` of the description into the request.

    The optional property `parseResponse` in `request` controls whether the gateway converts the output values to JSON. The default is `true`.

When the call is SUCCESSFUL, the result contains a `statusCode` and a `result` array with the output arguments and the values that the server returns. See [Get method description](/device-integration/opcua/#get-method-description) and [Call method](/device-integration/opcua/#call-method) for details.

### To read the result of an operation {#to-read-the-result-of-an-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the `status` is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation). Then parse the JSON string in `c8y_Command.result`. For a value read, the result looks as follows:

```json
{
  "results": {
    "ns=2;s=MyLevel": {
      "13": {
        "value": {
          "value": 77.0
        },
        "statusCode": 0,
        "sourceTimestamp": 1566572540173,
        "serverTimestamp": 1566573849897
      }
    }
  }
}
```

The keys of `results` are the node IDs and the attribute IDs. A `statusCode` of 0 means Good. The result of `c8y_ua_command_ReadNodeAttributes` contains the attributes by name instead, for example `Value`, `DataType`, and `DisplayName`.

The result of a write is a write response with one status code per node in its `results` array. The gateway sets the operation to SUCCESSFUL as soon as the server answers. Check each status code: a status other than Good means that the write of this node failed.

If the status is FAILED, the `failureReason` describes why, for example:

* `Internal error: UA Server is not resolvable / not connected!`: The gateway runs, but it is not connected to the OPC UA server.
* `Operation is not supported!`: The name of the `c8y_ua_command_*` fragment is misspelled.
* `Error parsing operation JSON! This operation is not supported.`: A property of the fragment has the wrong JSON type.
* `Agent operation queue is full!`: The gateway is busy. Create the operation again later.

If the operation stays PENDING, no gateway executes operations for the device, for example because the gateway is offline. To cancel the operation, see [To cancel a pending operation](/skills/device-management/send-operation/#to-cancel-a-pending-operation).

### To set an expiration time {#to-set-an-expiration-time}

To make sure that the gateway executes an operation only until a given time, add an `expirationTime` in ISO 8601 format inside the fragment, not at the top level of the operation:

```json
"c8y_ua_command_ReadValue": {
  "nodes": ["ns=3;s=FloatArray"],
  "expirationTime": "2027-01-31T15:00:00.000Z"
}
```

The gateway checks the time when it picks up the operation. If the time has passed, the operation fails with `Operation expired`. The read value, read attribute, read node attributes, write value, and call method operations accept an expiration time. Other operations, for example the get method description operation, fail with `Expiration not supported for this operation type`. See [Expiring operations](/device-integration/opcua/#expiring-operations).
