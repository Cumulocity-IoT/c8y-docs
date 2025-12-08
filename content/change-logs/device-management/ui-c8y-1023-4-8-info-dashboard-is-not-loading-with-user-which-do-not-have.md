---
date: ""
title: Info dashboard fails to load for users without global permissions
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
ticket: DM-5059
version: 1023.4.8
---
In **Device management** some **Info** dashboards failed to load for users without global inventory access (i.e. inventory roles only). This issue is now fixed and device **Info** dashboard is available for all users with access to the device.