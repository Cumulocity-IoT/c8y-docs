---
title: Apply a device profile to a device
description: Check that a device supports device profiles, read the profile, create a c8y_DeviceProfile operation, follow it, and check that the device reports the profile as executed.
weight: 310
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

A device profile combines a firmware version, software packages, and configuration files that a device installs together. To apply a profile to a device, you create a `c8y_DeviceProfile` operation with the content of the profile. The device installs the firmware first, the software second, and the configuration third, exactly like the individual `c8y_Firmware`, `c8y_SoftwareUpdate`, and typed `c8y_DownloadConfigFile` operations.

To create a profile, see [Manage device profiles](/skills/device-management/manage-device-profiles/). The profile operation follows the same lifecycle as every other operation, see [Send an operation to a device](/skills/device-management/send-operation/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device and the profile: ROLE_INVENTORY_READ
* To create operations: ROLE_DEVICE_CONTROL_ADMIN
* To read operations: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device, `<profile_id>` for the ID of the device profile, and `<operation_id>` for the ID of the operation. Both IDs are the `id` that the platform assigned to the managed object, not its name. A request with the name instead of the ID returns HTTP 404.

### To check that the device supports device profiles {#to-check-that-the-device-supports-device-profiles}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

Check the following properties in the response:

* The fragment `c8y_IsDevice` is present.
* The array `c8y_SupportedOperations` contains `"c8y_DeviceProfile"`.

If `c8y_DeviceProfile` is missing in `c8y_SupportedOperations`, do not create the operation. The device does not support device profiles.

### To read the device profile {#to-read-the-device-profile}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request for the profile:

```http
GET /inventory/managedObjects/<profile_id>
```

Check the following properties in the response:

* The `type` is `c8y_Profile`.
* The `name` is the name of the profile. Note it as `<profile_name>`.
* The fragment `c8y_DeviceProfile` contains the firmware, software, and configuration of the profile.

If the `type` is not `c8y_Profile` or the fragment `c8y_DeviceProfile` is missing, the object is not a device profile. If the platform returns HTTP 404, the profile does not exist.

### To create the operation {#to-create-the-operation}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request. Copy the `c8y_DeviceProfile` fragment from the profile unchanged:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "profileId": "<profile_id>",
  "profileName": "<profile_name>",
  "description": "Assign device profile <profile_name> to device <device_id>",
  "c8y_DeviceProfile": {
    "firmware": {
      "name": "device_fw",
      "version": "1.0.1",
      "url": "https://example.com/fw"
    },
    "software": [
      {
        "name": "curl",
        "action": "install",
        "version": "2.3.4",
        "url": "https://example.com/curl"
      }
    ],
    "configuration": [
      {
        "name": "agent_conf",
        "type": "agent_conf",
        "url": "https://example.com/agent.conf"
      }
    ]
  }
}
```

The properties `profileId`, `profileName`, and `c8y_DeviceProfile` are mandatory. Send the ID of the profile as `profileId`, never its name. The device copies `profileId` into its own managed object, so a wrong value ends up there.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422, the device is not an agent, and none of its parent devices is an agent.

### To follow the operation {#to-follow-the-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request every 5 seconds until the `status` is SUCCESSFUL or FAILED:

```http
GET /devicecontrol/operations/<operation_id>
```

The device installs all parts of the profile before it reports the result, so choose a timeout that fits the profile. If the operation is FAILED, the `failureReason` property describes why. For the meaning of each status and how to cancel an operation that stays PENDING, see [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation).

### To check that the device executed the profile {#to-check-that-the-device-executed-the-profile}

While the device applies the profile, it sets the `c8y_Profile` fragment in its own managed object with `"profileExecuted": false`. After it has installed all parts, it sets `profileExecuted` to `true`.

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

After a SUCCESSFUL operation, the response contains the following fragment:

```json
{
  "c8y_Profile": {
    "profileName": "<profile_name>",
    "profileId": "<profile_id>",
    "profileExecuted": true
  }
}
```

* **`profileExecuted` is `false`**: The device still applies the profile, or it stopped in the middle. Check again after 30 seconds.
* **`profileId` differs from `<profile_id>`**: The device reports another profile.
* **`c8y_Profile` is missing**: The device agent does not report the profile. The result of the operation still applies.

To apply a profile to many devices at once, schedule the operation for a group of devices, see [Run a bulk operation on a device group](/skills/device-management/run-bulk-operation/).
