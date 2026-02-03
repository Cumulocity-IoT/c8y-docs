---
date: 2024-05-13
title: Range display now shows correct value if datapoint maximum is 0
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-58555
version: 1019.23.3
---
In some cases, datapoints with a configured maximum value of 0 were not displayed correctly in the range display of dashboards and other visualizations. This issue has been resolved and the range display now correctly shows the value for datapoints with a maximum of 0. This change improves the accuracy and consistency of data visualizations for all users.
