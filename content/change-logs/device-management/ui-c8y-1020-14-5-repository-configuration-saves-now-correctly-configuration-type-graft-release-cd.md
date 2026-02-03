---
date: '2024-08-08'
title: Configuration repository now correctly saves the configuration type
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
ticket: DM-3791
version: 1020.14.5
---
In the configuration repository, the configuration type was not saved correctly when adding a new configuration snapshot, leading to unexpected behavior. With this change, the configuration type is now properly persisted when saving the configuration snapshot. 
