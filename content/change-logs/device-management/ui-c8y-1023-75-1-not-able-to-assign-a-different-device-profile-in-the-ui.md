---
date: ""
title: Resolved device profile selection reset on the device profile tab
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
---
Previously, the device profile tab prevented users from switching device profiles if one was already assigned, as the selection dropdown would automatically reset to the current device profile before the assignment could be completed. This issue has been resolved. The UI now correctly maintains the selected value, ensuring that users can successfully reassign or update profiles for any device.