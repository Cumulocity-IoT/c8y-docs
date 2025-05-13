---
date: '2025-05-08'
title: Issue resolved where users might access and/or change another user's settings
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
ticket: MTM-55712
version: 1021.66.0
---
Previously, users could access or change another user's settings. This issue has been fixed. Now only the user that is currently logged in can read/write its user preferences.
