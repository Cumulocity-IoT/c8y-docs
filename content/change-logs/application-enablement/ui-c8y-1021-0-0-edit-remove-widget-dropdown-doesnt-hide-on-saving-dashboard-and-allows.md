---
date: ""
title: Widget edit/remove dropdown automatically closes after saving a dashboard
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
ticket: MTM-59669
version: 1021.0.0
---
Previously, after making changes to a widget in a dashboard and saving the dashboard, the widget's edit/remove dropdown menu remained open. This could lead to unintended modifications if the user accidentally interacted with the open dropdown. With this change, the widget's edit/remove dropdown menu now automatically closes after saving the dashboard. 