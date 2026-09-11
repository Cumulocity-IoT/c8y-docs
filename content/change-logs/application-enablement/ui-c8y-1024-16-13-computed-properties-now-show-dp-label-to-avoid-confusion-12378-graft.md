---
date: '2026-09-07'
title: Computed properties now display data point labels
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
ticket: MTM-66737
version: 1024.16.13
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-09-07'
  - label: apj.cumulocity.com
    date: '2026-09-08'
  - label: jp.cumulocity.com
    date: '2026-09-08'
  - label: us.cumulocity.com
    date: '2026-09-09'
  - label: cumulocity.com
    date: '2026-09-09'
---
In the "Asset table" widget, multiple computed properties of the same type generated identical column labels, both in the widget configuration and in the application view. This issue has been resolved. Labels are now automatically populated using the associated data point name, allowing users to easily distinguish between multiple instances (such as last measurements or alarm/event counts).
