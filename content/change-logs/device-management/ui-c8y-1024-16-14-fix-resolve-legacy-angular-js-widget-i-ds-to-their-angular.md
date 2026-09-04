---
date: '2026-09-02'
title: >-
  Asset notes widget now loads correctly on dashboards created in earlier
  versions
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
version: 1024.16.14
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-09-02'
  - label: apj.cumulocity.com
    date: '2026-09-03'
  - label: jp.cumulocity.com
    date: '2026-09-03'
---
An "Asset notes" widget added to a dashboard created in an earlier version could fail to load because the dashboard stored it under its legacy AngularJS identifier. The widget is now recognized under that identifier again, so that existing dashboards display the widget and its notes correctly. No manual changes are required.
