---
title: Read the history of an OPC UA node
description: Read the stored history of an OPC UA node and process it through the device protocol mappings, or export it as files to the file repository and download them.
weight: 660
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
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: getBinariesResource
    method: GET
    path: /inventory/binaries/{id}
    title: Retrieve a stored file
---

An OPC UA server can store the history of the values of a node. The OPC UA gateway reads this history with one of two operations:

* **Historic read**: The gateway reads the values of a time range and processes them through the mappings of the device protocol, except the alarm mappings. For example, it creates measurements from the historic values.
* **Historic data upload**: The gateway reads the values of a time range and stores them as files in the file repository, without processing them.

Each operation reads exactly one node. To read several nodes, create one operation per node. Neither operation accepts an `expirationTime`. If you send one, the operation fails with `Expiration not supported for this operation type`.

Like all OPC UA operations, you create them in {{< product-c8y-iot >}}, and the gateway executes them. The gateway does not list its OPC UA operations in `c8y_SupportedOperations`, so do not check this fragment. The gateway writes the result as a string into the property `c8y_Command.result` of the operation.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To check the device, and to find and download the files: ROLE_INVENTORY_READ
* To create operations: ROLE_DEVICE_CONTROL_ADMIN
* To read operations: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the managed object ID of the OPC UA server or of a device that a device protocol generated below the server, `<operation_id>` for the ID of an operation, and `<binary_id>` for the ID of a stored file.

### To check the target device {#to-check-the-target-device}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request with the parents of the device:

```http
GET /inventory/managedObjects/<device_id>?withParents=true
```

The platform returns HTTP 200 and the managed object. Check that its `type` is `c8y_OpcuaServer`, or that it is a device that a device protocol generated below a server. One of the entries in `deviceParents.references` must have a `managedObject` of type `c8y_OPCUA_Device_Agent`, which is the gateway.

If the `type` is `c8y_OPCUA_Device_Agent`, the ID is the ID of the gateway. Use the ID of one of its servers instead. If no parent is a gateway, no gateway executes the operations. Do not create them.

### To read historic values through the mappings {#to-read-historic-values-through-the-mappings}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_HistoricReadOperation`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Historic read",
  "c8y_ua_command_HistoricReadOperation": {
    "nodeId": "ns=2;s=MyLevel",
    "dateFrom": "2026-06-13T10:43:00+02:00",
    "dateTo": "2026-06-13T10:52:00+02:00",
    "processMappings": true,
    "tagType": "TAG",
    "batchSize": 500
  }
}
```

The fragment has the following properties:

* `nodeId`: The ID of the node. Mandatory.
* `dateFrom` and `dateTo`: The time range, in ISO 8601 format with a time zone offset. Mandatory. `dateFrom` must be earlier than `dateTo`.
* `processMappings`: If `false`, the gateway does not process the values through the mappings. The default is `true`.
* `tagType`: With `TAG`, the default, the gateway appends `_Historic` to the types that the mappings create. With `NO_TAG`, it does not append it.
* `batchSize`: The number of values that the gateway reads from the server per call. The default is 200.
* `ranges`: An index range to read a part of an array value, for example `"0:1"`.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>` and [follow the operation](#to-follow-the-operation). When the operation is SUCCESSFUL, the result has the form `N historic read values are processed`, where N is the number of values that the gateway processed through the mappings.

If the result reports 0 values although the server has history for the time range, `processMappings` is `false`, or the node does not store history.

See [Historic read](/device-integration/opcua/#historic-read) for details.

### To export historic values as files {#to-export-historic-values-as-files}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_HistoricDataUploadOperation`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Upload history data",
  "c8y_ua_command_HistoricDataUploadOperation": {
    "nodeId": "ns=2;s=MyLevel",
    "dateFrom": "2026-01-03T09:53:00+02:00",
    "dateTo": "2026-06-13T18:53:00+02:00",
    "chunkSize": 10
  }
}
```

The `nodeId`, `dateFrom`, `dateTo`, and `ranges` properties work as for the historic read. In addition, the fragment has the following properties:

* `chunkSize`: The maximum size of each file in MB, from 1 to 100. The default is 10. With another value, the operation fails with `Internal error: Invalid chunk size:`.
* `batchSize`: The number of values that the gateway reads from the server per call. The default is 100000.
* `compress`: Whether the gateway compresses the files. The `deflated` property of each file shows whether it is compressed.

The platform returns HTTP 201 and the operation. Note its `id` as `<operation_id>` and [follow the operation](#to-follow-the-operation). When the operation is SUCCESSFUL, the result has the form `B batch(es) processed, C chunks created`, where B is the number of batches and C the number of files.

See [Historic data binary upload](/device-integration/opcua/#historic-data-binary-upload) for details.

### To follow the operation {#to-follow-the-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the `status` is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/send-operation/#to-follow-the-status-of-the-operation).

If the status is FAILED, the `failureReason` describes why, for example:

* `Internal error: Historic operation date format is incorrect`: `dateFrom` or `dateTo` is not a valid date.
* A reason that starts with `Internal error: Unsupported tagging type:`: The `tagType` is neither `TAG` nor `NO_TAG`.
* A reason that contains `Couldn't read history from OPC UA server`: The node does not store history, or the history is disabled on the server. To check it, read all attributes of the node, and check `Historizing`, see [Read and write OPC UA values](/skills/read-write-opcua-values/#to-read-the-attributes-of-a-node).
* `Internal error: UA Server is not resolvable / not connected!`: The gateway runs, but it is not connected to the OPC UA server.

If the operation stays PENDING, no gateway executes operations for the device. To cancel the operation, see [To cancel a pending operation](/skills/send-operation/#to-cancel-a-pending-operation).

### To find and download the exported files {#to-find-and-download-the-exported-files}

The gateway stores each file of a historic data upload as a file of type `c8y_ua_HistoricData`. Each file has the following properties, among others: `operationId` (the ID of the upload operation), `nodeId`, `batch`, `chunk`, `last`, `deflated`, `dateFrom`, and `dateTo`.

1. Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with a query for the files of the operation:

    ```http
    GET /inventory/managedObjects?query=$filter=(type eq 'c8y_ua_HistoricData' and operationId eq '<operation_id>')&pageSize=100
    ```

    URL-encode the value of `query`. The platform returns HTTP 200 and the files in the `managedObjects` array. Note the `id` of each file as `<binary_id>`. If the array is empty although the operation is SUCCESSFUL, the server has no history in the time range.

2. Send a [Retrieve a stored file](https://{{< domain-c8y >}}/api/core/#operation/getBinariesResource) request for each file:

    ```http
    GET /inventory/binaries/<binary_id>
    ```

    The platform returns HTTP 200 and the content of the file.

You also find the files in the Administration application under **Management** > **Files repository**.
