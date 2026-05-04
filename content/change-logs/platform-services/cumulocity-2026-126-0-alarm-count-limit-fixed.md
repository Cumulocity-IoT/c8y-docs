---
date: '2026-04-23'
title: Fixed incorrect alarm count limit for users with global read permissions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-66609
version: 2026.126.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-23'
  - label: apj.cumulocity.com
    date: '2026-04-29'
  - label: jp.cumulocity.com
    date: '2026-04-29'
  - label: us.cumulocity.com
    date: '2026-05-04'
---
The `/alarm/alarmCount` endpoint now returns the correct alarm count for users with global read permissions. 
Previously, the count was limited to a maximum of 100 alarms.
