---
date: '2024-10-17'
title: Enabled deletion of child devices from the Child devices tab
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
ticket: DM-3951
version: 1020.28.8
---
In the Device Management application, child devices could not be deleted from the **Child devices** tab. Instead, users had to to navigate to the device details for deletion. With this change, child devices can now be directly deleted from the **Child devices** tab.
