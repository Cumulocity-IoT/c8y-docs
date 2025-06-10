---
date: ""
title: Truncated data alert is now correctly shown for the data point graph when global time context is enabled```
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
ticket: MTM-63746
version: 1021.78.6
---
In some cases, users may have data outside the selected time range which gets truncated. Previously, the truncated data alert was not shown for the data point graph when global time context was enabled. This has now been improved and the alert is properly shown.