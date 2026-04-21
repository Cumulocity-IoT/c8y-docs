---
date: '2026-04-17'
title: Removed internal options from column configuration dropdown
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
ticket: DM-5934
version: 1023.68.7
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-17'
  - label: apj.cumulocity.com
    date: '2026-04-20'
  - label: jp.cumulocity.com
    date: '2026-04-20'
---
In the device parameter list, two technical settings - "Detail toggle" and "Tree node toggle" - were visible within the column configuration dropdown, which were intended for internal system logic rather than end-user customization. These options have been removed from the display to prevent confusion and accidental layout changes.
