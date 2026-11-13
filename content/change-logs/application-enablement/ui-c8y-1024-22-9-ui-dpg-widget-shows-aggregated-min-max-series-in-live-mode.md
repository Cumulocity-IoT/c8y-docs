---
date: '2026-11-09'
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-09'
  - label: apj.cumulocity.com
    date: '2026-11-06'
  - label: jp.cumulocity.com
    date: '2026-11-06'
  - label: us.cumulocity.com
    date: '2026-11-09'
  - label: cumulocity.com
    date: '2026-11-09'
---
In live mode, "Data graph" widgets linked to the global time context could show aggregated minimum and maximum series instead of raw values until you unlinked and linked them again. This issue has been fixed. Linked widgets now show raw values in live mode and use the dashboard aggregation in history mode from the first load.
