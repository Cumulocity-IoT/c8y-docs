---
date: '2024-08-08'
title: Alarms remain visible when the severity changes via a smart rule
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-59695
version: 1020.14.3
---
In some cases, alarms were no longer displayed when their severity was changed via a smart rule. This has been fixed so that alarms now remain visible in the UI when their severity changes. This ensures that users can always see all active or cleared alarms, regardless of any alarm updates triggered by smart rules.
