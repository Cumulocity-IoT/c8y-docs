---
date: ""
title: Terminate the firmware update process if an unexpected situation is detected
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
ticket: DM-4050
version: 1021.4.2
---
Previously, if a device reported an unexpected status or result during a firmware update,
the process simply waited for a valid state. Now, you can configure LWM2M devices to fail the firmware update
process when an unexpected situation is detected.
the process would simply wait for a valid state. Now, you can configure LWM2M devices to fail the firmware update
process when an unexpected situation is detected.