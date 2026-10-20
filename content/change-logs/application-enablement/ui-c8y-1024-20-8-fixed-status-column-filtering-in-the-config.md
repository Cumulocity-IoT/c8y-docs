---
date: '2026-10-16'
title: Fixed status column filtering in the new asset table
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
ticket: MTM-67635
version: 1024.20.8
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-16'
  - label: apj.cumulocity.com
    date: '2026-10-19'
  - label: jp.cumulocity.com
    date: '2026-10-19'
---
When filtering by the status column in the new asset table, the filter did not work correctly and returned unexpected results or failed to apply the selected filter criteria. The status column filtering now works as expected.
