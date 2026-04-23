---
date: '2026-04-21'
title: Fixed issue in the alarm counting API
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
---
The `/alarm/alarmCount` endpoint now returns the correct alarm count for users with global read permissions. 
Previously, the count was limited to a maximum of 100 alarms.