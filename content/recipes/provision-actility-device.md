---
title: Provision an Actility LoRa device
description: Select the device protocol, device profile, and connectivity plan, provision a LoRa device on Actility ThingPark, send a downlink command to it, and deprovision it.
weight: 800
sector:
  - device_management
requires:
  - authentication
api:
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
---

{{< product-c8y-iot >}} connects to LoRa devices through Actility ThingPark. The Actility agent microservice provisions a device on ThingPark and creates it in {{< product-c8y-iot >}} in one step. You send these requests to the agent under the path `/service/actility`. For the integration and its configuration in the UI, see [Actility LoRa](/device-integration/lpwan/#actility-lora).

The agent supports Over-the-Air Activation (OTAA) only. Before you start, check the following prerequisites:

* Your tenant is subscribed to the Actility agent. Otherwise, the requests to `/service/actility` return HTTP 403 with the error "Microservice/Access Denied".
* A ThingPark connection is configured in the Administration application, see [Configuring multiple ThingPark account connections](/device-integration/lpwan/#configuring-multiple-thingpark-account-connections).
* At least one LoRa device protocol exists, see [Creating device protocols](/device-integration/lpwan/#actility-creating-device-protocols).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To provision and deprovision devices: ROLE_INVENTORY_ADMIN, ROLE_INVENTORY_CREATE, or ROLE_ACTILITY_ADMIN
* To list device protocols, device profiles, and connectivity plans: one of the roles above, ROLE_INVENTORY_READ, or ROLE_ACTILITY_READ
* To send a downlink command: ROLE_DEVICE_CONTROL_ADMIN
* To delete the device: ROLE_INVENTORY_ADMIN
{{< /c8y-admon-req >}}

The examples use `<connection_name>` for the name of the ThingPark connection and `<device_eui>` for the device EUI. The agent returns plain JSON arrays and objects, without paging.

### To select the device protocol, device profile, and connectivity plan {#to-select-the-device-protocol-device-profile-and-connectivity-plan}

1. To list the LoRa device protocols, send the following request:

    ```http
    GET /service/actility/deviceTypes
    ```

    The agent returns HTTP 200 and an array of device protocols. These are managed objects of the type `c8y_ActilityDeviceType`. Note the `id` and the `name` of the protocol for your device as `<device_protocol_id>` and `<device_protocol_name>`. If the array is empty, create a LoRa device protocol first.

2. To list the device profiles of the ThingPark account, send the following request:

    ```http
    GET /service/actility/deviceProfiles?actilityConnectionName=<connection_name>
    ```

    The agent returns HTTP 200 and an array of device profiles with their `id`, `name`, and `typeMAC`. Note the `id` of the profile that matches your device as `<device_profile_id>`.

    This request also checks the connection. The agent returns the following errors:

    * **HTTP 400** with the error "Actility Microservice Error": No connection with this name exists, or the request to ThingPark failed.
    * **HTTP 401**: ThingPark rejected the profile ID, the username, or the password of the connection. Update the connection.
    * **HTTP 502**: ThingPark has a server error. Try again later.

3. To list the connectivity plans, send the following request:

    ```http
    GET /service/actility/connectivityPlans?actilityConnectionName=<connection_name>
    ```

    The agent returns HTTP 200 and an array of connectivity plans with their `id`, `ref`, `name`, `grantedConnections`, and `usedConnections`. Select a plan whose `usedConnections` is lower than its `grantedConnections`. Note its `id` as `<connectivity_plan_id>`.

If one of the arrays is empty, you cannot provision the device. Create a LoRa device protocol, or check the device profiles and connectivity plans of your ThingPark account.

### To provision the device {#to-provision-the-device}

Send the following request to the agent:

```http
POST /service/actility/newDeviceRequest
Content-Type: application/json
Accept: application/json

{
  "devEUI": "<device_eui>",
  "applicationEUI": "<application_eui>",
  "applicationKey": "<application_key>",
  "deviceProfile": { "id": "<device_profile_id>" },
  "connectivityPlan": { "id": "<connectivity_plan_id>" },
  "deviceType": { "id": "<device_protocol_id>", "name": "<device_protocol_name>" },
  "lnsConnectionName": "<connection_name>"
}
```

The request has the following properties:

* `devEUI`: The unique identifier of the device, 16 hexadecimal characters.
* `applicationEUI`: The application EUI, 16 hexadecimal characters.
* `applicationKey`: The AES-128 application key of the device, 32 hexadecimal characters.
* `deviceProfile`, `connectivityPlan`, and `deviceType`: The values that you selected in [To select the device protocol, device profile, and connectivity plan](#to-select-the-device-protocol-device-profile-and-connectivity-plan).
* `lnsConnectionName`: The name of the ThingPark connection.

The agent provisions the device on ThingPark and then creates it in {{< product-c8y-iot >}}. If ThingPark already has a device with this device EUI, the agent only checks that its application EUI and device profile match, and creates the device in {{< product-c8y-iot >}}. The agent returns HTTP 201 and the managed object of the device. Its `name` is `Actility_<device_eui>`, with the device EUI in uppercase. Note its `id` as `<device_id>`.

The agent returns the following errors:

* **HTTP 403** with a message that contains "already registered to a tenant": The device EUI belongs to a device of another tenant.
* **HTTP 400**: The provisioning on ThingPark failed. For example, the connection does not exist, or ThingPark already has a device with this device EUI, but with a different application EUI or device profile. The error message describes the reason.
* **HTTP 422**: ThingPark rejected the data of the request.
* **HTTP 502**: ThingPark has a server error. The device can exist on ThingPark anyway. Send the request once more and check the result as described above.

The registration in the Device Management application uses the same fields, see [Registering Actility LoRa devices](/device-integration/lpwan/#registering-actility-lora-devices).

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

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Follow the status of the operation for up to 2 minutes, see [Send an operation to a device](/recipes/send-operation/#to-follow-the-status-of-the-operation):

* **SUCCESSFUL**: ThingPark accepted the command. This does not confirm that the device received it.
* **FAILED** with the `failureReason` "Invalid command": The text is empty or not hexadecimal. Correct it and send the operation again.
* **FAILED** with another `failureReason`: Forwarding the command to ThingPark failed.

For details, see [Sending operations](/device-integration/lpwan/#actility-sending-operations).

### To deprovision the device {#to-deprovision-the-device}

When you deprovision a device, the agent deletes it on ThingPark, so it is no longer connected to the network. The managed object of the device and its history remain in {{< product-c8y-iot >}}.

Send the following request to the agent, without a body:

```http
PUT /service/actility/deprovision/<device_id>
```

The agent returns HTTP 200. If it returns HTTP 403, the device belongs to another tenant, or you have no access to the inventory.

To provision the device again, delete it and provision it again. For details, see [Deprovisioning LoRa devices](/device-integration/lpwan/#deprovisioning-lora-devices).

### To delete the device {#to-delete-the-device}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<device_id>
```

The platform returns HTTP 204 and removes the device from the inventory. If the deletion takes longer than 30 seconds, the platform returns HTTP 202 and completes it in the background.
