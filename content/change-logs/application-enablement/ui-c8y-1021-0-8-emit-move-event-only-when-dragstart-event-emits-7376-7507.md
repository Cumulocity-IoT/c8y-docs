---
date: '2024-11-21'
title: Map widget's center coordinate inputs work consistently
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
In the configuration of the "Map widget" the center coordinates provided by the user via text input were not set correctly. This change ensures that the user can set the right coordinates also via text input and not only by dragging the map.
