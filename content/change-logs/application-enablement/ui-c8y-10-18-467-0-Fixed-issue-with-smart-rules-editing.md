---
date: 2023-12-06T10:44:26.354Z
title: Fixed issue with smart rules editing
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-49364
version: 10.18.467.0
---
Editing smart rules did not work properly in case of missing (removed) devices. Now missing devices are removed automatically, and smart rules can be edited properly.
