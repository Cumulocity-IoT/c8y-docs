---
date: ""
title: Improved Value Normalisation for Modbus Registers
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
---
In the Device Management app, it is now possible to enter decimal values as minimum and maximum for Modbus register value normalisation. Previously, the interface suggested that values like 655.1 were allowed, but only whole numbers could be saved, which prevented some device configurations. With this update, the app accepts floating point numbers in all relevant fields for Cloud fieldbus types, including Modbus. This ensures that register settings can match the capabilities of your devices and allows for more accurate value scaling.