---
date: ""
title: Multi-select support for aggregation functions and auto aggregation mode
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66621
version: 1024.2.0
---
Previously, the data point graph widget and the data explorer supported only a single aggregation function per data point. Now you can select multiple aggregation functions at once (for example minimum, maximum, and average) and compare them in parallel on the same chart, including a band display for minimum/maximum.

In addition, the new "Auto" aggregation mode calculates the aggregation interval automatically from the selected time range and a configurable number of data points per chart. When zooming in, the chart can either load data at a finer interval or reuse the already loaded data. Auto mode is available on tenants migrated to time series. Existing widget configurations continue to work unchanged. 