---
date: ""
title: Data grid size automatically adjusts when devices are modified
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4147
version: 1021.29.0
---
When the device data grid is updated (for example, in case of creating or deleting a device), the size is now adjusted automatically. This ensures accurate pagination and reduces unnecessary network requests. Users do not need to take any extra steps.