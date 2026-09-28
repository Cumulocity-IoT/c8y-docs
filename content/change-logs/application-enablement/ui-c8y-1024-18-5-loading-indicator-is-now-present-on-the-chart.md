---
date: '2026-09-23'
title: Loading indicator now displays on charts
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
ticket: MTM-67769
version: 1024.18.5
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-09-23'
  - label: apj.cumulocity.com
    date: '2026-09-25'
  - label: jp.cumulocity.com
    date: '2026-09-25'
---
When loading chart data in the data explorer or "Data graph" widget, users previously had no visual feedback indicating that the system was processing the request, which could create confusion about whether the application was responding. The chart now displays a loading indicator while data is being fetched and processed, providing clear visual feedback that the operation is in progress. This improvement enhances the user experience by making the application's state more transparent and reducing uncertainty during data loading operations.
