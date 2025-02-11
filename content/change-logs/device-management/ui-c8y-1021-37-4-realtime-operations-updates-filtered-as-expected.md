---
date: ""
title: Realtime operations updates are now filtered correctly
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
In Device Control lists operations with updated statuses remained displayed despite an active status filter. Now, operations that no longer match the selected filter are correctly removed from the list in real time.