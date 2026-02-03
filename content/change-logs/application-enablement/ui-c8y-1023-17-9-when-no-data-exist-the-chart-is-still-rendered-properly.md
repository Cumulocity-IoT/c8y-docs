---
date: '2026-01-14'
title: 'When no data exist, the chart is still rendered properly'
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
ticket: MTM-65429
version: 1023.17.9
---

Previously, when selecting a time range in the data point graph with no measurement data, the "Data point graph" widget rendered an empty area, without any indication that no data is available. This behavior has been changed. The "Data point graph" widget now provides a consistent display, showing the x-axis and y-axis even when no data is available.
