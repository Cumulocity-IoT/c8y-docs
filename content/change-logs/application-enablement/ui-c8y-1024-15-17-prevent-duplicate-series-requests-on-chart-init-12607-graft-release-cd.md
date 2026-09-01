---
date: '2026-08-31'
title: Improved performance by removing duplicate data requests in the data explorer
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
ticket: MTM-67342
version: 1024.15.17
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-31'
  - label: apj.cumulocity.com
    date: '2026-09-01'
  - label: jp.cumulocity.com
    date: '2026-09-01'
  - label: us.cumulocity.com
    date: '2026-09-01'
  - label: cumulocity.com
    date: '2026-09-01'
---
The data explorer sent duplicate requests for the same data when opening the view, slowing chart loading. The redundant requests have now been removed, so charts load faster.
