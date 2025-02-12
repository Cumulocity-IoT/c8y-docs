---
date: ""
title: unrelated alarms not shown in alarmstab (#8113) [GRAFT][release/y2025] (#8261)
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
ticket: MTM-62196
version: 1021.22.34
---
In the **Simulator** page, the **Alarms** tab previously displayed alarms that were not directly related to the selected asset. This caused confusion for users who expected to only see relevant alarms for the specific asset they were viewing. With this change, the **Alarms** tab now correctly filters out unrelated alarms, ensuring that users only see alarms that are pertinent to the selected asset.