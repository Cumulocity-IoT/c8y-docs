---
date: 2023-12-06T10:21:54.182Z
title: Improved loading of measurements series
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2785
version: 10.18.493.6
---
Previously, when loading measurement charts data, there was a performance issue if the measurement series had no units defined, depending on the total number of measurement records. This issue has been addressed and measurements series now load efficiently regardless of units being defined or not.
