---
title: Read a file from an OPC UA server
description: Read an OPC UA file node into the file repository or upload it to an external endpoint, then find and download the stored file and remove copies that you no longer need.
when: "the user wants to read a file node of an OPC UA server and store or download the file"
weight: 670
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
  - operation: deleteBinariesResource
    method: DELETE
    path: /inventory/binaries/{id}
    title: Remove a stored file
---

An OPC UA server can provide files as nodes of the type FileType. The OPC UA gateway reads such a file node and stores the file in the {{< product-c8y-iot >}} file repository, or uploads it to an external HTTP endpoint.

The file node must provide the methods `Open` and `Read`, either as children of the file node or as children of its data type node. The gateway also uses the methods `SetPosition` and `Close` if they exist.

Like all OPC UA operations, you create the read operation in {{< product-c8y-iot >}}, and the gateway executes it. Note the following rules:

* The gateway does not list its OPC UA operations in `c8y_SupportedOperations`. Do not check this fragment.
* File operations do not write a result into `c8y_Command.result`. The stored or uploaded file shows that the operation succeeded.
* File operations do not accept an `expirationTime`. If you send one, the operation fails with `Expiration not supported for this operation type`.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To check the device, and to find and download files: ROLE_INVENTORY_READ
* To create operations: ROLE_DEVICE_CONTROL_ADMIN
* To read operations: ROLE_DEVICE_CONTROL_READ
* To remove files: ROLE_INVENTORY_ADMIN
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the managed object ID of the OPC UA server or of a device that a device protocol generated below the server, `<file_node_id>` for the node ID of the file node, `<operation_id>` for the ID of an operation, and `<binary_id>` for the ID of a stored file.

### To check the target device {#to-check-the-target-device}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request with the parents of the device:

```http
GET /inventory/managedObjects/<device_id>?withParents=true
```

The platform returns HTTP 200 and the managed object. Check that its `type` is `c8y_OpcuaServer`, or that it is a device that a device protocol generated below a server. One of the entries in `deviceParents.references` must have a `managedObject` of type `c8y_OPCUA_Device_Agent`, which is the gateway.

If the `type` is `c8y_OPCUA_Device_Agent`, the ID is the ID of the gateway. Use the ID of one of its servers instead. If no parent is a gateway, no gateway executes the operation. Do not create it.

### To read a file into the file repository {#to-read-a-file-into-the-file-repository}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_ReadFileOperation`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Read file",
  "c8y_ua_command_ReadFileOperation": {
    "fileNodeId": "<file_node_id>"
  }
}
```

The fragment has the following properties:

* `fileNodeId`: The node ID of the file node. Mandatory.
* `bufferSize`: The size of the read buffer in bytes. The default is 1 MB, the maximum is 10 MB. The gateway reduces larger values to 10 MB. The buffer size does not limit the size of the file: for a larger file, the gateway reads several times.
* `skipResetPosition`: Controls whether the gateway resets the read position before it reads the file. The default is `false`.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>` and [follow the operation](#to-follow-the-operation).

See [Read file](/device-integration/opcua/#read-file) for details.

### To upload a file to an external endpoint {#to-upload-a-file-to-an-external-endpoint}

To send the file to an HTTP endpoint instead of the file repository, send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the fragment `c8y_ua_command_ReadFileAndUploadOperation`. The example uses `<endpoint_token>` for a token that the endpoint accepts:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Read file and upload it",
  "c8y_ua_command_ReadFileAndUploadOperation": {
    "fileNodeId": "<file_node_id>",
    "externalUri": "https://files.example.com/upload",
    "authorizationHeader": "Bearer <endpoint_token>",
    "formData": {
      "source": "opcua"
    }
  }
}
```

The fragment has the properties of the read file operation, and in addition:

* `externalUri`: The endpoint. Mandatory. The gateway sends the file in a `multipart/form-data` POST request, in a part named `file`.
* `authorizationHeader`: The value of the `Authorization` header of the request. The gateway sends it unchanged.
* `formData`: Additional form fields of the request. All values must be strings.
* `connectTimeout` and `readTimeout`: The timeouts of the request in milliseconds. The default is 10000 each.

The platform returns HTTP 201 and the operation. Note its `id` as `<operation_id>` and follow the operation.

### To follow the operation {#to-follow-the-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the `status` is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation). After a SUCCESSFUL read into the file repository, [find the stored file](#to-find-and-download-the-file).

If the status is FAILED, the `failureReason` describes why, for example:

* A reason that starts with `Internal error: No method defined for given node:` and ends with `with browse name: Open` or `with browse name: Read`: The node is not a usable file node, because it does not provide this method.
* A reason that starts with `Internal error: Unable to open file, method response:`: The server refused to open the file.
* `Server not connected` or `Internal error: UA Server is not resolvable / not connected!`: The gateway runs, but it is not connected to the OPC UA server.
* A reason that starts with `Internal error: File upload to`: The external endpoint rejected the upload. The reason contains the HTTP status of the endpoint.
* `Internal error: formData values must be from type String`: A value in `formData` is not a string.

If the operation stays PENDING, no gateway executes operations for the device. To cancel the operation, see [To cancel a pending operation](/skills/device-management/send-operation/#to-cancel-a-pending-operation).

### To find and download the file {#to-find-and-download-the-file}

The gateway stores the file as a file of type `ua-file-type`, named after the file node.

1. Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with a query for the files of the node:

    ```http
    GET /inventory/managedObjects?query=$filter=(type eq 'ua-file-type' and name eq '<file_node_id>')&pageSize=100
    ```

    URL-encode the value of `query`. The platform returns HTTP 200 and the files in the `managedObjects` array, each with its `id`, `length`, and `lastUpdated`. Each read stores a new file. Note the `id` of the newest file as `<binary_id>`.

2. Send a [Retrieve a stored file](https://{{< domain-c8y >}}/api/core/#operation/getBinariesResource) request:

    ```http
    GET /inventory/binaries/<binary_id>
    ```

    The platform returns HTTP 200 and the content of the file.

You also find the file in the Administration application under **Management** > **Files repository**.

### To remove a stored file {#to-remove-a-stored-file}

Each read stores a new copy of the file. Remove the copies that you no longer need.

Send a [Remove a stored file](https://{{< domain-c8y >}}/api/core/#operation/deleteBinariesResource) request:

```http
DELETE /inventory/binaries/<binary_id>
```

The platform returns HTTP 204.
