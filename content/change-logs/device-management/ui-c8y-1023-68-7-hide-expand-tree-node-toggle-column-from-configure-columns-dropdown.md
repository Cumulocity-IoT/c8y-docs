---
date: ""
title: Remove "Detail toggle" and "Tree node toggle" from **Configure columns** dropdown
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
---
Previously, two technical settings - Detail toggle and Tree node toggle - were visible within the column configuration menu. These options were intended for internal system logic rather than end-user customization. These options have been removed from the display to prevent confusion and accidental layout changes.