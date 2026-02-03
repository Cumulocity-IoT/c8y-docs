---
date: '2024-07-18'
title: Widget title and actions aligned with overlay and hidden appearance settings
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
ticket: MTM-59816
version: 1020.2.13
---
The display of widget titles and action buttons has been optimized to align with the overlay and hidden widget appearance settings. Previously, these elements were always visible, which could be confusing when the edit widgets mode was disabled. With this update, the action button is now only displayed when either the overlay or hidden appearance is selected in the widget settings and the edit widgets mode is enabled. 
