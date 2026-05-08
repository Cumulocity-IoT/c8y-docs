---
date: ""
title: Data point list widget displays data correctly after cockpit update
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
ticket: MTM-66738
version: 1023.80.2
---
To maintain backward compatibility, the data points widget is not bound to the dashboard time context after an application update. This ensures that the date range remains unchanged.