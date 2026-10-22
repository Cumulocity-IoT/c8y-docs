---
title: Manage child devices
description: Assign a device as a child device of another device, create a new child device in one request, list the child devices, and remove the assignment again.
when: "the user wants to assign, create, list, or remove the child devices of a device"
weight: 104
requires:
  - authentication
api:
  - operation: postManagedObjectChildDevicesResource
    method: POST
    path: /inventory/managedObjects/{id}/childDevices
    title: Assign a managed object as child device
  - operation: getManagedObjectChildDevicesResource
    method: GET
    path: /inventory/managedObjects/{id}/childDevices
    title: Retrieve all child devices of a specific managed object
  - operation: deleteManagedObjectChildDeviceResource
    method: DELETE
    path: /inventory/managedObjects/{id}/childDevices/{childId}
    title: Remove a specific child device from its parent
---

A managed object can have children. A gateway, for example, has the devices that connect through it as child devices. The parent stores references to its children in three collections:

| Collection | Use | Fragment on the child that names the parent |
|---|---|---|
| `childDevices` | The communication hierarchy: devices that connect through the parent | `deviceParents` |
| `childAssets` | The asset hierarchy, for example the devices and subgroups of a group | `assetParents` |
| `childAdditions` | Additional objects of the parent, for example the services of a device | `additionParents` |

All three collections use the same requests. This skill uses `childDevices`. For the other collections, replace `childDevices` in the path with `childAssets` or `childAdditions`. For the concept, see [Object hierarchies](/concepts/domain-model/#object-hierarchies).

A child reference only links two managed objects. When you remove the reference, the child stays in the inventory.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To assign, create, and remove children: ROLE_INVENTORY_ADMIN
* To list children: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<parent_id>` for the managed object ID of the parent and `<child_id>` for the managed object ID of the child. To find the ID of a device by its name, see [To filter devices by name](/skills/device-management/list-and-query-devices/#to-filter-devices-by-name).

### To assign a device as a child device {#to-assign-a-device-as-a-child-device}

Send an [Assign a managed object as child device](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectChildDevicesResource) request with a reference to the child:

```http
POST /inventory/managedObjects/<parent_id>/childDevices
Content-Type: application/vnd.com.nsn.cumulocity.managedobjectreference+json
Accept: application/json

{ "managedObject": { "id": "<child_id>" } }
```

The platform returns HTTP 201 and the new reference, in which `managedObject.id` is `<child_id>`. If the platform returns HTTP 404, the parent does not exist.

To assign several children in one request, send a collection of references:

```http
POST /inventory/managedObjects/<parent_id>/childDevices
Content-Type: application/vnd.com.nsn.cumulocity.managedobjectreferencecollection+json
Accept: application/json

{
  "references": [
    { "managedObject": { "id": "<child_id>" } },
    { "managedObject": { "id": "<second_child_id>" } }
  ]
}
```

The response confirms that the platform created the reference. The reference appears in the list of children and in the `deviceParents` fragment of the child after a short delay.

### To list the child devices {#to-list-the-child-devices}

Send a [Retrieve all child devices of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectChildDevicesResource) request:

```http
GET /inventory/managedObjects/<parent_id>/childDevices?pageSize=2000
```

The platform returns HTTP 200 and the `references` array. Each entry contains the child in `managedObject`, with its `id` and `name`.

After an assignment, repeat the request every 2 seconds until the child is in the list. If the child is still missing after 30 seconds, check the response of the assignment.

The list of the parent is the reliable way to check an assignment. The `deviceParents` fragment of the child can take much longer to show the parent.

### To create a new child device {#to-create-a-new-child-device}

You can create a managed object and assign it as a child device in one request. Send an [Assign a managed object as child device](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectChildDevicesResource) request with the new managed object as the request body:

```http
POST /inventory/managedObjects/<parent_id>/childDevices
Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json
Accept: application/json

{
  "name": "Temperature sensor 1",
  "c8y_IsDevice": {}
}
```

Include the fragment `c8y_IsDevice` in child devices. The platform then handles them as devices, for example, it shows them in the device lists. For child assets and child additions, omit this fragment.

The platform returns HTTP 201. It creates the managed object in the inventory and adds it to the child devices of the parent. Note the ID of the new child from `managedObject.id` in the response. If the response contains no ID, find the new child by its name in the list of child devices, see [To list the child devices](#to-list-the-child-devices).

### To remove a child device {#to-remove-a-child-device}

Send a [Remove a specific child device from its parent](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectChildDeviceResource) request:

```http
DELETE /inventory/managedObjects/<parent_id>/childDevices/<child_id>
```

The platform returns HTTP 204 and removes the reference. The child stays in the inventory. To delete the child itself, see [Delete a device](/skills/device-management/delete-device/).

If the platform returns HTTP 422 with a message that contains `is not a child of object`, the reference does not exist. It was never created or is already removed. If the platform returns HTTP 404, the parent does not exist.

In the Device Management application, the **Child devices** tab of a device lists its child devices, see [Child devices](/device-management-application/viewing-device-details/#child-devices).
