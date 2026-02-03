---
date: 2023-12-06
title: Grid filter text not cleared on filter reset
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3154
version: 10.18.0.227
---
When using the simple `FilteringFormRendererComponent` in data grid columns to display filter inputs, the input values were not cleared when the filter was reset. This issue has been fixed - now when the filter is reset, the input values are properly cleared.
