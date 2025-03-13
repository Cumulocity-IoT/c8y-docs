---
date: ""
title: Service alarm page showed alarms from other sources
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
ticket: DM-4429
version: 1021.22.48
---
Previously, the alarm page of a service displayed alarms from other sources except the service in context itself. This has now been fixed and only alarms related to the service are displayed.