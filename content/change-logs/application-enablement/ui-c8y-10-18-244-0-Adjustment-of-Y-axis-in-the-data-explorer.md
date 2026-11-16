---
date: '2023-12-06'
title: Adjustment of Y-axis in the data explorer
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-54008
version: 10.18.244.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the data explorer, when deleting the min/max value of a data point, the Y-axis displayed "-1" and "1" instead of determining the maximum and minimum value based on the data. This has been fixed and the Y-axis shows the min/max value of the data again.
