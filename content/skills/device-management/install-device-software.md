---
title: Install software on a device
description: Check which software operation a device supports, create a c8y_SoftwareUpdate, c8y_SoftwareList, or c8y_Software operation to install a software package, and follow the operation until the device reports the result.
when: "the user wants to install a software package on a device"
weight: 330
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

To install software on a device, you create an operation with the software packages that the device must install. The device agent downloads, installs, and removes the packages, handles all errors, and reports the result.

The format of the operation depends on the operations that the device lists in its `c8y_SupportedOperations` fragment. Check the following fragments in this order and use the first one that the device supports:

1. `c8y_SoftwareUpdate`: The operation lists only the packages to change. The device does not touch any other package.
2. `c8y_SoftwareList`: The operation lists all packages that are installed afterwards. The device removes every installed package that is missing in the list.
3. `c8y_Software`: The legacy format. The operation maps the name of each package to its version and also describes all packages that are installed afterwards.

Create exactly one operation. If the device supports none of these operations, no agent installs the software. The software operation follows the same lifecycle as every other operation, see [Send an operation to a device](/skills/device-management/send-operation/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device: ROLE_INVENTORY_READ
* To create operations: ROLE_DEVICE_CONTROL_ADMIN
* To read operations: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device and `<operation_id>` for the ID of the operation. The device ID is the `id` that the platform assigned to the device, not its name. The examples install the package `<software_name>` in the version `<software_version>` from the URL `<software_url>`. Take these values from the software repository, see [Manage the software repository](/skills/device-management/manage-software-repository/). If the device resolves the file itself, for example with a package manager, send an empty string as URL. If the device cannot resolve the file, it sets the operation to FAILED.

### To check which software operation the device supports {#to-check-which-software-operation-the-device-supports}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

Check the following properties in the response:

* The fragment `c8y_IsDevice` is present.
* The array `c8y_SupportedOperations` contains `"c8y_SoftwareUpdate"`, `"c8y_SoftwareList"`, or `"c8y_Software"`. Use the first of them in this order.
* The array `c8y_SupportedSoftwareTypes`, if present, lists the software types that the device can install.

The fragments `c8y_SoftwareList` and `c8y_Software` of the response contain the software that is installed now. You need them for the `c8y_SoftwareList` and `c8y_Software` operations.

Devices with Advanced Software Management do not keep the `c8y_SoftwareList` fragment in their managed object. To read their installed software, see [Manage the installed software list of a device](/skills/device-management/manage-advanced-software/).

If the platform returns HTTP 404, no managed object with this ID exists.

### To install software with c8y_SoftwareUpdate {#to-install-software-with-c8ysoftwareupdate}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Install <software_name> <software_version>",
  "c8y_SoftwareUpdate": [
    {
      "name": "<software_name>",
      "version": "<software_version>",
      "url": "<software_url>",
      "action": "install"
    }
  ]
}
```

Each entry has the following properties:

* `name`, `version`, and `url`: The software package.
* `action`: `install` to install or update the package, or `delete` to remove it.
* `softwareType`: The type of the package, for example `apt`. If the device has the fragment `c8y_SupportedSoftwareTypes`, this property is mandatory. Such devices use [Advanced Software Management](/device-integration/fragment-library/#advanced-software-management).

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422, the device is not an agent, and none of its parent devices is an agent.

### To install software with c8y_SoftwareList {#to-install-software-with-c8ysoftwarelist}

The `c8y_SoftwareList` operation contains the complete list of software that the device has afterwards:

1. Copy the `c8y_SoftwareList` array from the managed object of the device.
2. Replace the entry with the name `<software_name>`, or add a new entry. Keep all other entries. The device removes every package that is missing in the list.
3. Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the complete list:

    ```http
    POST /devicecontrol/operations
    Content-Type: application/json
    Accept: application/json

    {
      "deviceId": "<device_id>",
      "description": "Install <software_name> <software_version>",
      "c8y_SoftwareList": [
        {
          "name": "<software_name>",
          "version": "<software_version>",
          "url": "<software_url>"
        },
        {
          "name": "<installed_software_name>",
          "version": "<installed_software_version>",
          "url": "<installed_software_url>"
        }
      ]
    }
    ```

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

### To install software with the legacy c8y_Software operation {#to-install-software-with-the-legacy-c8ysoftware-operation}

The legacy `c8y_Software` operation is an object that maps the name of each package to its version. Like `c8y_SoftwareList`, it describes all software that the device has afterwards:

1. Copy the `c8y_Software` object from the managed object of the device.
2. Set the key `<software_name>` to `<software_version>`. Keep all other keys. The device removes every package whose key is missing.
3. Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the complete object:

    ```http
    POST /devicecontrol/operations
    Content-Type: application/json
    Accept: application/json

    {
      "deviceId": "<device_id>",
      "description": "Install <software_name> <software_version>",
      "c8y_Software": {
        "<software_name>": "<software_version>",
        "<installed_software_name>": "<installed_software_version>"
      }
    }
    ```

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

### To follow the operation {#to-follow-the-operation}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request every 5 seconds until the `status` is SUCCESSFUL or FAILED:

```http
GET /devicecontrol/operations/<operation_id>
```

* **SUCCESSFUL**: The device installed the software. The device, not the platform, updates the list of installed software in the inventory.
* **FAILED**: The device did not reach the desired state. The `failureReason` property describes why.
* **Still PENDING after the timeout**: No agent picked up the operation. The device is offline, or it does not listen for this operation.
* **Still EXECUTING after the timeout**: The device started the installation but did not report a result.

For details and for how to cancel an operation that stays PENDING, see [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation).

To install software on many devices at once, test the installation on one device first and then schedule the operation for a group of devices, see [Run a bulk operation on a device group](/skills/device-management/run-bulk-operation/).
