---
date: '2024-06-06'
title: Navigator node property correctly changed after dashboard restore
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
ticket: MTM-58690
version: 1020.0.0
---
In the past, restoring a dashboard did not properly update the node property of the navigator, leading to inconsistencies. This has now been fixed. The navigator node property is correctly changed after a dashboard restore, ensuring the restored dashboard matches the expected state.
