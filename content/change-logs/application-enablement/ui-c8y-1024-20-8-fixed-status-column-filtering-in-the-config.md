---
date: ""
title: Fixed status column filtering in the new asset table configuration
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
ticket: MTM-67635
version: 1024.20.8
---
When filtering in the new asset table by the status column, the filter did not work correctly and returned unexpected results or failed to apply the selected filter criteria. The status column filtering now works as expected.