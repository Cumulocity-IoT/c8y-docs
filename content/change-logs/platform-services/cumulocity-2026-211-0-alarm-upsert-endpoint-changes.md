---
date: '2026-07-09'
title: Alarm upsert endpoint changes
product_area: Platform services
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-67007
version: 2026.211.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-07-09'
  - label: apj.cumulocity.com
    date: '2026-07-15'
  - label: jp.cumulocity.com
    date: '2026-07-15'
  - label: us.cumulocity.com
    date: '2026-07-20'
  - label: cumulocity.com
    date: '2026-07-21'
---

The `POST /alarm/alarms/upsert` endpoint has been updated with the following changes:

- **New response body**: The endpoint now returns an object with two fields instead of a plain alarm representation:
  `alarm` (the alarm as it exists after the upsert) and `previousState`
  (a snapshot of the alarm before the upsert, or `null` if a new alarm was created).
- **New query parameter**: A boolean `incrementCount` parameter (default: `false`) has been added.
  When set to `true`, the `count` property of an existing alarm is incremented during upsert.

For details refer to the [alarm upsert operation](https://{{< domain-c8y >}}/api/core/#operation/postAlarmUpsertResource)
in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#tag/Alarm-API).
