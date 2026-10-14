---
title: Register a device
description: Create a registration request for a device that fetches its own credentials, wait until the device connects, accept the request, and find the managed object that the device creates.
weight: 230
sector:
  - recipes
  - device_management
requires:
  - authentication
api:
  - operation: postNewDeviceRequestCollectionResource
    method: POST
    path: /devicecontrol/newDeviceRequests
    title: Create a new device request
  - operation: getNewDeviceRequestResource
    method: GET
    path: /devicecontrol/newDeviceRequests/{requestId}
    title: Retrieve a specific new device request
  - operation: putNewDeviceRequestResource
    method: PUT
    path: /devicecontrol/newDeviceRequests/{requestId}
    title: Update a specific new device request status
  - operation: getExternalIDResource
    method: GET
    path: /identity/externalIds/{type}/{externalId}
    title: Retrieve a specific external ID
  - operation: deleteNewDeviceRequestResource
    method: DELETE
    path: /devicecontrol/newDeviceRequests/{requestId}
    title: Delete a specific new device request
---

To connect a device that fetches its own credentials, you register its unique ID in a new device request. The device then asks the platform for credentials with this ID. After you accept the request, the platform generates the credentials and sends them to the device. The device uses them to create its own managed object.

A new device request has one of the following statuses:

* **WAITING_FOR_CONNECTION**: You created the request. The device has not asked for its credentials yet.
* **PENDING_ACCEPTANCE**: The device asked for its credentials. You must accept the request.
* **ACCEPTED**: You accepted the request. The device receives its credentials with its next request.

A new device request carries no password. To register devices with a password that you define, or to register devices from a CSV file, use the bulk registration, see [Bulk device registration](/device-management-application/registering-devices/#bulk-device-registration). For the same procedure in the Device Management application, see [Single device registration](/device-management-application/registering-devices/#single-device-registration).

Do not create the managed object, the external ID, or the user of the device yourself. The device creates them after you accept the request.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and accept new device requests: ROLE_DEVICE_CONTROL_ADMIN
* To read new device requests: ROLE_DEVICE_CONTROL_READ
* To find the device by its external ID: ROLE_IDENTITY_READ
* To delete new device requests: ROLE_USER_MANAGEMENT_ADMIN
{{< /c8y-admon-req >}}

The examples use `<device_serial>` for the unique ID of the device, for example its serial number or, for mobile devices, the IMEI. To register several devices, follow the procedures once per device.

### To create the new device request {#to-create-the-new-device-request}

Send a [Create a new device request](https://{{< domain-c8y >}}/api/core/#operation/postNewDeviceRequestCollectionResource) request:

```http
POST /devicecontrol/newDeviceRequests
Content-Type: application/json
Accept: application/json

{
  "id": "<device_serial>"
}
```

To assign the device to a group, add `groupId` with the ID of the group.

The platform returns HTTP 201 and the request with `"id": "<device_serial>"` and `"status": "WAITING_FOR_CONNECTION"`.

If the platform returns HTTP 422 with a message that the request already exists, a request for this ID is already registered. Do not create a second one. Continue with the next procedure.

### To wait for the device to connect {#to-wait-for-the-device-to-connect}

Turn on the device. The device asks for its credentials with its ID and the bootstrap credentials of the platform, see [Step 0: Request device credentials](/device-integration/device-integration-rest/#step-0-request-device-credentials). The device sends this request, not you.

Send a [Retrieve a specific new device request](https://{{< domain-c8y >}}/api/core/#operation/getNewDeviceRequestResource) request:

```http
GET /devicecontrol/newDeviceRequests/<device_serial>
```

Repeat the request every 10 seconds until the `status` is PENDING_ACCEPTANCE, for example for 2 minutes.

If the status is still WAITING_FOR_CONNECTION after this time, the device has not connected yet. The request stays valid, and the device can connect later. Check again later before you accept the request.

### To accept the request {#to-accept-the-request}

Accept the request only when its status is PENDING_ACCEPTANCE. Send an [Update a specific new device request status](https://{{< domain-c8y >}}/api/core/#operation/putNewDeviceRequestResource) request:

```http
PUT /devicecontrol/newDeviceRequests/<device_serial>
Content-Type: application/json
Accept: application/json

{
  "status": "ACCEPTED"
}
```

If the device sent a security token when it asked for its credentials, add the same token as `securityToken` to the request body. The platform compares both tokens. Whether a token is needed depends on the security token policy of your tenant, see [Security token policy](/device-management-application/registering-devices/#security-token-policy).

The platform returns HTTP 200 and the request with `"status": "ACCEPTED"`. The device receives its credentials with its next request and then creates its own managed object.

### To find the new device {#to-find-the-new-device}

This procedure assumes that the device uses its ID as an external ID of type `c8y_Serial`.

Send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request:

```http
GET /identity/externalIds/c8y_Serial/<device_serial>
```

The platform returns HTTP 200. The `managedObject.id` property of the response is the ID of the new device.

If the platform returns HTTP 404, the device has not created its managed object yet. Repeat the request every 10 seconds, for example for 2 minutes. When the device creates its managed object depends on the device.

### To cancel a new device request {#to-cancel-a-new-device-request}

To cancel a request that is not completed, send a [Delete a specific new device request](https://{{< domain-c8y >}}/api/core/#operation/deleteNewDeviceRequestResource) request:

```http
DELETE /devicecontrol/newDeviceRequests/<device_serial>
```

The platform returns HTTP 204. If it returns HTTP 404, the request does not exist.
