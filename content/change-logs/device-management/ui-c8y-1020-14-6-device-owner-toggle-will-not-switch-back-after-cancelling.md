---
date: '2024-08-08'
title: >-
  Device owner toggle no longer remains in incorrect state after canceling the
  change
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
ticket: DM-3806
version: 1020.14.6
---
When attempting to change the device owner on the **Info** tab in the device details and then canceling the action, the toggle control previously remained in an incorrect state and appeared as if the change had been applied. With this fix, canceling the device owner change now correctly reverts the toggle control back to the original state, avoiding confusion about the current device owner assignment.
