---
date: ""
title: Data graph now updates immediately when toggling data point or alarm/event visibility
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
ticket: MTM-65557
version: 1023.50.2
---
Previously, the "Data graph" widget did not update the chart when toggling data points or alarms/events visibility until a global context change was triggered. This issue has been fixed now, and data points or alarms/events are immediately visible in the chart when toggled.
