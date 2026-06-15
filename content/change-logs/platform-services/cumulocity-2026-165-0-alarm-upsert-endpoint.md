---
date: '2026-06-05'
title: Alarm upsert endpoint
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-66518
version: 2026.165.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-06-05'
  - label: apj.cumulocity.com
    date: '2026-06-10'
  - label: jp.cumulocity.com
    date: '2026-06-10'
  - label: us.cumulocity.com
    date: '2026-06-15'
---

{{< product-c8y-iot >}} now provides a dedicated alarm upsert endpoint (`POST /alarm/alarms/upsert`).
The operation creates a new alarm if no uncleared alarm with the same source and type exists,
or updates the existing one otherwise. The response status reflects the outcome `201 Created`
for a newly created alarm, or `200 OK` when an existing alarm was updated.

For details refer to the [alarm upsert operation](https://{{< domain-c8y >}}/api/core/#operation/postAlarmUpsertResource)
in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#tag/Alarm-API).
