---
date: '2025-11-13'
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
Previously, columns that had been hidden and were enabled again sometimes did not appear in the grid.  This issue has now been fixed so that columns always reappear as expected when enabled. 
Additionally, when resizing a column and releasing the mouse button outside the grid, the grid was still in resize mode, causing further unintended resizing. This behavior has been corrected so that resizing ends properly when the mouse button is released, even outside the grid area. 
