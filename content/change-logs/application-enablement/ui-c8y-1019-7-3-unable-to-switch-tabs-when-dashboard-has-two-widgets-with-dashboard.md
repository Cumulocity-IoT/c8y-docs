---
date: 2024-03-14T14:35:11.175Z
title: Switching tabs with multiple widgets using the dashboard date context works smoothly
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
ticket: MTM-58128
version: 1019.7.3
---
Fixed an issue where users were unable to switch between dashboard tabs if the dashboard contained two or more widgets using the dashboard date context filter. Users can now smoothly transition between tabs regardless of the number of dashboard date context widgets present.
