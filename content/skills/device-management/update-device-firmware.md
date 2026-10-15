---
title: Update the firmware of a device
description: Check that a device supports firmware updates, send it a firmware image or patch with a c8y_Firmware operation, follow the operation, and check the firmware that the device reports.
weight: 390
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

A device has one firmware installed at a time, for example its operating system, the firmware of its microcontroller, or its BIOS. To update the firmware, you create a `c8y_Firmware` operation. The operation describes the desired state: the device downloads the file from the URL in the operation, installs it, reports the new firmware in its own managed object, and sets the status of the operation to SUCCESSFUL or FAILED.

The firmware operation follows the same lifecycle as every other operation, see [Send an operation to a device](/skills/device-management/send-operation/). Take the name, the version, and the URL of the firmware from the firmware repository, see [Manage the firmware repository](/skills/device-management/manage-firmware-repository/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device: ROLE_INVENTORY_READ
* To create operations: ROLE_DEVICE_CONTROL_ADMIN
* To read operations: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device and `<operation_id>` for the ID of the operation. The device ID is the `id` that the platform assigned to the device, not its name. A request with the name instead of the ID returns HTTP 404. The examples use `<firmware_name>`, `<firmware_version>`, and `<firmware_url>` for the firmware to install.

### To check that the device supports firmware updates {#to-check-that-the-device-supports-firmware-updates}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

Check the following properties in the response:

* The fragment `c8y_IsDevice` is present.
* The array `c8y_SupportedOperations` contains `"c8y_Firmware"`.

The `c8y_Firmware` fragment of the response shows the firmware that is installed now.

If `c8y_Firmware` is missing in `c8y_SupportedOperations`, do not create the operation. No agent executes it.

### To install a firmware image {#to-install-a-firmware-image}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Update firmware to <firmware_name> <firmware_version>",
  "c8y_Firmware": {
    "name": "<firmware_name>",
    "version": "<firmware_version>",
    "url": "<firmware_url>"
  }
}
```

The properties `name`, `version`, and `url` are mandatory. If the device resolves the firmware file itself, send an empty string as `url`. If the device cannot resolve the file, it sets the operation to FAILED.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422, the device is not an agent, and none of its parent devices is an agent.

### To install a firmware patch {#to-install-a-firmware-patch}

A patch applies to one base version of the firmware. Before the device installs the patch, it checks that the installed version equals the base version.

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the additional properties `dependency` and `isPatch` in the `c8y_Firmware` fragment:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Update firmware to <firmware_name> <patch_version>",
  "c8y_Firmware": {
    "name": "<firmware_name>",
    "version": "<patch_version>",
    "url": "<firmware_url>",
    "dependency": "<base_version>",
    "isPatch": true
  }
}
```

`<patch_version>` is the version of the patch and `<base_version>` is the version that the patch applies to. The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`, as for a firmware image.

### To follow the operation {#to-follow-the-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request every 5 seconds until the `status` is SUCCESSFUL or FAILED:

```http
GET /devicecontrol/operations/<operation_id>
```

A firmware installation can take a long time. Choose a timeout that fits the device. If the operation is still EXECUTING after the timeout, do not cancel it, because the device can still complete it. If the operation is FAILED, the `failureReason` property describes why.

For the meaning of each status and how to cancel an operation that stays PENDING, see [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation).

### To check the installed firmware {#to-check-the-installed-firmware}

After the operation is SUCCESSFUL, send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The `c8y_Firmware` fragment of the device contains the new firmware:

```json
{
  "c8y_Firmware": {
    "name": "<firmware_name>",
    "version": "<firmware_version>",
    "url": "<firmware_url>"
  }
}
```

The device writes this fragment, not the platform. If the operation is SUCCESSFUL but the fragment is missing or shows another version, the device agent did not report its new state. The result of the operation still applies.

To update the firmware of many devices at once, test the firmware on one device first and then schedule the operation for a group of devices, see [Run a bulk operation on a device group](/skills/device-management/run-bulk-operation/).
