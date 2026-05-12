---
date: ""
title: Default dashboard configuration now uses 24 columns
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
ticket: MTM-65903
version: 1023.14.157
---
The default dashboard configuration previously used a different column layout that could cause inconsistent widget sizing and positioning across dashboards. The ContextDashboardService now sets 24 columns as the default configuration for all new dashboards, providing a more consistent and flexible grid system for organizing dashboard widgets. This change ensures that all dashboards use a standardized column layout, which improves the visual consistency of your dashboards and makes it easier to arrange widgets in a predictable manner. Existing dashboards are not affected by this change, and you can still customize the column configuration for individual dashboards as needed.