---
date: '2026-03-31'
title: >-
  Linear gauge widget now handles datapoint template min & max values stored as
  strings
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
ticket: MTM-64094
version: 1022.6.1
---
Previously, the "Linear gauge" widget in the Cockpit application did not handle cases where the datapoint template for the displayed measurement stored the min and max values as strings instead of numbers. This caused the widget to display an error in such cases. With this change, the "Linear gauge" widget has been adjusted to properly handle min and max values provided as strings in the datapoint template. The widget will now convert those string values to numbers internally and display the linear gauge without errors. This improvement makes the "Linear gauge" widget more resilient and compatible with a wider range of datapoint template configurations.
