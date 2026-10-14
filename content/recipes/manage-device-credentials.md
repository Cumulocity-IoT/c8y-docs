---
title: Manage device credentials
description: List the device users of your tenant, find the device user that a device authenticates with, and disable or enable it to block or allow the login of the device.
weight: 105
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getUserCollectionResource
    method: GET
    path: /user/{tenantId}/users
    title: Retrieve all users for a specific tenant
  - operation: getExternalIDResource
    method: GET
    path: /identity/externalIds/{type}/{externalId}
    title: Retrieve a specific external ID
  - operation: getManagedObjectUserResource
    method: GET
    path: /inventory/managedObjects/{id}/user
    title: Retrieve the username and state of a specific managed object
  - operation: getUserResource
    method: GET
    path: /user/{tenantId}/users/{userId}
    title: Retrieve a specific user for a specific tenant
  - operation: putUserResource
    method: PUT
    path: /user/{tenantId}/users/{userId}
    title: Update a specific user for a specific tenant
---

A device that is registered with platform credentials authenticates as a device user. The platform creates this user during the bootstrap, when the device requests its credentials, see [Step 0: Request device credentials](/device-integration/device-integration-rest/#step-0-request-device-credentials). The device user owns the managed object of the device.

The username of a device user starts with `device_`. The part after `device_` is the ID that the device used for its registration. It is not the name of the device, not its managed object ID, and not its IMEI. Do not build a username from these values. Read it from the device instead, see [To find the device user of a device](#to-find-the-device-user-of-a-device).

When you disable a device user, the device can no longer log in or send API requests. The managed object and the registration of the device stay unchanged, and you can enable the device user again.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To list and read device users: ROLE_USER_MANAGEMENT_READ or ROLE_USER_MANAGEMENT_CREATE
* To disable and enable device users: ROLE_USER_MANAGEMENT_ADMIN
* To find the device user of a device: ROLE_INVENTORY_READ, and ROLE_IDENTITY_READ to find the device by an external ID
{{< /c8y-admon-req >}}

The examples use `<tenant_id>` for the ID of your tenant, `<device_id>` for the managed object ID of the device, and `<device_username>` for the username of the device user.

### To list the device users {#to-list-the-device-users}

Send a [Retrieve all users for a specific tenant](https://{{< domain-c8y >}}/api/core/#operation/getUserCollectionResource) request with `onlyDevices=true`:

```http
GET /user/<tenant_id>/users?onlyDevices=true&pageSize=100
```

The platform returns HTTP 200 and the device users in the `users` array, each with its `userName` and its `enabled` state. Without `onlyDevices=true`, the list contains no device users.

To narrow the list, add one of the following parameters:

* `username`: The beginning of the username or the full username, for example `username=device_0000`. The search is case-insensitive.
* `usernameContains`: A part of the username with at least 3 characters. The search is case-insensitive.

You cannot combine `username` and `usernameContains` in one request.

If the `users` array is empty, no device on your tenant is registered with platform credentials.

### To find the device user of a device {#to-find-the-device-user-of-a-device}

1. If you know the device only by an external ID, such as its IMEI or serial number, find its managed object ID first. Send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request with the type and the value of the external ID, here the IMEI `<imei>`:

    ```http
    GET /identity/externalIds/c8y_IMEI/<imei>
    ```

    The type of an IMEI is `c8y_IMEI`, the type of a serial number is `c8y_Serial`. The platform returns HTTP 200, and `managedObject.id` is the `<device_id>`. If the platform returns HTTP 404, the external ID is not registered.

2. Send a [Retrieve the username and state of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectUserResource) request:

    ```http
    GET /inventory/managedObjects/<device_id>/user
    ```

    The platform returns HTTP 200 with the `userName` of the owner of the device and its `enabled` state.

If the `userName` starts with `device_`, it is the `<device_username>`. If the `userName` is missing, empty, or does not start with `device_`, a regular user owns the device, and the device has no device user. Do not disable that user. If the platform returns HTTP 404, the device does not exist.

### To read a device user {#to-read-a-device-user}

Send a [Retrieve a specific user for a specific tenant](https://{{< domain-c8y >}}/api/core/#operation/getUserResource) request:

```http
GET /user/<tenant_id>/users/<device_username>
```

The platform returns HTTP 200 and the user with its `userName` and its `enabled` state. If the platform returns HTTP 404, the user does not exist. Check that you read the username from the device.

### To disable a device user {#to-disable-a-device-user}

Send an [Update a specific user for a specific tenant](https://{{< domain-c8y >}}/api/core/#operation/putUserResource) request:

```http
PUT /user/<tenant_id>/users/<device_username>
Content-Type: application/json
Accept: application/json

{ "enabled": false }
```

The platform returns HTTP 200 and the user with `"enabled": false`. The device cannot log in anymore.

If the platform returns HTTP 403, you are missing the permission to update this user. If it returns HTTP 404, the user does not exist.

### To enable a device user again {#to-enable-a-device-user-again}

Send an [Update a specific user for a specific tenant](https://{{< domain-c8y >}}/api/core/#operation/putUserResource) request:

```http
PUT /user/<tenant_id>/users/<device_username>
Content-Type: application/json
Accept: application/json

{ "enabled": true }
```

The platform returns HTTP 200 and the user with `"enabled": true`. The device can log in again.

In the Device Management application, you manage device users on the **Device credentials** page, see [Managing device credentials](/device-management-application/managing-device-data/#managing-device-credentials).
