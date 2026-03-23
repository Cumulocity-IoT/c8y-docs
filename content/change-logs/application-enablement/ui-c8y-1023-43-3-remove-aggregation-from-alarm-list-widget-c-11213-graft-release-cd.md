---
date: '2026-02-16'
title: Removed non-functional aggregation option from Alarm list widget configuration
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
ticket: MTM-66063
version: 1023.43.3
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-16'
  - label: apj.cumulocity.com
    date: '2026-02-17'
  - label: jp.cumulocity.com
    date: '2026-02-17'
  - label: emea.cumulocity.com
    date: '2026-02-18'
  - label: us.cumulocity.com
    date: '2026-02-18'
  - label: cumulocity.com
    date: '2026-02-18'
---
Previously, the "Alarm list" widget configuration displayed an aggregation picker in the History tab that had no effect, since aggregation is not applicable to alarm data. This option has been removed.
