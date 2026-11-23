---
date: ""
title: Software and firmware versions are shown in full in selection dialogs
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
version: 1025.14.2
---
On the **Software** and **Firmware** tabs of a device, the selection dialogs now show long version names in full and wrap them at the end of the row. Before, versions broke at hyphens or spaces, for example, `1.0.0-333.333`, or were cut off. Configuration names in device profiles had the same issue, and this change fixes them too.