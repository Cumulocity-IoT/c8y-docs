---
date: '2025-11-13'
title: Improved value normalization for Modbus registers
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
ticket: DM-5012
version: 1022.47.2
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the Device Management application, it is now possible to enter decimal values as minimum and maximum values for Modbus register value normalization. Previously, values like 655.1 were allowed in the UI, but only whole numbers were saved, which prevented exact device configurations. With this change, the application accepts floating point numbers in all relevant fields for Cloud fieldbus types, including Modbus. This ensures that register settings can match the capabilities of your devices and allows for more accurate value scaling.
