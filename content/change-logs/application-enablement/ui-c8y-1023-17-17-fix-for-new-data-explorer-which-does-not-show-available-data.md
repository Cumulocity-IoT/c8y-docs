---
date: '2026-01-20'
title: >-
  Data explorer now also displays data near the beginning of a selected time
  range
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
ticket: MTM-65093
version: 1023.17.17
---
When a datapoint contains values at second-level granularity, selecting a custom time range could result in no data being shown on the chart even though data exists within the selected interval. This happened because the underlying request used an offset start time, and the data explorer then filtered the results using second-level boundaries that did not fully overlap with the actual datapoint timestamps. As a result, valid data near the beginning of the selected range could be excluded from the visible window. The issue was fixed by adding second-level selection support for custom time ranges, ensuring the query and filtering logic align correctly with second-based data.
