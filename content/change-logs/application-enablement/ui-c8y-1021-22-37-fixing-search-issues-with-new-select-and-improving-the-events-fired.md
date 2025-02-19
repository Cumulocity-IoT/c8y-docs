---
date: ""
title: Fixed search trigger on space key press
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
ticket: MTM-62404
version: 1021.22.37
---
In the past, there were some issues with the search functionality when using the new select component, leading to a suboptimal user experience. This change fixes those search issues, ensuring that the search is not triggered when pressing the space key in the select component, allowing spaces to be used in search terms normally.