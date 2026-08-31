---
date: ""
title: Asset Notes widget now loads correctly on dashboards created in earlier versions
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
ticket: DM-7067
version: 1023.14.210
---
Asset Notes widgets added to a dashboard in an earlier version could fail to load because the dashboard stored them under their legacy AngularJS identifier. The widget is now recognized under that identifier again, so existing dashboards display it and its notes correctly - no manual changes needed.