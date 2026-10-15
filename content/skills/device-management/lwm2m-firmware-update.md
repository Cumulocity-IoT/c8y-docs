---
title: Update the firmware of an LWM2M device
description: Check an LWM2M device and the firmware in the repository, start an over-the-air firmware update with a c8y_Firmware operation, follow it, and cancel an update that does not complete.
weight: 503
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
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: getManagedObjectChildAdditionsResource
    method: GET
    path: /inventory/managedObjects/{id}/childAdditions
    title: Retrieve all child additions of a specific managed object
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: getOperationResource
    method: GET
    path: /devicecontrol/operations/{id}
    title: Retrieve a specific operation
  - operation: putOperationResource
    method: PUT
    path: /devicecontrol/operations/{id}
    title: Update a specific operation status
---

You update the firmware of an LWM2M device over the air (FOTA) with a `c8y_Firmware` operation, as for other devices. The LWM2M agent executes the operation with the standard LWM2M Firmware Update object (`/5`):

1. It resets the firmware update state machine on the device.
2. It delivers the firmware. With the PULL method, it writes the firmware URL to `/5/0/1`, and the device downloads the firmware. With the PUSH method, it writes the firmware binary to `/5/0/0`.
3. It executes `/5/0/2` to start the update on the device.
4. It sets the status of the operation from the update result that the device reports.

For details, see [LWM2M device firmware update (FOTA)](/device-integration/lwm2m/#firmware-update).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device and the firmware repository: ROLE_INVENTORY_READ
* To set the firmware update fragments of the device: ROLE_INVENTORY_ADMIN
* To create and cancel the operation: ROLE_DEVICE_CONTROL_ADMIN
* To read the operation: ROLE_DEVICE_CONTROL_READ
* To cancel the update in the LWM2M agent: ROLE_INVENTORY_ADMIN or ROLE_LWM2M_ADMIN
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the LWM2M device and `<operation_id>` for the ID of the firmware operation. The firmware is `<firmware_name>` in version `<firmware_version>`, with the binary at `<firmware_url>`.

### To check the device {#to-check-the-device}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the managed object. Check that the fragments `c8y_IsDevice` and `c8y_IsLwm2mDevice` are present. The LWM2M registration creates both.

If `c8y_IsLwm2mDevice` is missing, the device is not an LWM2M device, see [Update the firmware of a device](/skills/device-management/update-device-firmware/) instead. If the platform returns HTTP 404, the device does not exist.

### To set the delivery method of the device {#to-set-the-delivery-method-of-the-device}

This step is optional. By default, the agent reads the supported delivery methods and protocols from the device. To set them yourself, add the following fragments to the managed object of the device:

* `fwUpdateDeliveryMethod`: PUSH, PULL, or BOTH.
* `fwUpdateSupportedDeviceProtocol`: COAP, COAPS, HTTP, or HTTPS.
* `fwUpdateResetMechanism`: PACKAGE or PACKAGE_URI. The mechanism that resets the firmware update state machine.

Send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request:

```http
PUT /inventory/managedObjects/<device_id>
Content-Type: application/json
Accept: application/json

{
  "fwUpdateDeliveryMethod": "PULL",
  "fwUpdateSupportedDeviceProtocol": "COAP"
}
```

The platform returns HTTP 200 and the updated managed object. If `fwUpdateDeliveryMethod` or `fwUpdateSupportedDeviceProtocol` is set, the agent ignores the value that the device reports. If `fwUpdateResetMechanism` is set, the agent resets the state machine with this mechanism, regardless of the delivery method. For the details, see [Querying the device configuration](/device-integration/lwm2m/#querying-the-device-configuration) and [Resetting the state machine](/device-integration/lwm2m/#resetting-the-state-machine).

### To check the firmware in the repository {#to-check-the-firmware-in-the-repository}

The firmware must be in the firmware repository, see [Managing firmware](/device-management-application/managing-device-data/#managing-firmware). Its device type filter must be empty or `c8y_lwm2m`. Otherwise, the Device Management application does not offer the firmware for LWM2M devices. The operation still works.

1. Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request that searches the firmware by name. URL-encode the value of the `query` parameter:

    ```http
    GET /inventory/managedObjects?query=$filter=(type eq 'c8y_Firmware' and name eq '<firmware_name>')
    ```

    The `managedObjects` array of the response contains one entry with the name `<firmware_name>`. Note its `id` as `<firmware_id>`. Its `c8y_Filter.type` property is the device type filter. If the array is empty, add the firmware to the repository first, see [Manage the firmware repository](/skills/device-management/manage-firmware-repository/).

2. Send a [Retrieve all child additions of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectChildAdditionsResource) request to list the versions of the firmware:

    ```http
    GET /inventory/managedObjects/<firmware_id>/childAdditions
    ```

    Check that one of the versions has a `c8y_Firmware` fragment with `"version": "<firmware_version>"` and `"url": "<firmware_url>"`.

### To start the firmware update {#to-start-the-firmware-update}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Update firmware to: \"<firmware_name>\" (version: <firmware_version>)",
  "c8y_Firmware": {
    "name": "<firmware_name>",
    "version": "<firmware_version>",
    "url": "<firmware_url>"
  }
}
```

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

The agent queues the update. A device that is offline or asleep receives it with its next registration or registration update. A long PENDING status is therefore normal for LWM2M devices.

You can also start a firmware update with the `fwupdate` shell command, see [Run advanced LWM2M shell commands](/skills/device-management/lwm2m-shell-advanced/).

### To follow the firmware update {#to-follow-the-firmware-update}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the status is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation). For a firmware update, the statuses mean the following:

* **PENDING**: The agent has not reached the device yet. If the reset of the state machine fails because the device is not reachable, the operation stays PENDING, and the agent retries when the device connects.
* **EXECUTING**: The agent reset the state machine and delivers or installs the firmware. If the device goes offline during the update, the operation stays EXECUTING, and the agent resumes the update when the device connects again.
* **SUCCESSFUL**: The device reported a successful update. The agent writes the new firmware to the `c8y_Firmware` fragment of the device.
* **FAILED**: The reset of the state machine failed for another reason than reachability, the delivery failed, or the device reported a failed update. The `failureReason` property describes the cause.

To check the installed firmware, retrieve the managed object of the device again, see [To check the device](#to-check-the-device). After a successful update, its `c8y_Firmware` fragment contains `"name": "<firmware_name>"` and `"version": "<firmware_version>"`.

### To cancel a firmware update {#to-cancel-a-firmware-update}

If the update does not complete, for example because of network failures, cancel it and start a new one. `<tenant_id>` is the ID of your tenant.

1. Send a PUT request with an empty JSON body to the LWM2M agent, see [Canceling the firmware update process](/device-integration/lwm2m/#canceling-the-firmware-update-process):

    ```http
    PUT /service/lwm2m-agent/shell/<tenant_id>/<device_id>/cancelFirmwareUpdate
    Content-Type: application/json
    Accept: application/json

    {}
    ```

    The agent returns HTTP 200 and stops the firmware update process for the device.

2. If the operation is still PENDING or EXECUTING, set it to FAILED with an [Update a specific operation status](https://{{< domain-c8y >}}/api/core/#operation/putOperationResource) request:

    ```http
    PUT /devicecontrol/operations/<operation_id>
    Content-Type: application/json
    Accept: application/json

    {
      "status": "FAILED",
      "failureReason": "Canceled by operator"
    }
    ```

    The platform returns HTTP 200 and the operation with `"status": "FAILED"`. For details, see [To cancel a pending operation](/skills/device-management/send-operation/#to-cancel-a-pending-operation).
