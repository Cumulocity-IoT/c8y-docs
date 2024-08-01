---
date: ""
title: Restricted paste action when user attempts to paste device dashboards into groups or group dashboards into devices
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
ticket: MTM-59834
version: 1018.503.108
---
Previously users were able to copy a device dashboard and paste it into a group (or copy a group dashboard and paste it into a device), which resulted in an error. With this change, the paste button is now disabled and information for the reason is provided.