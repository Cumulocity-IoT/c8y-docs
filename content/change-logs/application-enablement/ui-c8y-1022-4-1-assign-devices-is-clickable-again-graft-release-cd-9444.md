---
date: ""
title: The assign-device screen is now rendered correctly
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
ticket: MTM-63960
version: 1022.4.1
---
The bottom drawer of the assign-device screen was opened twice, which led to a misalignment of the component and made it unusable. With this fix, the drawer only opens once, and the selection elements are correctly usable. 
