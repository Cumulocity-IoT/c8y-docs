---
title: Manage device dashboards
description: Create a dashboard for a device, list the dashboards of a device, check that a dashboard belongs to the device, and delete it.
weight: 420
sector:
  - recipes
  - device_management
requires:
  - authentication
api:
  - operation: postManagedObjectChildAdditionsResource
    method: POST
    path: /inventory/managedObjects/{id}/childAdditions
    title: Assign a managed object as child addition
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: getManagedObjectChildAdditionsResource
    method: GET
    path: /inventory/managedObjects/{id}/childAdditions
    title: Retrieve all child additions of a specific managed object
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
---

A device dashboard is a managed object in the inventory that belongs to one device. It has the following fragments:

* `c8y_Dashboard`: The configuration of the dashboard, with its `name`, `priority`, `columns`, `widgetMargin`, and the widgets in `children`.
* `c8y_Dashboard!device!<device_id>`: An empty marker fragment. Its name contains the ID of the device.

The dashboard is a child addition of the device. You create the dashboard and assign it to the device with one request.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and delete dashboards: ROLE_INVENTORY_ADMIN or ROLE_MANAGED_OBJECT_ADMIN
* To read dashboards: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device and `<dashboard_id>` for the ID of the dashboard. `<device_id>` is the ID of the managed object of the device, never its name. It appears both in the path of the request and in the name of the marker fragment.

### To create a dashboard for a device {#to-create-a-dashboard-for-a-device}

Send an [Assign a managed object as child addition](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectChildAdditionsResource) request with the dashboard as body:

```http
POST /inventory/managedObjects/<device_id>/childAdditions
Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json
Accept: application/json

{
  "name": "Overview",
  "c8y_Dashboard": {
    "name": "Overview",
    "priority": 10000,
    "columns": 12,
    "widgetMargin": 12,
    "children": {}
  },
  "c8y_Dashboard!device!<device_id>": {}
}
```

The `Content-Type` header `application/vnd.com.nsn.cumulocity.managedobject+json` makes the platform create the managed object and assign it as child addition of the device. The empty `children` object creates a dashboard without widgets. To add widgets, see [To edit a dashboard](/cockpit/working-with-dashboards/#to-edit-a-dashboard).

The platform returns HTTP 201 and the dashboard with its `id` and `name`. Note the `id` as `<dashboard_id>`.

If the platform returns HTTP 404, the device does not exist.

### To list the dashboards of a device {#to-list-the-dashboards-of-a-device}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with a query for the marker fragment:

```http
GET /inventory/managedObjects?query=$filter=has('c8y_Dashboard!device!<device_id>')&pageSize=100
```

The name of the marker fragment contains `!`, so put it in single quotes inside `has()`. URL-encode the whole value of the `query` parameter. The Device Management application uses the same query.

The platform returns HTTP 200. The `managedObjects` array contains the dashboards of the device. The name of each dashboard is in `c8y_Dashboard.name`.

### To check that the dashboard belongs to the device {#to-check-that-the-dashboard-belongs-to-the-device}

Send a [Retrieve all child additions of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectChildAdditionsResource) request:

```http
GET /inventory/managedObjects/<device_id>/childAdditions?pageSize=100
```

The platform returns HTTP 200. The `references` array contains one entry for each child addition. One of the entries has `<dashboard_id>` in `managedObject.id`.

### To delete a dashboard {#to-delete-a-dashboard}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<dashboard_id>
```

The platform returns HTTP 204. The dashboard disappears from the child additions of the device and from the query in [To list the dashboards of a device](#to-list-the-dashboards-of-a-device).

{{< c8y-admon-info >}}
When you delete a device, its dashboards remain in the inventory. Delete them separately.
{{< /c8y-admon-info >}}

In the Device Management application, you add dashboards in the details of the device, see [Dashboard manager](/device-management-application/dashboard-manager/).
