---
date: 2026-06-30
title: Chart now displays correct y-axis scale for visible data
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
ticket: MTM-66547
version: 1023.14.168
---
Charts were not displaying the correct y-axis scale when showing visible data, which could make it difficult to accurately interpret the chart values. The y-axis scale calculation has been fixed to properly reflect the range of data currently displayed in the chart. This ensures that charts now render with an appropriate y-axis scale that accurately represents the visible data points, making it easier for you to analyze and understand the information presented.