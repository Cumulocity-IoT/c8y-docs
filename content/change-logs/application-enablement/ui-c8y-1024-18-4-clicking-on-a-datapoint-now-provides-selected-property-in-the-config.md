---
date: ""
title: Data point selection now provides target and timestamp properties in configuration
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
ticket: MTM-66816
version: 1024.18.4
---
Clicking a data point within the "Data graph" widget now automatically selects it and updates the widget configuration in real time. This restores support for dashboard interactions that rely on data point selection to trigger actions across other widgets.