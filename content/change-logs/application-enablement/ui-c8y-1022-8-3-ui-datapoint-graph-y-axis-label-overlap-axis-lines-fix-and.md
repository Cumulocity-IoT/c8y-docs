---
date: ""
title: Fix for the overlapping  y axis label on the data point graph. The unit is now displayed on the y axis label when "force merge all data points to a single axis" is enabled. 
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
In the UI datapoint graph, the y-axis labels could overlap with the axis lines in some cases, making them difficult to read. Additionally, when the "force merge all datapoints to a single axis" option was enabled, the unit was not displayed. This change fixes the y-axis label overlapping issue and ensures that the unit is shown when all datapoints are merged to a single axis, improving the readability and clarity of the datapoint graph.