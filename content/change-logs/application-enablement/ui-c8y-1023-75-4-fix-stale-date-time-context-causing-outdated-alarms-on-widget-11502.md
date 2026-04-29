---
date: ""
title: Alarm list widgets now display alarms for the correct data range
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
ticket: MTM-66181
version: 1023.75.4
---
In live mode, "Alarm list" widgets displayed alarms from the previously saved date range rather than the current time. This issue has been fixed. They now correctly refresh on load using the range defined by the widget or the global time context.