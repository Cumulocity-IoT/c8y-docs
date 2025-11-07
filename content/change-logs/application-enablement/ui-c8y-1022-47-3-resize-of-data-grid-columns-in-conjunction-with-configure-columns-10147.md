---
date: ""
title: Improvements to data grid column handling
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
ticket: DM-4989
version: 1022.47.3
---
Two issues affecting the Data Grid columns have been resolved. Previously, columns that were hidden and then re-enabled after rearranging or resizing would sometimes not appear again in the grid, especially after navigating away and returning. This has now been fixed so that columns always reappear as expected when enabled. Additionally, there was a problem where resizing a column and releasing the mouse button outside the grid would leave the grid in resize mode, causing further unintended resizing when moving the mouse back over the grid. This behavior has been corrected so that resizing ends properly when the mouse button is released, even outside the grid area. These improvements make it easier and more reliable to customize your grid view.