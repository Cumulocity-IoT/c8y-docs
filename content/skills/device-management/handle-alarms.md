---
title: Raise, find, and clear alarms
description: Raise an alarm for a device, list, filter, and count alarms, acknowledge and clear them, and see how the platform de-duplicates repeated alarms.
weight: 100
requires:
  - authentication
api:
  - operation: postAlarmCollectionResource
    method: POST
    path: /alarm/alarms
    title: Create an alarm
  - operation: getAlarmResource
    method: GET
    path: /alarm/alarms/{id}
    title: Retrieve a specific alarm
  - operation: getAlarmCollectionResource
    method: GET
    path: /alarm/alarms
    title: Retrieve all alarms
  - operation: getAlarmCollectionCountResource
    method: GET
    path: /alarm/alarms/count
    title: Retrieve the total number of alarms
  - operation: putAlarmResource
    method: PUT
    path: /alarm/alarms/{id}
    title: Update a specific alarm
  - operation: deleteAlarmCollectionResource
    method: DELETE
    path: /alarm/alarms
    title: Remove alarm collections
---

An alarm signals a problem that requires manual action, for example, a temperature that exceeds a threshold. Devices raise alarms for their own managed object, and other sources, such as smart rules, raise alarms as well. When the problem is solved, the device or a user clears the alarm.

Every alarm has one of the following statuses:

* **ACTIVE**: The alarm was raised, and nobody works on it yet.
* **ACKNOWLEDGED**: Somebody set this status to show that they work on the alarm.
* **CLEARED**: Somebody cleared the alarm manually, or the device detected that the problem is gone.

