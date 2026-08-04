---
date: ""
title: Dashboard widgets now enforce their minimum size through the grid engine
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
ticket: MTM-67422
version: 1024.10.5
---
Dashboard widgets previously took their minimum width from a styling rule that disagreed with the dashboard grid, so widgets could end up at inconsistent widths when resized. The minimum size is now controlled by the grid itself, so widgets resize predictably and keep a consistent minimum across dashboard layouts.