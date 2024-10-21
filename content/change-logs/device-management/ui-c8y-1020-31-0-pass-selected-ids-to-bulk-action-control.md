---
date: ""
title: Selected item IDs are now passed to the bulk action control
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3974
version: 1020.31.0
---
In the past, the bulk action control did not receive the IDs of the selected items, which made it impossible to display a bulk action conditionally based on the subset of selected items. With this change, the selected item IDs are now passed to the bulk action control `showIf` function.