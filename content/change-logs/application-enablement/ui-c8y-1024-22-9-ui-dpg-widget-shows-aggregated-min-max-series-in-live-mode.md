---
date: ""
title: Fixed aggregation in Data graph widgets linked to the global time context
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
ticket: MTM-67377
version: 1024.22.9
---
In live mode, "Data graph" widgets linked to the global time context could show aggregated minimum and maximum series instead of raw values until you unlinked and linked them again. This issue has been fixed. Linked widgets now show raw values in live mode and use the dashboard aggregation in history mode from the first load.
