---
date: '2024-12-19'
title: Added a hook service to allow extension of alarm details view with custom tabs
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-59811
version: 1021.22.0
---
To provide more flexibility for customizing alarm detail views, hook services have been added to extend alarm details with custom tabs, along with the inline tabs component. This enables developers to display additional context-specific information for alarms or easily integrate third-party data and visualizations in the view. The existing alarm details functionality remains unchanged, while custom tabs appear as additional options in the details view.
