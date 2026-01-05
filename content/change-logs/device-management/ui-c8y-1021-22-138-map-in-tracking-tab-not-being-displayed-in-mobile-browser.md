---
date: ""
title: Map on Tracking tab was not displayed in mobile browser
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
ticket: DM-5167
version: 1021.22.138
---
The map on the **Tracking** tab was not being displayed when accessing the application through a mobile browser, impacting the user experience for mobile users. With this change, the map is now correctly rendered also on mobile devices.