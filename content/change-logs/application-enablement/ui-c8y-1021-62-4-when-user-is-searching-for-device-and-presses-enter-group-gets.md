---
date: '2025-04-24'
title: Prevented unintended device group creation while searching for devices
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
ticket: MTM-63161
version: 1021.62.4
---
Pressing Enter while searching for devices to add to a new group, created this group instantly instead of performing the search. This issue has been fixed. Enter now correctly executes the search when typing device names.
