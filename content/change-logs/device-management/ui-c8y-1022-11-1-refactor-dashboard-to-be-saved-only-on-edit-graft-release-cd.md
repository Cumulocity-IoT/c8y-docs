---
date: ""
title: Dashboard is now only saved when edited
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
version: 1022.11.1
---
Previously, dashboards were saved every time they were loaded, even if no changes were made. To improve performance and reduce unnecessary API calls, dashboards are now only saved when they are actually edited by the user. This change should be transparent to users and not impact the functionality of dashboards.