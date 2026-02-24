---
date: '2026-03-31'
title: Improved the readability and clarity of the data point graph
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
ticket: MTM-64140
version: 1022.8.3
---
In the data point graph, the y-axis labels could overlap with the axis lines in some cases, making them difficult to read. Additionally, when the **Force merge all datapoints to a single axis** option was enabled, the unit was not displayed. This change fixes both issues. Y-axis labels no longer overlap with the axis lines, and the unit is now displayed properly when all data points are merged to a single axis, improving the readability and clarity of the data point graph.
