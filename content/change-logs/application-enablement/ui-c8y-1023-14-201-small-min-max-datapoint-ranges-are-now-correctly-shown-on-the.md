---
date: 2026-09-01
title: Small min-max data point ranges now display correctly on chart Y-axis
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
ticket: MTM-67256
version: 1023.14.201
---
The rendering of the chart Y-axis when handling tight value ranges has been improved. Instead of repeating identical numbers on the axis, charts now automatically adjust tick intervals to show accurate intermediate decimal values. This makes tracking subtle data variations significantly easier and prevents distorted chart visuals.
