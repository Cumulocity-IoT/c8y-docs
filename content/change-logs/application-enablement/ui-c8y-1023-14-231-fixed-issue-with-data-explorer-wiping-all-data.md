---
date: 2026-11-10
title: Data explorer no longer clears all data when encountering missing permission for a data point
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
ticket: MTM-67455
version: 1023.14.231
---
The data explorer previously cleared all displayed data when it encountered a data point that the user did not have permission to access. This issue has been fixed so that the data explorer now handles permission restrictions gracefully and retains all accessible data in the view.