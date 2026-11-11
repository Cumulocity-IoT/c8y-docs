---
date: '2026-11-09'
title: Y-axis label no longer overlaps tick labels
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
ticket: MTM-67231
version: 1024.23.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-09'
  - label: apj.cumulocity.com
    date: '2026-11-10'
  - label: jp.cumulocity.com
    date: '2026-11-10'
---
Previously, the Y-axis label in charts could overlap the tick labels, which made both hard to read. The Y-axis label now moves dynamically away from the tick labels, so the two stay separate and readable.
