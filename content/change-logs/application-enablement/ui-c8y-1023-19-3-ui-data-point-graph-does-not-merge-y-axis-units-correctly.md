---
date: ""
title: UI data point graph now correctly merges y-axis units
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
ticket: MTM-65593
version: 1023.19.3
---
The "Data graph" widget and the data explorer previously had an issue where matching y-axis units were not merged correctly by default, causing multiple axes with the same unit to show irrelevant duplicate data. This made graphs harder to read and interpret when several datapoints shared the same measurement units. The behavior has now been fixed so that duplicate units are automatically merged, improving clarity. In addition, axes with the same minimum and maximum values are also merged to reduce visual clutter. As a result, graphs now display multiple datapoints with shared units more cleanly and consistently, making them easier to read and compare.