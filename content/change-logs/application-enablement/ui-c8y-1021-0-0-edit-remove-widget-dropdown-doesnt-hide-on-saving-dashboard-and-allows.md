---
date: '2024-11-11'
title: Widget action dropdown closes properly after saving a dashboard
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when opening the edit/remove dropdown to make changes to a widget in a dashboard and then saving the dashboard, the widget's edit/remove dropdown remained open. This could lead to unintended modifications if the user accidentally interacted with the open dropdown. With this change, the widget's action dropdown now automatically closes after saving the dashboard. 
