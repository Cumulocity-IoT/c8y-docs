---
date: ""
title:  Software and firmware versions are shown in full in selection dialogs
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
ticket: DM-6807
version: 1023.14.242
---
On a device's **Software** and **Firmware** tabs, the selection dialogs now show long versions in full and wrap them at the edge of the row. Before, versions broke at hyphens or spaces, for example `1.0.0-333.333`, or were cut off. Configuration names in device profiles had the same problem, and this change fixes them too.