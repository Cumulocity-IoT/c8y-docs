---
date: ""
title: Improved split view layout sizing
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
ticket: MTM-67098
version: 1025.0.3
---
The split view now switches between two columns and a stacked layout based on its container width, not the browser window. For example, opening the AI assistant next to the alarms list in the Cockpit application now stacks the list and details instead of squeezing them into two columns.