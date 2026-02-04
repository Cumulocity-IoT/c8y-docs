---
date: '2025-03-20'
title: Type parameter in Alarm API now accepts multiple values
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-61873
version: 2025.37.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when retrieving the [total number of alarms](https://cumulocity.com/api/core/#operation/getAlarmCollectionCountResource) 
the `type` parameter could only take a single value, despite the documentation stating otherwise. This issue has been fixed.
The `type` parameter now accepts multiple, comma-separated values.

`GET /alarm/alarms/count?type=c8y_UnavailabilityAlarm,c8y_TemperatureAlarm`
