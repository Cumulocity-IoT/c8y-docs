---
title: Read and update device information
description: Read the managed object of a device, interpret its hardware, firmware, and availability fragments, update or remove editable fragments, and switch availability monitoring off or into maintenance mode.
when: "the user wants to read the information of a device, such as its hardware and firmware fragments, update its hardware information, remove a fragment, or switch its availability monitoring off or into maintenance mode"
weight: 200
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: putManagedObjectResource
    method: PUT
    path: /inventory/managedObjects/{id}
    title: Update a specific managed object
---

Each device is a managed object in the inventory. Standard fragments in this managed object describe the hardware of the device, its installed firmware, the operations that it supports, and its availability. The **Info** tab of the device in the Device Management application shows the same information, see [Info](/device-management-application/viewing-device-details/#info).

### Standard device fragments {#standard-device-fragments}

The device or a user writes the following fragments. All of them are optional:

* `c8y_Hardware`: The hardware of the device, with the strings `serialNumber`, `model`, and `revision`.
* `c8y_Mobile`: The modem of the device, with `imei`, `cellId`, and `iccid`, and further string properties such as `msisdn` and `imsi`.
* `c8y_Firmware`: The installed firmware, with `name`, `version`, and `url`.
* `c8y_SupportedOperations`: An array with the names of the operations that the device accepts.
* `c8y_RequiredAvailability`: The expected response interval of the device in minutes, in `responseInterval`. If this fragment is present, the platform monitors the availability of the device.

The platform computes the following fragments. Do not update them, because the platform overwrites them:

* `c8y_Availability`: The availability `status`, one of AVAILABLE, UNAVAILABLE, or MAINTENANCE, and the time of the last message from the device in `lastMessage`.
* `c8y_Connection`: The `status` of the push connection, one of CONNECTED, DISCONNECTED, or MAINTENANCE.
* `c8y_ActiveAlarmsStatus`: The number of active and acknowledged alarms per severity, in `critical`, `major`, `minor`, and `warning`.

For details, see [Device information](/device-integration/fragment-library/#device-info) and [Device availability](/device-integration/fragment-library/#device-availability) in the fragment library.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read a device: ROLE_INVENTORY_READ
* To update a device: ROLE_INVENTORY_ADMIN
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the managed object of the device. This is the `id` that the platform assigned to the device, not the name of the device. A request with the name in the path returns HTTP 404.

### To read the device information {#to-read-the-device-information}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the managed object. Check that it contains the fragment `c8y_IsDevice`. Otherwise, the managed object is not a device.

Read the fragments described in [Standard device fragments](#standard-device-fragments). A missing fragment is not an error. It means that nobody reported this information. For example, without `c8y_Firmware`, the device did not report its firmware, and without `c8y_RequiredAvailability`, the platform does not monitor the device.

If the platform returns HTTP 404, no managed object with this ID exists.

### To update the hardware information {#to-update-the-hardware-information}

Send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request with the fragment that you want to change:

```http
PUT /inventory/managedObjects/<device_id>
Content-Type: application/json
Accept: application/json

{
  "c8y_Hardware": {
    "serialNumber": "1234567890",
    "model": "myModel",
    "revision": "1.2.3"
  }
}
```

The update is partial. The platform changes only the fragments in the request body. All other fragments of the managed object, for example `name`, `type`, and `c8y_SupportedOperations`, stay unchanged.

The platform returns HTTP 200 and the managed object with the new `c8y_Hardware` values. If it returns HTTP 403, the user does not have the role ROLE_INVENTORY_ADMIN.

Do not send `c8y_Availability`, `c8y_Connection`, or `c8y_ActiveAlarmsStatus`. The platform computes these fragments.

### To remove a fragment {#to-remove-a-fragment}

To remove a fragment, set it to `null`. Send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request:

```http
PUT /inventory/managedObjects/<device_id>
Content-Type: application/json
Accept: application/json

{
  "c8y_Hardware": null
}
```

The platform returns HTTP 200. The managed object in the response no longer contains the fragment.

### To switch off availability monitoring {#to-switch-off-availability-monitoring}

The platform monitors the availability of a device as long as its managed object contains the fragment `c8y_RequiredAvailability`. To stop the monitoring, for example for a decommissioned device, remove the fragment.

Send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request:

```http
PUT /inventory/managedObjects/<device_id>
Content-Type: application/json
Accept: application/json

{
  "c8y_RequiredAvailability": null
}
```

The platform returns HTTP 200, and the response no longer contains `c8y_RequiredAvailability`.

### To put a device into maintenance mode {#to-put-a-device-into-maintenance-mode}

To pause the monitoring while you maintain a device, keep the fragment and set the `responseInterval` to 0 or less. Send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request:

```http
PUT /inventory/managedObjects/<device_id>
Content-Type: application/json
Accept: application/json

{
  "c8y_RequiredAvailability": {
    "responseInterval": 0
  }
}
```

The platform returns HTTP 200. The device is now in maintenance mode, and the platform raises no alarms for it. To end the maintenance mode, set `responseInterval` back to the expected interval in minutes, for example 15. See [Connection monitoring](/device-management-application/monitoring-and-controlling-devices/#connection-monitoring) for the maintenance mode in the Device Management application.
