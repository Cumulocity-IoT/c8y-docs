---
date: ""
title: Operation updates are now displayed in realtime in device control lists
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
ticket: DM-4323
version: 1021.37.4
---
In device control lists, operations with an updated status remained displayed even if they did no longer match the active status filter criteria. Now, operations that no longer match the selected criteria are correctly removed from the list in realtime.