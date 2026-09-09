---
date: ""
title: Computed properties now display data point labels
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
ticket: MTM-66737
version: 1024.16.13
---
In the "Asset table" widget, multiple computed properties of the same type generated identical column labels, both in the widget configuration and in the application view. This issue has been resolved. Labels are now automatically populated using the associated data point name, allowing users to easily distinguish between multiple instances (such as last measurements or alarm/event counts).