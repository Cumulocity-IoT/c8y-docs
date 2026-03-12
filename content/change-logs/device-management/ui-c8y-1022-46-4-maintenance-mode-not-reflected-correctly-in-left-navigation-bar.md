---
date: '2025-11-13'
title: Device status changes now immediately reflected in the navigator
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
ticket: DM-4994
version: 1022.46.4
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
When the status of a device was changed (for example, from the "Device status" widget), the status change was not immediately reflected in the navigator. With this change, the navigator now instantly displays the new device status. This change ensures that users have clear visibility into the current operational state of their devices.
