---
date: ""
title: Default device info dashboard now respects group-level edit permissions
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
ticket: DM-6671
version: 1024.8.2
---
In the Device Management application, users with group-level edit permissions were unable to edit the default device info dashboard when opening a device. Edit permissions are now correctly applied based on group-level access.