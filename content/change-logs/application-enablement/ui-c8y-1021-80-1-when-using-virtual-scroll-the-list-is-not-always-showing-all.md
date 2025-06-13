---
date: ""
title: Virtual scroll does not always show all items in a list
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
ticket: MTM-63835
version: 1021.80.1
---
In places where virtual scroll was implemented, such as `Data points table`, on rare occasions not the entire list would load. This issue has now been resolved.