The severity of an alarm is one of CRITICAL, MAJOR, MINOR, or WARNING. For the meaning of the severities in the UI, see [Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To raise, acknowledge, and clear alarms: ROLE_ALARM_ADMIN, or ALARM_ADMIN permission on the source device
* To delete alarms: ROLE_ALARM_ADMIN
* To read and count alarms: ROLE_ALARM_READ

Without ROLE_ALARM_READ, the platform returns only the alarms that your inventory roles give you access to, and it counts at most 100 alarms.
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the managed object ID of the device that raises the alarm and `<alarm_id>` for the ID of the alarm.

### To raise an alarm {#to-raise-an-alarm}

Send a [Create an alarm](https://{{< domain-c8y >}}/api/core/#operation/postAlarmCollectionResource) request:

```http
POST /alarm/alarms
Content-Type: application/json
Accept: application/json

{
  "source": { "id": "<device_id>" },
  "type": "c8y_TemperatureAlarm",
  "text": "Temperature is above 80 °C",
  "severity": "MAJOR",
  "status": "ACTIVE",
  "time": "2026-10-14T09:00:00.000Z"
}
```

The properties `source`, `type`, `text`, `severity`, and `time` are required. If you omit the `status`, the platform creates the alarm as ACTIVE.

The platform returns HTTP 201 and the new alarm with its `id` and `"count": 1`. Note the `id` as `<alarm_id>`.

If the platform returns HTTP 422, the request body is invalid, for example, because the `severity` or the `status` has a value that is not in the lists above.

{{< c8y-admon-info >}}
If the source device is in maintenance mode, the platform suppresses the alarm. The request returns HTTP 201, but the response has no `id`, and its `self` link ends in `/alarm/alarms/null`. See [Connection monitoring](/device-management-application/monitoring-and-controlling-devices/#connection-monitoring).
{{< /c8y-admon-info >}}

### How de-duplication works {#how-de-duplication-works}

Devices often report the same problem many times, for example, a temperature sensor that exceeds its threshold every minute. {{< product-c8y-iot >}} does not create a new alarm for every report. It de-duplicates the alarms and counts the repetitions in a single alarm.

When a new alarm arrives, the platform checks whether an alarm with the same `source` and the same `type` exists with the status ACTIVE or ACKNOWLEDGED:

* If such an alarm exists, the platform creates no new alarm. Instead, it increments the `count` of the existing alarm and updates its `time`. Other changes in the new alarm, such as a different `text` or `severity`, are ignored, and no audit log entry is created.
* If no such alarm exists, or the existing alarm has the status CLEARED, the platform creates a new alarm with `count` 1.

After the first repetition, the alarm has a `firstOccurrenceTime` property, which records when the problem occurred first. The `time` property shows the latest occurrence.

### To check the count and the first occurrence {#to-check-the-count-and-the-first-occurrence}

1. Raise the same alarm again: send the request of [To raise an alarm](#to-raise-an-alarm) with a later `time`, and keep the `source` and the `type` the same.

    The platform returns HTTP 201, but the response contains the existing alarm with the same `id`. No second alarm is created.

2. Send a [Retrieve a specific alarm](https://{{< domain-c8y >}}/api/core/#operation/getAlarmResource) request:

    ```http
    GET /alarm/alarms/<alarm_id>
    ```

The response shows how often the alarm occurred and when it occurred first:

```json
{
  "id": "<alarm_id>",
  "type": "c8y_TemperatureAlarm",
  "status": "ACTIVE",
  "count": 2,
  "firstOccurrenceTime": "2026-10-14T09:00:00.000Z",
  "time": "2026-10-14T09:01:00.000Z"
}
```

If `count` is still 1, the second alarm differs from the first one in its `source` or its `type`, or the first alarm was already cleared. If the platform returns HTTP 404, the alarm does not exist.

### To list and filter alarms {#to-list-and-filter-alarms}

Send a [Retrieve all alarms](https://{{< domain-c8y >}}/api/core/#operation/getAlarmCollectionResource) request with the filters you need:

```http
GET /alarm/alarms?source=<device_id>&status=ACTIVE&severity=MAJOR&pageSize=100
```

The platform returns HTTP 200 and the matching alarms in the `alarms` array, the newest alarms first. You can combine the following filters:

* `source`: The managed object ID that the alarm belongs to.
* `status`: ACTIVE, ACKNOWLEDGED, or CLEARED.
* `severity`: CRITICAL, MAJOR, MINOR, or WARNING.
* `type`: The alarm type, for example `c8y_TemperatureAlarm`.
* `dateFrom` and `dateTo`: The time interval of the alarm occurrence, as ISO 8601 date and time, for example `dateFrom=2026-10-14T00:00:00.000Z&dateTo=2026-10-15T00:00:00.000Z`. `dateFrom` is inclusive, `dateTo` is exclusive.
* `resolved`: `true` returns only CLEARED alarms, `false` returns only ACTIVE and ACKNOWLEDGED alarms. This filter takes precedence over `status`.

To filter by several values of `status`, `severity`, or `type`, separate the values with commas, for example `status=ACTIVE,ACKNOWLEDGED`.

### To count the active alarms of a device {#to-count-the-active-alarms-of-a-device}

Send a [Retrieve the total number of alarms](https://{{< domain-c8y >}}/api/core/#operation/getAlarmCollectionCountResource) request:

```http
GET /alarm/alarms/count?source=<device_id>&status=ACTIVE
```

The platform returns HTTP 200, and the response body is a plain number, for example `1`. A de-duplicated alarm counts once, independent of its `count` property. The request accepts the same filters as the list of alarms.

### To acknowledge an alarm {#to-acknowledge-an-alarm}

Send an [Update a specific alarm](https://{{< domain-c8y >}}/api/core/#operation/putAlarmResource) request:

```http
PUT /alarm/alarms/<alarm_id>
Content-Type: application/json
Accept: application/json

{ "status": "ACKNOWLEDGED" }
```

The platform returns HTTP 200 and the alarm with `"status": "ACKNOWLEDGED"`. An acknowledged alarm is still de-duplicated.

You can change only the `text`, `status`, `severity`, and custom fragments of an alarm. If the request body contains another property, such as `type` or `time`, the platform rejects the request with HTTP 422. If the platform returns HTTP 404, the alarm does not exist.

If you have access to the alarm through an inventory role instead of ROLE_ALARM_ADMIN, the inventory role must have the type `*`. Otherwise, you cannot change the `status`, and the platform returns a "Security/Forbidden" error. See [Alarm permissions and inventory roles](/device-management-application/monitoring-and-controlling-devices/#alarm-permissions-and-inventory-roles).

To change the severity of a repeated alarm, update the alarm with a PUT request, because a repeated POST request ignores the new severity.

### To clear an alarm {#to-clear-an-alarm}

Send an [Update a specific alarm](https://{{< domain-c8y >}}/api/core/#operation/putAlarmResource) request:

```http
PUT /alarm/alarms/<alarm_id>
Content-Type: application/json
Accept: application/json

{ "status": "CLEARED" }
```

The platform returns HTTP 200 and the alarm with `"status": "CLEARED"`. A cleared alarm is not de-duplicated. If the device raises the same alarm again, the platform creates a new alarm with a new `id` and `"count": 1`.

{{< c8y-admon-tip >}}
Smart rules that send notifications for alarms, such as [On alarm send email](/cockpit/smart-rules-collection/#on-alarm-send-email), only send them for newly created alarms. When a de-duplicated alarm increments its count, no additional notification is sent.
{{< /c8y-admon-tip >}}

### To delete the alarms of a device {#to-delete-the-alarms-of-a-device}

Usually, you clear alarms and keep them as history. The platform deletes the alarms of a device together with the device.

{{< c8y-admon-caution >}}
Deleted alarms cannot be restored.
{{< /c8y-admon-caution >}}

Send a [Remove alarm collections](https://{{< domain-c8y >}}/api/core/#operation/deleteAlarmCollectionResource) request:

```http
DELETE /alarm/alarms?source=<device_id>
```

The request requires at least one of the filters `source`, `dateFrom`, `dateTo`, `createdFrom`, or `createdTo`. It also accepts the other filters of the list of alarms.

The platform returns HTTP 204. The deletion runs in the background, so the platform can return the response before all alarms are deleted.
