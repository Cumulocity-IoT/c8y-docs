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
We’ve cleaned up the Dashboard API by removing the old, deprecated `getNamedDashboardOrCreate` method from the `context-dashboard` service. Going forward, use the newer `getDashboard()` call.