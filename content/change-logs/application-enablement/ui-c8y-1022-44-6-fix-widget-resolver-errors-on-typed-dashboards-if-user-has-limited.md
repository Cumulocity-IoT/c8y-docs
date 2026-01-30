---
date: '2025-10-23'
title: >-
  Fixed widget resolver errors on typed dashboards for users with limited
  permissions
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64730
version: 1022.44.6
---
Previously, widgets on typed dashboards such as `c8y_Device` could display resolver errors for users with limited permissions. This occurred because permission checks were executed on the originally configured device before the context override was applied.

With this fix, widget configurations are now updated with the correct context device, replacing both device and __target fields in datapoint objects before resolvers are executed. This ensures that permission checks target the appropriate device and that widgets render correctly for all users.
