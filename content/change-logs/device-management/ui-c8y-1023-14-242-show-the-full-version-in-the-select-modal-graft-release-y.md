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
The Device management application shows a select modal when you choose a version, for example, a software version for a device. Previously, long version names were cut off in this modal, so you could not see the complete version before you selected it. Now, the modal shows the full version name, so you can identify and select the correct version. This change affects only how versions appear in the select modal. Existing devices, versions, and settings remain unchanged, and you do not need to take any action.