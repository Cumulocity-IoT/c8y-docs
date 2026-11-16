---
date: '2024-04-25'
title: Software items are now properly shown in the Device data widget
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
ticket: DM-3470
version: 1019.20.6
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The properties library schema definition for the `c8y_SoftwareList` fragment did not match the actual managed object properties. Hence, when the "Software" property was selected in the "Device data" widget no data was shown. The property is now called "Software list" and displays all software items contained in the `c8y_SoftwareList` fragment.
