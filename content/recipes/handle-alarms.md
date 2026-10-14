---
title: Handle repeated alarms with de-duplication
description: Raise an alarm, raise it again to see how the platform de-duplicates it, read its count and first occurrence, and clear it so that the next alarm starts a new record.
weight: 10
sector:
  - recipes
  - device_management
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
  - operation: getAlarmCollectionCountResource
    method: GET
    path: /alarm/alarms/count
    title: Retrieve the total number of alarms
  - operation: putAlarmResource
    method: PUT
    path: /alarm/alarms/{id}
    title: Update a specific alarm
---

Devices often report the same problem many times, for example a temperature sensor that exceeds its threshold every minute. {{< product-c8y-iot >}} does not create a new alarm for every report. It de-duplicates the alarms and counts the repetitions in a single alarm.

### How de-duplication works {#how-de-duplication-works}

When a new alarm arrives, the platform checks whether an alarm with the same `source` and the same `type` exists with the status ACTIVE or ACKNOWLEDGED:

* If such an alarm exists, the platform creates no new alarm. Instead, it increments the `count` of the existing alarm and updates its `time`. Other changes in the new alarm, such as a different `text` or `severity`, are ignored, and no audit log entry is created.
* If no such alarm exists, or the existing alarm has the status CLEARED, the platform creates a new alarm with `count` 1.

After the first repetition, the alarm has a `firstOccurrenceTime` property, which records when the problem occurred first. The `time` property shows the latest occurrence.

{{< c8y-admon-info >}}
If the source device is in maintenance mode, the platform suppresses the alarm. The request returns HTTP 201, but the response has no `id`, and its `self` link ends in `/alarm/alarms/null`. See [Connection monitoring](/device-management-application/monitoring-and-controlling-devices/#connection-monitoring).
{{< /c8y-admon-info >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To raise, update, and clear alarms: ROLE_ALARM_ADMIN, or ALARM_ADMIN permission on the source device
* To read and count alarms: ROLE_ALARM_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device that raises the alarm and `<alarm_id>` for the ID of the alarm. Send the header `Accept: application/json` with every POST and PUT request, otherwise the response has no body.

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

The `severity` is one of CRITICAL, MAJOR, MINOR, or WARNING. If you omit the `status`, the platform creates the alarm as ACTIVE.

The platform returns HTTP 201 and the new alarm with its `id` and `"count": 1`. Note the `id` as `<alarm_id>`.

### To raise the same alarm again {#to-raise-the-same-alarm-again}

Send the same request again, with a later `time`. Keep the `source` and the `type` the same.

The platform returns HTTP 201, but the response contains the existing alarm with the same `id`. No second alarm is created.

### To check the count and the first occurrence {#to-check-the-count-and-the-first-occurrence}

Send a [Retrieve a specific alarm](https://{{< domain-c8y >}}/api/core/#operation/getAlarmResource) request:

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

If `count` is still 1, the second alarm differs from the first one in its `source` or its `type`, or the first alarm was already cleared.

### To count the active alarms of a device {#to-count-the-active-alarms-of-a-device}

Send a [Retrieve the total number of alarms](https://{{< domain-c8y >}}/api/core/#operation/getAlarmCollectionCountResource) request:

```http
GET /alarm/alarms/count?source=<device_id>&status=ACTIVE
```

The response body is a plain number, for example `1`. A de-duplicated alarm counts once, independent of its `count` property. The request accepts the same filters as the list of alarms, for example `type` and `severity`.

### To clear an alarm so that the next one starts a new record {#to-clear-an-alarm}

Send an [Update a specific alarm](https://{{< domain-c8y >}}/api/core/#operation/putAlarmResource) request:

```http
PUT /alarm/alarms/<alarm_id>
Content-Type: application/json
Accept: application/json

{ "status": "CLEARED" }
```

The platform returns HTTP 200 and the alarm with `"status": "CLEARED"`. A cleared alarm is not de-duplicated. If the device raises the same alarm again, the platform creates a new alarm with a new `id` and `"count": 1`.

You can change only the `text`, `status`, `severity`, and custom fragments of an alarm. To change the severity of a repeated alarm, update the alarm with a PUT request, because a repeated POST request ignores the new severity.

{{< c8y-admon-tip >}}
Smart rules that send notifications for alarms, such as [On alarm send email](/cockpit/smart-rules-collection/#on-alarm-send-email), only send them for newly created alarms. When a de-duplicated alarm increments its count, no additional notification is sent.
{{< /c8y-admon-tip >}}
