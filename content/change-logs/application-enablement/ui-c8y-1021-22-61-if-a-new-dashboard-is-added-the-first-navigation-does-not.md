---
date: ""
title: Fixed an issue with navigation not working when adding a new dashboard
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
ticket: MTM-62921
version: 1021.22.61
---
After creating new dashboard, user was navigated to new dashboard but first navigation away from dashboard view was cancelled. It was fixed and navigation works.