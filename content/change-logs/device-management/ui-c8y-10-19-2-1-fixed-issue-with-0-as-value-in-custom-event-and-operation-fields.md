---
date: 2024-03-14
title: Fixed issue with 0 as value in custom event and operation fields
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3098
version: 10.19.2.1
---
In Chrome, custom event and operation fields having 0 or '0' as a value were incorrectly parsed and displayed as date. This is now fixed.
