---
date: '2025-09-04'
title: >-
  Long event or alarm texts no longer overflow in the data point graph or data
  explorer tooltips
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
ticket: MTM-64040
version: 1022.22.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the data point graph or data explorer, long event or alarm texts were overflowing from the tooltip and were not fully visible, making it difficult for users to read the complete event information. This issue has now been fixed. The tooltips for long event or alarm texts are properly displayed without any overflow. This improvement enhances the usability and readability of alarm and event information in the chart view.
