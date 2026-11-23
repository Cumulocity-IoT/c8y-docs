---
date: ""
title: Show the full version in the select modal [GRAFT][release/cd]
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
In the device management application, the select modal lists versions that can have long names. Previously, long version names were cut off in this modal, so you could not see the complete name or tell similar versions apart. Now, the select modal shows the full version name, so you can identify the exact version before you select it. This change only affects how versions appear in the select modal. Your existing tenants, users, applications, and devices are not affected, and you do not need to take any action.