---
date: '2026-10-22'
title: Slider data now accurately represents missing data
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
ticket: MTM-67234
version: 1024.21.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-22'
---
 The preview of the data points graph slider now accurately reflects where measurement data is missing. Previously, a time range with only partial data or a gap in the middle of the range could stretch the aggregated preview across the whole slider, making it look like data existed everywhere. The slider shadow is now aligned to the chart's time axis and uses the aggregation interval to distinguish a genuine data gap from normal bucket spacing, so empty ranges render as empty while the still-open final bucket isn't clipped.
