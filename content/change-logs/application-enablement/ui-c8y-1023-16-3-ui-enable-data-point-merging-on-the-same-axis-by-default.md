---
date: ""
title: Enable data point merging on the same axis for the new data point graph and data explorer by default
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
ticket: MTM-65314
version: 1023.16.3
---
Previously, data points were not merged on the same axis by default for the new data point graph and data explorer, which made it difficult to compare data. With this change, data points are now merged on the same axis by default. This improves the usability and allows users to easily compare and analyze data on the same chart without additional configuration.