---
title: Replace a device
description: Replace the hardware of a device and keep its history by moving the external IDs and hardware information of a replacement device to the original device, deleting the replacement device, and recording the replacement.
when: "the user wants to replace the hardware of a device and keep its history"
weight: 240
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: getExternalIDCollectionResource
    method: GET
    path: /identity/globalIds/{id}/externalIds
    title: Retrieve all external IDs of a specific managed object
  - operation: getCurrentUserResource
    method: GET
    path: /user/currentUser
    title: Retrieve the current user
  - operation: getExternalIDResource
    method: GET
    path: /identity/externalIds/{type}/{externalId}
    title: Retrieve a specific external ID
  - operation: deleteExternalIDResource
    method: DELETE
    path: /identity/externalIds/{type}/{externalId}
    title: Remove a specific external ID
  - operation: postExternalIDCollectionResource
    method: POST
    path: /identity/globalIds/{id}/externalIds
    title: Create an external ID
  - operation: putManagedObjectResource
    method: PUT
    path: /inventory/managedObjects/{id}
    title: Update a specific managed object
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
  - operation: postEventCollectionResource
    method: POST
    path: /event/events
    title: Create an event
  - operation: postAuditRecordCollectionResource
    method: POST
    path: /audit/auditRecords
    title: Create an audit record
---

When the hardware of a device breaks, you replace it and keep the data that the old hardware recorded. First, register the new hardware like any other device, see [Register a device](/skills/device-management/register-device/). The platform now has two managed objects:

* The original device keeps its ID and all its data. It receives the external IDs, the hardware information, and the owner of the replacement device.
* The replacement device is the managed object that the new hardware created. You delete it after you moved its identity to the original device.

