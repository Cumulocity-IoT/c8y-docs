---
date: '2025-03-20'
title: Alarms tab of a service no longer shows alarms from other sources
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
version: 1021.49.10
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, the **Alarms** tab of a service in the device details displayed alarms from other sources than the respective service. This issue has been fixed and now only alarms related to the service are displayed.
