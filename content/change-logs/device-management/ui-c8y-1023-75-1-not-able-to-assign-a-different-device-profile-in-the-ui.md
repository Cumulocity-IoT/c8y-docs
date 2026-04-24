---
date: '2026-04-24'
title: Device profiles can properly be reassigned
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
ticket: DM-5985
version: 1023.75.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-24'
---
Previously, the **Device profile** tab prevented users from switching device profiles if one profile was already assigned. The selection dropdown would automatically reset to the current device profile before the assignment could be completed. This issue has been resolved. The UI now correctly maintains the selected value, ensuring that users can successfully reassign or update profiles for any device.
