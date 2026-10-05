---
date: ""
title: Fixed chart flickering issues
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
ticket: MTM-66998
version: 1024.19.4
---
Data explorer or data graph charts were flickering unnecessarily when hovering over different data points. The chart options have been optimized to prevent unnecessary redraws and ensure smooth visual updates. Charts now display data consistently without flickering when you interact with the data points, apply filters, or refresh data, providing a more stable and better viewing experience.