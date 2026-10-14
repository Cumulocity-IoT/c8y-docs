---
title: Manage device groups
description: Create a device group, assign devices to it and remove them, list and query its members, create a smart group whose members are the result of a stored query, and delete groups.
weight: 106
sector:
  - recipes
  - device_management
requires:
  - authentication
api:
  - operation: postManagedObjectCollectionResource
    method: POST
    path: /inventory/managedObjects
    title: Create one or multiple managed objects
  - operation: postManagedObjectChildAssetsResource
    method: POST
    path: /inventory/managedObjects/{id}/childAssets
    title: Assign a managed object as child asset
  - operation: getManagedObjectChildAssetsResource
    method: GET
    path: /inventory/managedObjects/{id}/childAssets
    title: Retrieve all child assets of a specific managed object
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: deleteManagedObjectChildAssetResource
    method: DELETE
    path: /inventory/managedObjects/{id}/childAssets/{childId}
    title: Remove a specific child asset from its parent
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
---

Groups organize devices according to your use case. A device can be in several groups, and a group can be part of other groups. Together with inventory roles, groups also control which users can access which devices. {{< product-c8y-iot >}} has two kinds of groups:

* A **device group** is a managed object with the fragment `c8y_IsDeviceGroup` and the type `c8y_DeviceGroup`. You assign its members explicitly. The members are child assets of the group.
* A **smart group** is a managed object with the fragment `c8y_IsDynamicGroup` and the type `c8y_DynamicGroup`. Its fragment `c8y_DeviceQueryString` stores an inventory query. The members are the devices that match the query at the time you read them. The platform stores no child references for a smart group.

Smart groups are only visible in the Device Management application, not in the Cockpit application.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and delete groups, and to assign and remove devices: ROLE_INVENTORY_ADMIN
* To list the members of groups: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<group_id>` for the managed object ID of a device group, `<smart_group_id>` for the ID of a smart group, and `<device_id>` for the managed object ID of a device. To find the ID of a device by its name, see [To filter devices by name](/recipes/list-and-query-devices/#to-filter-devices-by-name).

### To create a device group {#to-create-a-device-group}

Send a [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) request:

```http
POST /inventory/managedObjects
Content-Type: application/json
Accept: application/json

{
  "name": "Building A",
  "type": "c8y_DeviceGroup",
  "c8y_IsDeviceGroup": {}
}
```

The platform returns HTTP 201 and the new group with its `id` and `"type": "c8y_DeviceGroup"`. Note the `id` as `<group_id>`.

### To assign a device to the group {#to-assign-a-device-to-the-group}

Send an [Assign a managed object as child asset](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectChildAssetsResource) request:

```http
POST /inventory/managedObjects/<group_id>/childAssets
Content-Type: application/vnd.com.nsn.cumulocity.managedobjectreference+json
Accept: application/json

{ "managedObject": { "id": "<device_id>" } }
```

The platform returns HTTP 201 and the new reference, in which `managedObject.id` is `<device_id>`. If the platform returns HTTP 404, the group or the device does not exist.

To assign a subgroup, send the same request with the ID of the subgroup.

### To list the members of the group {#to-list-the-members-of-the-group}

Send a [Retrieve all child assets of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectChildAssetsResource) request:

```http
GET /inventory/managedObjects/<group_id>/childAssets?pageSize=100
```

The platform returns HTTP 200 and the `references` array. Each entry contains a member of the group in `managedObject`.

### To query devices by group {#to-query-devices-by-group}

To combine group membership with other conditions, use the inventory query language. Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

```http
GET /inventory/managedObjects?query=$filter=bygroupid(<group_id>)&pageSize=100
```

The platform returns HTTP 200 and the members of the group in the `managedObjects` array. URL-encode the whole `query` value. The query language has two functions for groups:

* `bygroupid(<group_id>,<second_group_id>)`: The direct members of the listed groups.
* `isinhierarchyof(<group_id>)`: The group itself and all of its descendants, including subgroups and their members.

For more conditions, see [List and query devices](/recipes/list-and-query-devices/).

### To remove a device from the group {#to-remove-a-device-from-the-group}

Send a [Remove a specific child asset from its parent](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectChildAssetResource) request:

```http
DELETE /inventory/managedObjects/<group_id>/childAssets/<device_id>
```

The platform returns HTTP 204. It removes only the reference. The device stays in the inventory.

If the platform returns HTTP 422, the device is not a member of the group.

### To create a smart group {#to-create-a-smart-group}

Send a [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) request with the query in `c8y_DeviceQueryString`:

```http
POST /inventory/managedObjects
Content-Type: application/json
Accept: application/json

{
  "name": "All pumps",
  "type": "c8y_DynamicGroup",
  "c8y_IsDynamicGroup": {},
  "c8y_DeviceQueryString": "$filter=(name eq 'pump-*')"
}
```

The platform returns HTTP 201 and the new smart group with its `id` and `"type": "c8y_DynamicGroup"`. Note the `id` as `<smart_group_id>`.

### To list the members of a smart group {#to-list-the-members-of-a-smart-group}

1. Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

    ```http
    GET /inventory/managedObjects/<smart_group_id>
    ```

    The platform returns HTTP 200 and the smart group. Read the query from `c8y_DeviceQueryString`, here `$filter=(name eq 'pump-*')`.

2. Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with the query as the `query` parameter:

    ```http
    GET /inventory/managedObjects?query=$filter=(name eq 'pump-*')&pageSize=100
    ```

    The query already starts with `$filter=`. URL-encode it as one parameter value.

The platform returns HTTP 200 and the devices that match the query now in the `managedObjects` array. An empty array means that no device matches.

### To delete a group {#to-delete-a-group}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<group_id>
```

The platform returns HTTP 204. It also deletes the subgroups of the group. The devices of the group and its subgroups stay in the inventory, because the parameter `cascade` is `false` by default. With `cascade=true`, the platform also deletes the devices.

To delete a smart group, send the same request with `<smart_group_id>`. The devices that match its query are not affected.

In the Device Management application, you manage groups in the **Groups** menu, see [Grouping devices](/device-management-application/grouping-devices/).
