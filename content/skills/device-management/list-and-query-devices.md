---
title: List and query devices
description: List the devices of your tenant, filter them by name, type, and fragment with the inventory query language, and page through all results.
weight: 103
requires:
  - authentication
api:
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
---

Devices are managed objects in the inventory that contain the fragment `c8y_IsDevice`. To find devices, send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with a `query` parameter in the inventory query language.

### How the inventory query language works {#how-the-inventory-query-language-works}

A query has the form `$filter=<expression> $orderby=<property> asc|desc`. The following elements are available:

* **Comparison**: `eq`, `gt`, `ge`, `lt`, and `le`, for example `name eq 'Device1'`.
* **Logic**: `and`, `or`, and `not`. Group expressions with parentheses.
* **Strings**: In single quotes. The wildcard `*` matches 0 to N characters, for example `name eq 'pump-*'`. Matching with a wildcard is case-insensitive. Matching without a wildcard is exact and case-sensitive.
* **Decimal numbers**: With the suffix `f` or `d`, for example `c8y_Position.lng lt 16.5d`. Without the suffix, the number is compared as a string.
* **Fragments**: `has(c8y_Position)` matches objects with the fragment. `hasany(c8y_Position,c8y_Mobile)` matches objects with at least one of the fragments. Both functions only support custom fragments, not standard properties such as `id`, `type`, `name`, `owner`, `creationTime`, or `lastUpdated`.
* **Nested properties**: `c8y_Availability.status eq 'AVAILABLE'`.
* **Sorting**: `$orderby=name asc` or `$orderby=creationTime.date desc`.

For all elements and functions, see [Query language](https://{{< domain-c8y >}}/api/core/#tag/Query-language) in the {{< openapi >}}.

Follow these rules:

* URL-encode the whole `query` value, for example, a space as `%20`. The examples in this skill show the query without encoding to make it readable. If your API client takes the query parameters separately, it encodes them for you.
* Put the type condition into the query, for example `type eq 'c8y_MQTTDevice'`. If the request contains a `query` parameter, the platform ignores a separate `type` parameter.
* Set the page size with `pageSize`. The default is 5, the maximum is 2000.

The parameter `q` is a shorthand for device queries. It accepts the same expression as `query` and adds the condition `fragmentType=c8y_IsDevice`. The examples use `query` with `has(c8y_IsDevice)`, so that each condition is visible.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To list and query devices: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

### To list all devices {#to-list-all-devices}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

```http
GET /inventory/managedObjects?query=$filter=has(c8y_IsDevice) $orderby=name asc&pageSize=100&withTotalElements=true
```

The platform returns HTTP 200 and the first page of devices in the `managedObjects` array, sorted by name. With `withTotalElements=true`, the property `statistics.totalElements` contains the number of all devices that match the query. The platform caches this number for 10 seconds.

If the platform returns HTTP 422, the query or its URL encoding is invalid. Check the expression against the rules above.

### To filter devices by name {#to-filter-devices-by-name}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

```http
GET /inventory/managedObjects?query=$filter=(has(c8y_IsDevice) and name eq 'pump-*')&pageSize=100
```

The platform returns HTTP 200 and the devices whose name matches the pattern. An empty `managedObjects` array means that no device matches.

To find the managed object ID of a device by its exact name, use the name without a wildcard, for example `name eq 'pump-17'`. The `id` of the matching object is the ID that other requests expect. If the query returns several devices, the name is not unique. Select the device by other properties, such as its `type`.

### To filter devices by type {#to-filter-devices-by-type}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

```http
GET /inventory/managedObjects?query=$filter=(type eq 'c8y_MQTTDevice' and has(c8y_IsDevice))&pageSize=100
```

The platform returns HTTP 200 and the devices with `"type": "c8y_MQTTDevice"`.

### To filter devices by fragment {#to-filter-devices-by-fragment}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

```http
GET /inventory/managedObjects?query=$filter=(has(c8y_IsDevice) and has(c8y_Position))&pageSize=100
```

The platform returns HTTP 200 and the devices that contain the fragment `c8y_Position`. To match devices with any of several fragments, use `hasany(c8y_Position,c8y_Mobile)` instead of several `has()` functions joined with `or`.

### To page through all devices {#to-page-through-all-devices}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with the page number in `currentPage`:

```http
GET /inventory/managedObjects?query=$filter=has(c8y_IsDevice) $orderby=name asc&pageSize=100&currentPage=1&withTotalPages=true
```

The property `statistics.totalPages` contains the number of pages. Repeat the request with `currentPage=2`, `currentPage=3`, and so on, until the `managedObjects` array is empty or the response has no `next` link. Alternatively, send a GET request to the URL in the `next` link of each response.

Send the same query, with the same sort order and `pageSize`, for all pages. If a page contains devices that an earlier page already contained, devices were created or deleted while you paged. Start again with page 1.

In the Device Management application, you can filter the device list by its columns, see [To filter devices](/device-management-application/viewing-all-devices/#to-filter-devices).
