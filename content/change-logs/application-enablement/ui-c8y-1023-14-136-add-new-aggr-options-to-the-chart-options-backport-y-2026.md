---
date: 2026-04-30
title: New aggregation options added to the data graph and data explorer 
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
ticket: MTM-65847
version: 1023.14.136
---
The chart options in the Web SDK now include additional aggregation methods, giving you greater flexibility when configuring data visualization. Previously, aggregation was limited to minimum and maximum values, which could restrict how effectively you could summarize and analyze time-series data. With this update, you can now use average, sum, and count alongside the existing minimum and maximum options. These additional aggregation functions allow you to better represent trends, totals, and overall activity, making it easier to analyze and interpret your data.

This enhancement is available in the data graph and the data explorer.

To use these new aggregation options, the time series migration must have been performed on the tenant. Newly created tenants already use the new time series by default and therefore do not require to be migrated.