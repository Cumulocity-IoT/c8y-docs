---
title: Register a Loriot LoRa device
description: Select the Loriot connection, application, and device protocol, register a LoRa device on the Loriot network server, send a downlink command, and move the device to another Loriot application.
weight: 810
sector:
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

{{< product-c8y-iot >}} connects to LoRa devices through the Loriot network server. The Loriot agent microservice registers a device on the Loriot network server and creates it in {{< product-c8y-iot >}} in one step. You send these requests to the agent under the path `/service/loriot`. For the integration and its configuration in the UI, see [Loriot LoRa](/device-integration/lpwan/#loriot-lora).

The agent also creates devices automatically when they send uplink messages. These devices cannot receive downlink commands until you register them as described here. The registration associates the device with a connection and a device protocol.

Before you start, check the following prerequisites:

* Your tenant is subscribed to the Loriot agent. Otherwise, the requests to `/service/loriot` return HTTP 403 with the error "Microservice/Access Denied".
* A Loriot connection is configured in the Administration application, see [Creating a Loriot LNS connection](/device-integration/lpwan/#creating-a-loriot-lns-connection-in-cumulocity).
* A LoRa device protocol exists, see [Creating device protocols](/device-integration/lpwan/#loriot-creating-device-protocols).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To list the Loriot connections: ROLE_LORIOT_READ or ROLE_LORIOT_ADMIN
* To list the Loriot applications: ROLE_LORIOT_ADMIN
* To register and move devices: ROLE_LORIOT_ADMIN, ROLE_INVENTORY_CREATE, or ROLE_INVENTORY_ADMIN
* To find the device protocol: ROLE_INVENTORY_READ
* To check the external ID: ROLE_IDENTITY_READ
* To send a downlink command: ROLE_DEVICE_CONTROL_ADMIN
* To delete the device: ROLE_INVENTORY_ADMIN
{{< /c8y-admon-req >}}

The examples use `<connection_name>` for the name of the Loriot connection and `<device_eui>` for the device EUI. The agent returns plain JSON arrays and objects, without paging.

### To select the connection, application, and device protocol {#to-select-the-connection-application-and-device-protocol}

1. To list the Loriot connections of the tenant, send the following request to the agent:

    ```http
    GET /service/loriot/lns-connection
    ```

    The agent returns HTTP 200 and the connections. Check that one of them has the `name` `<connection_name>`. Otherwise, create the connection first.

2. To list the applications of the connection, send the following request:

    ```http
    GET /service/loriot/applications?loriotConnectionName=<connection_name>
    ```

    The agent returns HTTP 200 and an array of applications with their `_id`, `hexId`, `name`, `devices`, and `deviceLimit`. Select an application whose `devices` is lower than its `deviceLimit`. Note its `hexId` as `<application_id>`.

    The agent returns the following errors:

    * **HTTP 401**: The agent cannot log in to Loriot. The username or the password of the connection is wrong. Update the connection.
    * **HTTP 403**: You do not have the role ROLE_LORIOT_ADMIN.
    * **HTTP 400**: The Loriot platform cannot be reached, or the request is invalid.

3. To find the ID of the device protocol by its name, send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

    ```http
    GET /inventory/managedObjects?query=$filter=name eq '<device_protocol_name>'&pageSize=100
    ```

    URL-encode the value of the `query` parameter. The name must match exactly, including uppercase and lowercase letters. The platform returns HTTP 200. If the `managedObjects` array contains exactly one protocol, note its `id` as `<device_protocol_id>`. If it contains no protocol or several protocols, the name does not identify one protocol. Check the name.

### To register the device {#to-register-the-device}

Send the following request to the agent:

```http
POST /service/loriot/newDeviceRequest
Content-Type: application/json
Accept: application/json

{
  "title": "warehouse-sensor-01",
  "deveui": "<device_eui>",
  "appeui": "<application_eui>",
  "appkey": "<application_key>",
  "appid": "<application_id>",
  "deviceType": { "id": "<device_protocol_id>", "name": "<device_protocol_name>" },
  "lnsConnectionName": "<connection_name>"
}
```

The request has the following properties:

* `title`: The title of the device.
* `deveui`: The device EUI, 16 hexadecimal characters in uppercase.
* `appeui`: The application EUI, 16 hexadecimal characters.
* `appkey`: The AES-128 application key, 32 hexadecimal characters.
* `appid`: The `hexId` of the Loriot application, in uppercase.
* `deviceType`: The ID and the name of the device protocol. The agent stores the `id` with the device, so always send the ID, never the name.
* `lnsConnectionName`: The name of the Loriot connection.

The agent returns HTTP 201 and the managed object of the device. Its `name` is `Loriot Device <device_eui>`. Note its `id` as `<device_id>`.

The agent returns the following errors:

* **HTTP 400** with a message that names a field: The value of the field does not have the required format, for example it is not uppercase hexadecimal. Correct it and send the request again.
* **HTTP 401**: The agent cannot log in to Loriot. Check the credentials of the connection.
* **HTTP 404**: The Loriot application does not exist. Check `<application_id>` against the list of applications.

The registration in the Device Management application uses the same fields, see [Device registration via the platform](/device-integration/lpwan/#device-registration-via-the-platform).

### To check the registration {#to-check-the-registration}

The agent registers the device EUI as external ID of the type `c8y_LoriotEUI`. Send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request:

```http
GET /identity/externalIds/c8y_LoriotEUI/<device_eui>
```

The platform returns HTTP 200. The `managedObject.id` is `<device_id>`. If the platform returns HTTP 404, the registration did not complete.

### To send a downlink command {#to-send-a-downlink-command}

You send a command to the device as a shell operation. Its text is a hexadecimal string. The agent sends it to port 1 of the device. To use another port, add a colon and the port number, for example `0102AABB:2`.

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "LoRa downlink",
  "c8y_Command": { "text": "0102AABB" }
}
```

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. The agent picks up pending commands on its own schedule, by default every 31 seconds. Follow the status of the operation for up to 3 minutes, see [Send an operation to a device](/skills/send-operation/#to-follow-the-status-of-the-operation):

* **SUCCESSFUL**: The agent sent the command to the Loriot platform. This does not confirm that the device received it.
* **FAILED**: The command is invalid, or Loriot rejected it. The `failureReason` describes why.

For details, see [Sending operations](/device-integration/lpwan/#loriot-sending-operations).

### To move the device to another Loriot application {#to-move-the-device-to-another-loriot-application}

The example uses `<target_application_id>` for the `hexId` of the application that the device moves to. Send the following request to the agent:

```http
POST /service/loriot/transferDevice/<application_id>/device/<device_eui>
Content-Type: application/json
Accept: application/json

{
  "destinationId": "<target_application_id>",
  "deviceId": "<device_eui>",
  "originId": "<application_id>",
  "lnsConnectionName": "<connection_name>"
}
```

The agent returns HTTP 204 without a body. The device now belongs to the target application.

The agent returns the following errors:

* **HTTP 400**: A value in the path or in the body is not uppercase hexadecimal. Correct it and send the request again.
* **HTTP 401**: The agent cannot log in to Loriot. Check the credentials of the connection.
* **HTTP 404**: The source or the target application does not exist. Check both IDs against the list of applications.

### To delete the device {#to-delete-the-device}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<device_id>
```

The platform returns HTTP 204 and removes the device and its external IDs from the tenant. If the deletion takes longer than 30 seconds, the platform returns HTTP 202 and completes it in the background.
