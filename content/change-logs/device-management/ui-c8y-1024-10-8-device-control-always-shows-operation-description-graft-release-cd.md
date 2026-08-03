---
date: ""
title: Device Control tab now shows operation description as title
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
ticket: DM-5726
version: 1024.10.8
---
Fixed an issue where the Device Control tab displayed the raw command text instead of the operation description as the operation title. Shell operations now always set the command text as the operation description.