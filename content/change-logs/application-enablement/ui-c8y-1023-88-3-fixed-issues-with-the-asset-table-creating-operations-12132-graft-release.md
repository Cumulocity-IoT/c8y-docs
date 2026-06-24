---
date: ""
title: Fixed issues with the asset table v2 creating operations
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
ticket: MTM-66905
version: 1023.88.3
---
When creating operations directly from the asset table v2, users encountered an issue where changes made to the operation command were not retained, causing the system to save the default command instead. This has been resolved.