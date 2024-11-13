---
date: ""
title: The map widget's center coordinate inputs in the configuration should work consistently
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
The map widget's center coordinate inputs in the configuration had issues setting the right coordinates by user input. The fix ensures that the user can set the right coordinates also via text input and not only by dragging the map.
