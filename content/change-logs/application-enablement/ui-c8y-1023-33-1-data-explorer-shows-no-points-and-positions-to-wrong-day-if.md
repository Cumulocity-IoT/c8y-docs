---
date: ""
title: data explorer shows no points and positions to wrong day if custom time series chosen (#10952) [GRAFT][release/cd] (#11126)
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
ticket: MTM-65965
version: 1023.33.1
---
When selecting a custom time range in the data explorer, chart lines were not rendered and data points were assigned to incorrect days. Data points are now displayed correctly on their actual dates and times when using custom time ranges.