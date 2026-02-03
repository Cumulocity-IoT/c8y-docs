---
date: 2024-04-25
title: Dashboard availability selection is hidden for users who do not have the required permission
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-57128
version: 1019.20.8
---
Previously, the dashboard availability selection was always visible for users, even if they did not have the permission to see it. With this change, the dashboard availability selection is hidden for users who do not have the required permission. Users must have User Management READ permission to see and modify the availability property of a dashboard.