After the replacement, the new hardware sends its data to the original device. The Device Management application offers the same procedure as a wizard, see [To replace a device](/device-management-application/viewing-all-devices/#to-replace-a-device). The wizard also deletes the device user of the original device if this user owns no other managed objects. This skill does not delete users. For the steps in the context of a device integration, see [Replacing a physical device](/device-integration/device-integration-rest/#replacing-a-physical-device).

{{< c8y-admon-caution >}}
The replacement deletes the replacement device and all data generated for it so far.
{{< /c8y-admon-caution >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the devices: ROLE_INVENTORY_READ
* To update and delete the devices: ROLE_INVENTORY_ADMIN
* To read external IDs: ROLE_IDENTITY_READ
* To move external IDs: ROLE_IDENTITY_ADMIN
* To create the event: ROLE_EVENT_ADMIN
* To create the audit record: ROLE_AUDIT_ADMIN
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the original device and `<replacement_device_id>` for the ID of the replacement device.

### To check both devices {#to-check-both-devices}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request for the original device, and the same request with `<replacement_device_id>` for the replacement device:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 for both requests. Check the following:

* Both managed objects contain the fragment `c8y_IsDevice`.
* `<device_id>` and `<replacement_device_id>` are different.
* The replacement device has an `owner`. Note it as `<replacement_owner>`.

Also note the `c8y_Hardware` fragment of the replacement device exactly as returned, if it has one. You need it later, and it is gone when you delete the replacement device.

If the platform returns HTTP 404, the device does not exist.

### To record the current state {#to-record-the-current-state}

1. Send a [Retrieve all external IDs of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDCollectionResource) request for the original device, and the same request with `<replacement_device_id>` for the replacement device:

    ```http
    GET /identity/globalIds/<device_id>/externalIds
    ```

    The `externalIds` array of each response lists the external IDs of the device, each with `externalId` and `type`. Note both lists. Either list can be empty.

2. Send a [Retrieve the current user](https://{{< domain-c8y >}}/api/core/#operation/getCurrentUserResource) request:

    ```http
    GET /user/currentUser
    ```

    Note the `id` of the user as `<user_id>`.

3. Note the current time in UTC in ISO 8601 format as `<replacement_time>`, for example `2026-10-14T09:30:00.000Z`.

Record the external IDs only once, before you move them. Afterwards, the original device also lists the external IDs of the replacement device.

### To move the external IDs to the original device {#to-move-the-external-ids-to-the-original-device}

A delete request removes an external ID from whichever device holds it. Therefore, check the holder of each external ID before you delete it.

For each external ID of the replacement device, with `<type>` and `<external_id>` from the list:

1. Send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request:

    ```http
    GET /identity/externalIds/<type>/<external_id>
    ```

    Continue only if `managedObject.id` in the response is `<replacement_device_id>`. If another device holds the external ID, do not delete or move it.

2. Send a [Remove a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/deleteExternalIDResource) request:

    ```http
    DELETE /identity/externalIds/<type>/<external_id>
    ```

    The platform returns HTTP 204. HTTP 404 means that the external ID is already removed.

3. Send a [Create an external ID](https://{{< domain-c8y >}}/api/core/#operation/postExternalIDCollectionResource) request for the original device:

    ```http
    POST /identity/globalIds/<device_id>/externalIds
    Content-Type: application/json
    Accept: application/json

    {
      "externalId": "<external_id>",
      "type": "<type>"
    }
    ```

    The platform returns HTTP 201 and the external ID. If it returns HTTP 409, a different managed object holds the external ID. Look up the holder with the request of step 1 and stop. Do not delete that external ID.

Then remove the previous external IDs of the original device. For each external ID in the list of the original device that the replacement device did not have, check with the request of step 1 that `managedObject.id` is `<device_id>`, and delete it with the request of step 2.

### To update the original device {#to-update-the-original-device}

Send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request:

```http
PUT /inventory/managedObjects/<device_id>
Content-Type: application/json
Accept: application/json

{
  "owner": "<replacement_owner>",
  "c8y_LastReplacement": {
    "time": "<replacement_time>",
    "user": "<user_id>",
    "previousExternalIds": [
      { "externalId": "<previous_external_id>", "type": "c8y_Serial" }
    ]
  },
  "c8y_Hardware": {
    "serialNumber": "<replacement_serial_number>",
    "model": "<replacement_model>",
    "revision": "<replacement_revision>"
  }
}
```

The request body has the following properties:

* `owner`: The owner of the replacement device.
* `c8y_LastReplacement`: The record of this replacement. `previousExternalIds` lists the external IDs that the original device had before the replacement, or is an empty array if it had none.
* `c8y_Hardware`: The `c8y_Hardware` fragment of the replacement device, exactly as you noted it. If the replacement device has no `c8y_Hardware`, leave the property out. Do not guess the values.

The update is partial. All other fragments of the original device stay unchanged. The platform returns HTTP 200 and the device with `c8y_LastReplacement`.

### To delete the replacement device {#to-delete-the-replacement-device}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<replacement_device_id>
```

Do not add the parameter `withDeviceUser=true`. The new hardware still needs its device user.

The platform returns HTTP 204 when it deleted the managed object within 30 seconds. HTTP 202 means that the deletion continues in the background. To check that the deletion is complete, send `GET /inventory/managedObjects/<replacement_device_id>` until it returns HTTP 404.

### To record the replacement {#to-record-the-replacement}

The Device Management application records every replacement in an event and an audit record. Create both with the same text. The text lists the external IDs before and after the replacement, each as `<external_id> [<type>]`, separated by commas.

1. Send a [Create an event](https://{{< domain-c8y >}}/api/core/#operation/postEventCollectionResource) request:

    ```http
    POST /event/events
    Content-Type: application/json
    Accept: application/json

    {
      "source": { "id": "<device_id>" },
      "type": "c8y_DeviceReplaced",
      "time": "<replacement_time>",
      "text": "Device with external ID(s) SN-0001 [c8y_Serial] was replaced by device with external ID(s) SN-0002 [c8y_Serial]"
    }
    ```

    The platform returns HTTP 201 and the event with its `id`. The event appears in the **Events** tab of the device, see [Events](/device-management-application/viewing-device-details/#events).

2. Send a [Create an audit record](https://{{< domain-c8y >}}/api/core/#operation/postAuditRecordCollectionResource) request:

    ```http
    POST /audit/auditRecords
    Content-Type: application/json
    Accept: application/json

    {
      "activity": "Device replaced",
      "source": { "id": "<device_id>" },
      "text": "Device with external ID(s) SN-0001 [c8y_Serial] was replaced by device with external ID(s) SN-0002 [c8y_Serial]",
      "time": "<replacement_time>",
      "type": "Inventory",
      "user": "<user_id>"
    }
    ```

    The platform returns HTTP 201 and the audit record with its `id`. The record appears in the audit logs, see [Audit logs](/standard-tenant/monitoring/#audit-logs).

The original device now has the external IDs of the replacement device, and the replacement device no longer exists.
