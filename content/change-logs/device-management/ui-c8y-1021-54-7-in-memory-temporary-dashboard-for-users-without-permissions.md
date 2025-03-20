---
date: ""
title: Allow users without permissions to create temporary dashboards in memory
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4362
version: 1021.54.7
---
To enable users to explore and visualize data without requiring explicit dashboard creation permissions, a new feature has been added that allows users to create temporary dashboards that are stored in memory. Previously, users needed specific permissions to create and save dashboards. With this change, any user can now create temporary dashboards to visualize and analyze data, but these dashboards are not persisted and will be lost when the user session ends. This provides more flexibility for users to work with data without impacting existing permission models or dashboard assets.