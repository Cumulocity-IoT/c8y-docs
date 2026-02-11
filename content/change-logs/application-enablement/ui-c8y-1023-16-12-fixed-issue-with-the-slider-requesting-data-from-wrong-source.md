---
date: '2026-01-07'
title: Data point graph slider correctly retrieves device data
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
ticket: MTM-65603
version: 1023.16.12
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In some rare cases, the slider in the "Data point graph" widget incorrectly requested data from the wrong device target, leading to no data being displayed. This issue has been resolved, and the slider now correctly retrieves the data.
