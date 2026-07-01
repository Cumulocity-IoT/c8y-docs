---
date: '2024-05-13'
title: Range display now shows correct value if data point maximum is 0
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In some cases, data points with a configured maximum value of 0 were not displayed correctly in the range display of dashboards and other visualizations. This issue has been resolved and the range display now correctly shows the value for data points with a maximum of 0. This change improves the accuracy and consistency of data visualizations for all users.
