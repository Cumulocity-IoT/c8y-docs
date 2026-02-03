---
date: '2026-01-07'
title: >-
  New data point graph and data explorer by default merge data points with the
  same minimum and maximum values
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
Previously, data points with the same minimum and maximum values were not merged on the same axis by default in the new data point graph and data explorer, which made comparison more difficult. With this change, the “Merge matching data points” option is now enabled by default, so data points with matching minimum and maximum values are automatically displayed on the same axis. This improves usability and allows users to more easily compare and analyze related data on the same chart without requiring additional configuration.
