---
date: '2026-07-15'
title: >-
  Bulk operations status filter now resets correctly when selecting "All
  statuses"
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-5762
version: 1024.1.5
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-07-15'
  - label: apj.cumulocity.com
    date: '2026-08-05'
  - label: jp.cumulocity.com
    date: '2026-08-05'
  - label: us.cumulocity.com
    date: '2026-08-06'
  - label: cumulocity.com
    date: '2026-08-06'
---
In the bulk operations overview, selecting "All statuses" from the status filter repeated the previous filter request instead of clearing it. The filter now correctly resets and displays bulk operations across all statuses.
