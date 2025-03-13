---
date: ""
title: Alarm tab of a service no longer shows alarms from other sources
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
ticket: DM-4429
version: 1021.22.48
---
Previously, the **Alarms** tab of a service displayed alarms from other sources than the respective service. This issue has been fixed and now only alarms related to the service are displayed.