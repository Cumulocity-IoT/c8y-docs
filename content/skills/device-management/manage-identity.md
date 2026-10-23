---
title: Manage the external IDs of a device
description: Create an external ID for a device, find the device by its external ID, list all external IDs of the device, and delete an external ID.
when: "the user wants to create, list, or delete the external IDs of a device, or find a device by its external ID"
weight: 108
requires:
  - authentication
api:
  - operation: postExternalIDCollectionResource
    method: POST
    path: /identity/globalIds/{id}/externalIds
    title: Create an external ID
  - operation: getExternalIDResource
    method: GET
    path: /identity/externalIds/{type}/{externalId}
    title: Retrieve a specific external ID
  - operation: getExternalIDCollectionResource
    method: GET
    path: /identity/globalIds/{id}/externalIds
    title: Retrieve all external IDs of a specific managed object
  - operation: deleteExternalIDResource
    method: DELETE
    path: /identity/externalIds/{type}/{externalId}
    title: Remove a specific external ID
---

An external ID maps an identifier from outside {{< product-c8y-iot >}}, such as the IMEI of a modem or a serial number, to the managed object of a device. With its external ID, a device finds its managed object. An external ID consists of a `type` and a value, the `externalId`. Common types are `c8y_Serial` for serial numbers and `c8y_IMEI` for IMEIs.

The following rules apply:

* A managed object can have any number of external IDs.
* In a tenant, each combination of type and value belongs to at most one managed object.
* A request to read or delete an external ID names only its type and value, not the managed object.
* When you delete an external ID, the managed object stays unchanged.

Devices that connect with MQTT and SmartREST 2.0 use their MQTT client ID as the external ID. The platform creates this external ID when the device creates its managed object with the static template 100. For details, see [Identity](/device-integration/fragment-library/#identity) in the fragment library.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and delete external IDs: ROLE_IDENTITY_ADMIN
* To read external IDs: ROLE_IDENTITY_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the managed object ID of the device, `<type>` for the type of the external ID, and `<external_id>` for its value. To find the ID of a device by its name, see [To filter devices by name](/skills/device-management/list-and-query-devices/#to-filter-devices-by-name).

### To create an external ID {#to-create-an-external-id}

Send a [Create an external ID](https://{{< domain-c8y >}}/api/core/#operation/postExternalIDCollectionResource) request:

```http
POST /identity/globalIds/<device_id>/externalIds
Content-Type: application/json
Accept: application/json

{
  "externalId": "device-4711",
  "type": "c8y_Serial"
}
```

The platform returns HTTP 201 and the external ID with its `externalId`, its `type`, and the `managedObject` that it belongs to.

If the platform returns one of the following errors, the external ID is not created:

* **HTTP 404**: The managed object `<device_id>` does not exist.
* **HTTP 409**: The external ID already belongs to another managed object. To find that object, see [To find a device by its external ID](#to-find-a-device-by-its-external-id).

### To find a device by its external ID {#to-find-a-device-by-its-external-id}

Send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request:

```http
GET /identity/externalIds/<type>/<external_id>
```

The platform returns HTTP 200 and the external ID. `managedObject.id` is the ID of the managed object that the external ID belongs to.

If the platform returns HTTP 404, no managed object has this external ID.

### To list all external IDs of a device {#to-list-all-external-ids-of-a-device}

Send a [Retrieve all external IDs of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDCollectionResource) request:

```http
GET /identity/globalIds/<device_id>/externalIds
```

The platform returns HTTP 200 and the `externalIds` array. Each entry contains the `externalId` and the `type`.

### To delete an external ID {#to-delete-an-external-id}

{{< c8y-admon-caution >}}
The request names only the type and the value. The platform deletes the external ID from the managed object that it belongs to, even if this is not the device that you expect. Check the managed object first, see [To find a device by its external ID](#to-find-a-device-by-its-external-id).
{{< /c8y-admon-caution >}}

Send a [Remove a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/deleteExternalIDResource) request:

```http
DELETE /identity/externalIds/<type>/<external_id>
```

The platform returns HTTP 204. The managed object stays in the inventory. If the platform returns HTTP 404, the external ID does not exist anymore.

To check the deletion, send the request of [To find a device by its external ID](#to-find-a-device-by-its-external-id) again. It returns HTTP 404.

In the Device Management application, the **Identity** tab of a device lists its external IDs, see [Identity](/device-management-application/viewing-device-details/#identity).
