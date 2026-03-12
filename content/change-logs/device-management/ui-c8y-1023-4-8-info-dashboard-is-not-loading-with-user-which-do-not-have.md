---
date: '2025-12-08'
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the Device Management application, in certain cases dashboards on the **Info** tab failed to load for users without global inventory access (that is, with inventory roles only). This issue is now fixed,  and device dashboards are available for all users with access to the device.
