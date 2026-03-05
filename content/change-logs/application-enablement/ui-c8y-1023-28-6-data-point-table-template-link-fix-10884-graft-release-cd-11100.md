---
date: '2026-02-09'
title: Fixed issue with data point template
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
ticket: MTM-65426
version: 1023.28.6
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-09'
  - label: apj.cumulocity.com
    date: '2026-02-10'
  - label: jp.cumulocity.com
    date: '2026-02-10'
  - label: emea.cumulocity.com
    date: '2026-02-11'
  - label: us.cumulocity.com
    date: '2026-02-11'
  - label: cumulocity.com
    date: '2026-02-11'
---
An issue was identified where data point templates could overwrite the device ID, leading to unexpected behavior in some widgets. The linkage between templates and data points has been improved, resolving this issue and ensuring a more reliable widget behavior.
