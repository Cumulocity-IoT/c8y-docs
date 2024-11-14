---
date: ""
title: Fix retrieving device context dashboards
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
ticket: MTM-61691
version: 1021.3.0
---
Retrieving device context dashboards did not work as expected if device had space in it's name, so it was impossible to view device view as dashboard is by default first route for device in Cockpit. This has now been fixed.