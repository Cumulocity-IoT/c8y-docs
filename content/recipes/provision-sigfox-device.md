---
title: Register a Sigfox device
description: Select the device protocol and the contract, register a device on the Sigfox Cloud through the Sigfox agent, and send a downlink command to it.
weight: 820
sector:
  - recipes
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: getExternalIDResource
    method: GET
    path: /identity/externalIds/{type}/{externalId}
    title: Retrieve a specific external ID
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
---

{{< product-c8y-iot >}} connects to Sigfox devices through the Sigfox Cloud. The Sigfox agent microservice registers a device on the Sigfox Cloud and creates it in {{< product-c8y-iot >}} in one step. You send these requests to the agent under the path `/service/sigfox-agent`. For the integration and its configuration in the UI, see [Sigfox](/device-integration/lpwan/#sigfox).

Before you start, check the following prerequisites:

* Your tenant is subscribed to the application sigfox-agent. Otherwise, the requests to `/service/sigfox-agent` return HTTP 403 with the error "Microservice/Access Denied".
* A Sigfox connection is configured in the Administration application. Its API access in the Sigfox Cloud has the profiles "Customer [R]" and "Device Manager [W]". See [Managing the connectivity settings](/device-integration/lpwan/#managing-the-connectivity-settings).
* A Sigfox device protocol exists, see [Creating device protocols](/device-integration/lpwan/#sigfox-creating-device-protocols).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To list the contracts: ROLE_SIGFOX_READ, ROLE_SIGFOX_ADMIN, ROLE_OPTION_MANAGEMENT_READ, or ROLE_OPTION_MANAGEMENT_ADMIN
* To register devices: ROLE_INVENTORY_CREATE or ROLE_INVENTORY_ADMIN
* To find the device protocol: ROLE_INVENTORY_READ
* To check the external ID: ROLE_IDENTITY_READ
* To send a downlink command: ROLE_DEVICE_CONTROL_ADMIN
* To delete the device: ROLE_INVENTORY_ADMIN
{{< /c8y-admon-req >}}

The examples use `<connection_name>` for the name of the Sigfox connection and `<sigfox_device_id>` for the Sigfox ID of the device. The agent returns plain JSON arrays and objects, without paging.

### To select the device protocol and the contract {#to-select-the-device-protocol-and-the-contract}

1. To find the ID of the device protocol by its name, send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

    ```http
    GET /inventory/managedObjects?query=$filter=name eq '<device_protocol_name>'&pageSize=100
    ```

    URL-encode the value of the `query` parameter. The name must match exactly, including uppercase and lowercase letters. The platform returns HTTP 200. If the `managedObjects` array contains exactly one protocol, note its `id` as `<device_protocol_id>`. If it contains no protocol or several protocols, the name does not identify one protocol. Check the name.

2. To list the contracts of the Sigfox account, send the following request to the agent:

    ```http
    GET /service/sigfox-agent/contracts?sigfoxConnectionName=<connection_name>
    ```

    The agent returns HTTP 200 and an array of contracts with their `id`, `name`, `startTime`, `endTime`, `maxTokens`, `tokensInUse`, and `bidir`. Select a contract that is not expired and whose `tokensInUse` is lower than its `maxTokens`. To send downlink commands, the contract needs `"bidir": true`. Note its `id` as `<contract_id>`.

    The agent returns the following errors:

    * **HTTP 401**: The Sigfox Cloud rejected the API credentials of the connection. Update the connection.
    * **HTTP 403**: You have none of the roles to list contracts.
    * **HTTP 500** with an error message: No connection with this name exists, or the request to the Sigfox Cloud failed.

    If the array is empty, the Sigfox account has no contracts. Contact Sigfox support to create one.

### To register the device {#to-register-the-device}

Send the following request to the agent:

```http
POST /service/sigfox-agent/newDeviceRequest
Content-Type: application/json
Accept: application/json

{
  "id": "<sigfox_device_id>",
  "pac": "<pac>",
  "contractId": "<contract_id>",
  "productCertificate": "<product_certificate>",
  "prototype": false,
  "deviceType": { "id": "<device_protocol_id>", "name": "<device_protocol_name>" },
  "lnsConnectionName": "<connection_name>"
}
```

The request has the following properties:

* `id`: The unique Sigfox ID of the device, a hexadecimal number. The agent stores it in uppercase.
* `pac`: The porting authorization code (PAC) of the device, a hexadecimal number.
* `contractId`: The ID of the contract.
* `productCertificate`: The product certificate key of the device from *https://partners.sigfox.com/*. If the device has no product certificate, omit `productCertificate` and send `"prototype": true`. The device is then registered as a prototype.
* `deviceType`: The ID and the name of the device protocol. The agent stores the `id` with the device, so always send the ID, never the name.
* `lnsConnectionName`: The name of the Sigfox connection.

The agent returns HTTP 201 and the managed object of the device. Note its `id` as `<device_id>`.

The agent returns the following errors:

* **HTTP 400** with the message that a value "must be hexadecimal": The `id` or the `pac` is not hexadecimal. Correct it and send the request again.
* **HTTP 401**: The Sigfox Cloud rejected the API credentials of the connection.
* **HTTP 404**: The contract or the device protocol does not exist. Check `<contract_id>` against the list of contracts.
* **HTTP 500** with an error message: The registration on the Sigfox Cloud failed. For example, the PAC is wrong, the device belongs to another Sigfox account, or the connection does not exist.

The registration in the Device Management application uses the same fields, see [Registering Sigfox devices](/device-integration/lpwan/#registering-sigfox-devices).

### To check the registration {#to-check-the-registration}

The agent registers the Sigfox ID as external ID of the type `com.sigfox.deviceId`. Send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request with the Sigfox ID in uppercase:

```http
GET /identity/externalIds/com.sigfox.deviceId/<sigfox_device_id>
```

The platform returns HTTP 200. The `managedObject.id` is `<device_id>`.

### To send a downlink command {#to-send-a-downlink-command}

You send a command to the device as a shell operation. Its text is exactly 16 hexadecimal characters (8 bytes).

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Sigfox downlink",
  "c8y_Command": { "text": "0102AABBCCDD0011" }
}
```

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Follow the status of the operation, see [Send an operation to a device](/recipes/send-operation/#to-follow-the-status-of-the-operation).

The operation stays PENDING until the device requests a downlink message from the Sigfox Cloud. Sigfox devices do this rarely, so an operation that is still PENDING after some minutes is normal. When the device requests a downlink message, the oldest pending operation moves to EXECUTING and then to SUCCESSFUL.

If the operation is FAILED and the `failureReason` says that the data "must be exactly 8 bytes", the text does not have 16 hexadecimal characters. Correct it and send the operation again.

For details, see [Sending operations](/device-integration/lpwan/#sigfox-sending-operations).

### To delete the device {#to-delete-the-device}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<device_id>
```

The platform returns HTTP 204 and removes the device and its external IDs from the tenant. If the deletion takes longer than 30 seconds, the platform returns HTTP 202 and completes it in the background.
