---
title: Track the location of a device
description: Read and set the current position of a device, record location updates, query the movement of the device in a time range, and delete a location update.
weight: 280
sector:
  - device_management
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
  - operation: postEventCollectionResource
    method: POST
    path: /event/events
    title: Create an event
  - operation: getEventCollectionResource
    method: GET
    path: /event/events
    title: Retrieve all events
  - operation: deleteEventResource
    method: DELETE
    path: /event/events/{id}
    title: Remove a specific event
---

{{< product-c8y-iot >}} stores the location of a device in two places:

* The current position is the `c8y_Position` fragment in the managed object of the device.
* The movement history is a series of events of type `c8y_LocationUpdate`. Each event has its own `c8y_Position` fragment with the position at the time of the event.

The `c8y_Position` fragment has the following properties:

* `lat`: The latitude in degrees. Mandatory.
* `lng`: The longitude in degrees. Mandatory.
* `alt`: The altitude in meters. Optional.

In the Device Management application, the **Location** tab shows the current position, and the **Tracking** tab shows the movement, see [Location](/device-management-application/viewing-device-details/#location) and [Tracking](/device-management-application/viewing-device-details/#tracking). For the device side, see [Tracking](/device-integration/fragment-library/#tracking) in the fragment library.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the current position: ROLE_INVENTORY_READ
* To set the current position: ROLE_INVENTORY_ADMIN
* To record and delete location updates: ROLE_EVENT_ADMIN
* To read location updates: ROLE_EVENT_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device, and `<date_from>` and `<date_to>` for the start and the end of a time range. Write times in ISO 8601 format with a time zone, for example `2026-09-01T08:30:00.000Z`. In a query string, encode `+` as `%2B`.

### To read the current position {#to-read-the-current-position}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the managed object. The fragment `c8y_Position` contains the current position. If the fragment is missing, the device has no position yet.

### To set the current position {#to-set-the-current-position}

Send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request:

```http
PUT /inventory/managedObjects/<device_id>
Content-Type: application/json
Accept: application/json

{
  "c8y_Position": {
    "lat": 51.151977,
    "lng": 6.95173,
    "alt": 67
  }
}
```

Send the values as numbers. Leave out `alt` if you do not know the altitude. The update is partial: the platform changes only `c8y_Position` and keeps all other fragments of the device.

The platform returns HTTP 200 and the managed object with the new `c8y_Position`. To remove the position, send `"c8y_Position": null` in the same request.

### To record a location update {#to-record-a-location-update}

Send a [Create an event](https://{{< domain-c8y >}}/api/core/#operation/postEventCollectionResource) request:

```http
POST /event/events
Content-Type: application/json
Accept: application/json

{
  "source": { "id": "<device_id>" },
  "type": "c8y_LocationUpdate",
  "text": "Location updated",
  "time": "2026-09-01T08:30:00.000Z",
  "c8y_Position": {
    "lat": 51.151977,
    "lng": 6.95173,
    "alt": 67
  }
}
```

The properties `source`, `type`, `text`, and `time` are mandatory. `time` is the time of the position. The platform returns HTTP 201 and the event with its `id`. If it returns HTTP 422, one of the mandatory properties is missing or invalid.

The current position and the location updates are separate. If the event has the latest position of the device, also set the current position, see [To set the current position](#to-set-the-current-position).

### To query the movement of a device {#to-query-the-movement-of-a-device}

Send a [Retrieve all events](https://{{< domain-c8y >}}/api/core/#operation/getEventCollectionResource) request:

```http
GET /event/events?source=<device_id>&type=c8y_LocationUpdate&dateFrom=<date_from>&dateTo=<date_to>&pageSize=200
```

`dateFrom` is inclusive, and `dateTo` is exclusive. The platform returns HTTP 200 and the location updates in the `events` array, the newest first. Add `revert=true` to get the oldest first. The `c8y_Position` of each event is one point of the movement. To read the next page, follow the `next` link of the response.

If the `events` array is empty, the device recorded no location updates in this time range.

### To delete a location update {#to-delete-a-location-update}

Send a [Remove a specific event](https://{{< domain-c8y >}}/api/core/#operation/deleteEventResource) request with the `id` of the event as `<event_id>`:

```http
DELETE /event/events/<event_id>
```

The platform returns HTTP 204. If it returns HTTP 404, the event does not exist.
