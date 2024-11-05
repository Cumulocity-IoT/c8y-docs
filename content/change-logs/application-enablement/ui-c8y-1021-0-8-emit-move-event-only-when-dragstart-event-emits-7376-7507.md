---
date: ""
title: The map widget's center coordinate inputs in the configuration should not trigger move events when modified
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
ticket: MTM-58182
version: 1021.0.8
---
The map widget's center coordinate inputs in the configuration should not trigger move events when modified. This issue was leading to a situation where a move event was emitted, which resulted in updates to the center coordinate inputs.