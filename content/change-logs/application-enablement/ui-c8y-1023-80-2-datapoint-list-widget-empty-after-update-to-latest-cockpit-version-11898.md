---
date: '2026-05-12'
title: Data point list widget displays data correctly after application update
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-12'
---
To maintain backward compatibility, the "Data point list" widget is not bound to the dashboard time context after an application update. This ensures that the date range remains unchanged.
