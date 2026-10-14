---
title: Create and manage device events
description: Create an event for a device, query and update events, attach a file to an event, and delete the event.
weight: 102
sector:
  - recipes
  - device_management
requires:
  - authentication
api:
  - operation: postEventCollectionResource
    method: POST
    path: /event/events
    title: Create an event
  - operation: getEventCollectionResource
    method: GET
    path: /event/events
    title: Retrieve all events
  - operation: putEventResource
    method: PUT
    path: /event/events/{id}
    title: Update a specific event
  - operation: postEventBinaryResource
    method: POST
    path: /event/events/{id}/binaries
    title: Attach a file to a specific event
  - operation: putEventBinaryResource
    method: PUT
    path: /event/events/{id}/binaries
    title: Replace the attached file of a specific event
  - operation: getEventBinaryResource
    method: GET
    path: /event/events/{id}/binaries
    title: Retrieve the attached file of a specific event
  - operation: getEventResource
    method: GET
    path: /event/events/{id}
    title: Retrieve a specific event
  - operation: deleteEventResource
    method: DELETE
    path: /event/events/{id}
    title: Remove a specific event
---

Events pass real-time information from devices to {{< product-c8y-iot >}}, for example, that a door was opened or that a device changed its location. An event has a type, a time when it occurred, a text that describes it, and the source managed object that it belongs to. It can contain custom fragments with more details, and one attached file, such as a log file. See [Events](/concepts/domain-model/#events) for the concept.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create, update, and delete events and attach files: ROLE_EVENT_ADMIN
* To query events and read attached files: ROLE_EVENT_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the managed object ID of the device and `<event_id>` for the ID of the event.

### To create an event {#to-create-an-event}

Send a [Create an event](https://{{< domain-c8y >}}/api/core/#operation/postEventCollectionResource) request:

```http
POST /event/events
Content-Type: application/json
Accept: application/json

{
  "source": { "id": "<device_id>" },
  "type": "c8y_DoorOpenedEvent",
  "text": "Front door opened",
  "time": "2026-10-14T09:00:00.000Z"
}
```

The properties `source`, `type`, `text`, and `time` are required. Add custom fragments with more details as needed.

The platform returns HTTP 201 and the new event with its `id`. Note the `id` as `<event_id>`.

If the platform returns HTTP 422, the request body is invalid, for example, because one of the required properties is missing.

### To query the events of a device {#to-query-the-events-of-a-device}

Send a [Retrieve all events](https://{{< domain-c8y >}}/api/core/#operation/getEventCollectionResource) request with the filters you need:

```http
GET /event/events?source=<device_id>&type=c8y_DoorOpenedEvent&pageSize=100
```

The platform returns HTTP 200 and the matching events in the `events` array. You can combine the following filters:

* `source`: The managed object ID that the event belongs to.
* `type`: The event type. The filter accepts one type per request.
* `dateFrom` and `dateTo`: The time interval of the event occurrence, as ISO 8601 date and time, for example `dateFrom=2026-10-14T00:00:00.000Z&dateTo=2026-10-15T00:00:00.000Z`. `dateFrom` is inclusive, `dateTo` is exclusive.
* `fragmentType`: Only events that contain this fragment, for example `c8y_IsBinary` for events with an attached file.
* `fragmentValue`: Only events in which the fragment has this value. This filter works only together with `fragmentType` and only for fragments with a string value.
* `revert`: With `dateFrom` or `dateTo`, the platform returns the newest events first. Set `revert=true` to get the oldest events first.

### To update an event {#to-update-an-event}

You can change only the `text` and the custom fragments of an event. The `source`, `type`, and `time` cannot be changed after the event is created.

Send an [Update a specific event](https://{{< domain-c8y >}}/api/core/#operation/putEventResource) request:

```http
PUT /event/events/<event_id>
Content-Type: application/json
Accept: application/json

{ "text": "Front door opened (verified)" }
```

The platform returns HTTP 200 and the event with the new `text`. If the platform returns HTTP 422, the request body contains a property that cannot be changed. If it returns HTTP 404, the event does not exist.

### To attach a file to an event {#to-attach-a-file-to-an-event}

An event can have one attached file. The default size limit is 50 MiB.

Send an [Attach a file to a specific event](https://{{< domain-c8y >}}/api/core/#operation/postEventBinaryResource) request with the content of the file as the request body:

```http
POST /event/events/<event_id>/binaries
Content-Type: text/plain
Accept: application/json

sensor log line 1
sensor log line 2
```

The `Content-Type` must correspond to the type of the file. For other files, send the request as `multipart/form-data` with two parts: the part `object` contains a JSON object with the `name` and the `type` of the file, and the part `file` contains the file.

The platform returns HTTP 201 and a JSON object with the `source` (the ID of the event), the `type`, and the `name` of the file. If you send the file as the request body, the `name` is the ID of the event. If you send it as `multipart/form-data`, the `name` is the file name.

If the platform returns HTTP 409, the event already has an attached file. To replace the file, send a [Replace the attached file of a specific event](https://{{< domain-c8y >}}/api/core/#operation/putEventBinaryResource) request with the same headers and the new content:

```http
PUT /event/events/<event_id>/binaries
Content-Type: text/plain
Accept: application/json

sensor log line 3
```

The platform returns HTTP 201.

### To read the attached file {#to-read-the-attached-file}

Send a [Retrieve the attached file of a specific event](https://{{< domain-c8y >}}/api/core/#operation/getEventBinaryResource) request:

```http
GET /event/events/<event_id>/binaries
```

The platform returns HTTP 200 and the content of the file. If it returns HTTP 404, the event has no attached file.

To see the details of the file, send a [Retrieve a specific event](https://{{< domain-c8y >}}/api/core/#operation/getEventResource) request:

```http
GET /event/events/<event_id>
```

The event contains the fragment `c8y_IsBinary` with the `name`, the `length`, and the `type` of the file. After a `multipart/form-data` upload, `length` is the size of the multipart request body, not the size of the file.

### To delete an event {#to-delete-an-event}

Send a [Remove a specific event](https://{{< domain-c8y >}}/api/core/#operation/deleteEventResource) request:

```http
DELETE /event/events/<event_id>
```

The platform returns HTTP 204. It deletes the attached file together with the event. The deletion runs in the background, so the platform can return the response before all data of the event is deleted. If the platform returns HTTP 404, the event does not exist anymore.

In the Device Management application, you see the events of a device in its **Events** tab, see [To view events](/device-management-application/monitoring-and-controlling-devices/#to-view-events).
