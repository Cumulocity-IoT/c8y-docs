---
date: ""
title: Fixed column filtering issue in the asset table
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
ticket: MTM-67593
version: 1024.16.2
---
Column filters in the asset table were improperly rendering undefined/unfiltered rows. Fixed filter logic to ensure only defined values matching the filter criteria are displayed while non-defined rows are hidden.