---
date: 2026-03-31
title: Prevented additional requests of the Data point graph widget in real-time mode
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
ticket: MTM-65548
version: 1023.14.43
---
When the "Data point graph" widget operated in real-time mode, it made unnecessary requests to fetch data, which could impact performance and increase server load. This issue has been fixed.