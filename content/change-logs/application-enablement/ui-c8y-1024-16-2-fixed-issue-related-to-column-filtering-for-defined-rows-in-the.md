---
date: '2026-08-27'
title: Column filtering in the asset table now works properly
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
ticket: MTM-67593
version: 1024.16.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-27'
  - label: apj.cumulocity.com
    date: '2026-08-28'
  - label: jp.cumulocity.com
    date: '2026-08-28'
  - label: us.cumulocity.com
    date: '2026-08-31'
  - label: cumulocity.com
    date: '2026-08-31'
---
Column filters in the asset table were improperly rendering undefined/unfiltered rows. The filter logic has been changed to ensure that only defined values matching the filter criteria are displayed, while undefined rows are hidden.
