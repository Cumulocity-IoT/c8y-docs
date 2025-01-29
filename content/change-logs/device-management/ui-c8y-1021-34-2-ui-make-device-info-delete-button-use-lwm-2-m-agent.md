---
date: ""
title: Fix device delete button in LWM2M device information page
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
ticket: DM-3538
version: 1021.22.25
---
Previously, the delete button in the device info page was not working properly for LwM2M devices. With this change, the delete button now uses the LwM2M agent to perform the device deletion. This ensures that LwM2M devices can be properly deleted, providing a consistent user experience for device management across different device types.