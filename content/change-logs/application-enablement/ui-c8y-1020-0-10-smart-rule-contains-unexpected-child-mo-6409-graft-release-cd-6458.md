---
date: '2024-06-13'
title: >-
  Smart rules list now always shows the children column properly if child assets
  are assigned to a managed object
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
ticket: MTM-57897
version: 1020.0.10
---
In the smart rules list of a group or a device, the children column, which shows for which child assets the smart rule is active, did not always show up properly. This issue has been fixed and the children column is now always displayed if the smart rule is activated for a child asset.
