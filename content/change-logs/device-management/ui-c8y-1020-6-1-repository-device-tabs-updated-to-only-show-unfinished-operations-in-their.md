---
date: '2024-07-25'
title: Repository device tabs only show active operations
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
ticket: DM-3758
version: 1020.6.1
---
Previously, the repository device tabs in the device details showed already completed operations which could differ from the currently installed items. With this change, the repository device tabs have been updated to only display active operations in their views.
