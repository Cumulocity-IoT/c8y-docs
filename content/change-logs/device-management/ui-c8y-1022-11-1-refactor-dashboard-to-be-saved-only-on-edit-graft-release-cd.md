---
date: ""
title: Dashboards are now only saved when edited
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
Dashboards now load in memory on the Info tab and are only persisted to the backend once the user makes changes. This reduces unnecessary API calls and improves performance. No action is required—existing dashboard integration will continue to work as before.