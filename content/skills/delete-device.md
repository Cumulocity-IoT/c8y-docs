---
title: Delete a device
description: Check that a managed object is a device, delete it with or without its child hierarchy, and wait until the platform has removed it.
weight: 101
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
---

When you delete a device, the platform deletes its managed object from the inventory together with the data of the device, such as its measurements, alarms, events, and operations. You cannot undo the deletion.

Consider the alternatives before you delete a device:

* To replace broken hardware and keep the data of the device, replace the device instead, see [To replace a device](/device-management-application/viewing-all-devices/#to-replace-a-device).
* To keep the data of retired devices for reports, assign the devices to a group for retired devices, see [Grouping devices](/device-management-application/grouping-devices/).

The platform first deletes the data of the device and then its managed object. A device with a lot of data or many children can take some time to delete.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To delete devices: ROLE_INVENTORY_ADMIN
* To read devices: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the managed object ID of the device. The name of a device is not its ID. To find the ID of a device by its name, see [To filter devices by name](/skills/list-and-query-devices/#to-filter-devices-by-name).

### To check that the object is a device {#to-check-that-the-object-is-a-device}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the managed object. Check that it contains the fragment `c8y_IsDevice`. If the fragment is missing, the object is not a device. Do not delete it with this skill.

If the platform returns HTTP 404, no managed object has this ID. A request with a device name instead of an ID also returns HTTP 404, with the message `No managedObject for id '<name>'`.

### To delete the device {#to-delete-the-device}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<device_id>?cascade=false
```

The request accepts the following parameters, which all default to `false`:

* `cascade`: If `true`, the platform also deletes the child hierarchy of the device. If `false`, the child devices stay in the inventory. Delete them separately if you do not need them anymore.
* `forceCascade`: If `true`, the platform deletes the whole hierarchy without checking the type of the managed object. This parameter takes precedence over `cascade`.
* `withDeviceUser`: If `true`, the platform also deletes the device user, that is, the credentials of the device.

The platform returns one of the following statuses:

* **HTTP 204**: The platform deleted the device within 30 seconds.
* **HTTP 202**: The deletion takes longer than 30 seconds and continues in the background. The platform does not report errors of the background deletion. Check the result, see [To check that the device is deleted](#to-check-that-the-device-is-deleted).

If the platform returns one of the following errors, the device is not deleted:

* **HTTP 404**: The device does not exist anymore.
* **HTTP 409**: You sent `withDeviceUser=true`, but the device user owns other managed objects, so the platform cannot delete it.
* **HTTP 422**: The managed object cannot be deleted through the Inventory API, for example, because it is a binary, a tenant, or a monitored application.
* **HTTP 429**: Too many delete operations are in progress. Send the request again later.

### To check that the device is deleted {#to-check-that-the-device-is-deleted}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

Repeat the request every 5 seconds until the platform returns HTTP 404. Then the device is deleted.

If the platform still returns HTTP 200 after 60 seconds, the deletion is still in progress. Check again later.

In the Device Management application, you can delete devices in the device list, see [To delete a device from the list](/device-management-application/viewing-all-devices/#to-delete-devices).
