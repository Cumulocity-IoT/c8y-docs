---
date: ""
title: Removed deprecated getNamedDashboardOrCreate from context-dashboard service
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4568
version: 1022.0.0
---
The deprecated `getNamedDashboardOrCreate` method has been removed from the `context-dashboard` service in the Dashboard API. In the future, the `getDashboard()` call must be used instead.