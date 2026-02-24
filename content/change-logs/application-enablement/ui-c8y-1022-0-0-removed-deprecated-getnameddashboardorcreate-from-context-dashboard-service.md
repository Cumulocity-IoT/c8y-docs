---
date: '2026-03-31'
title: Removed deprecated getNamedDashboardOrCreate from context-dashboard service
product_area: Device management & connectivity
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4568
version: 1022.0.0
---
The deprecated `getNamedDashboardOrCreate` method has been removed from the `context-dashboard` service in the Dashboard API. In the future, the `getDashboard()` call must be used instead.
