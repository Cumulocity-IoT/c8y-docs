---
date: ""
title: Data point graph now updates immediately when toggling data point or alarm/event visibility
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
Fixed data point graph widget not updating chart visibility when toggling data points or alarms/events until a global context change was triggered.