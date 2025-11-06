---
date: ""
title: Device status changes were not immediately reflected in Navigator
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
---
When a device was put into maintenance mode (e.g. from the **Device status** widget), or vice versa, this status change was not immediately reflected in the left navigation bar. With this change, the left navigation bar now instantly displays the new device status. This change ensures that users have clear visibility into the current operational state of their devices.