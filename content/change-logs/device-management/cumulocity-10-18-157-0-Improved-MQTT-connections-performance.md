---
date: '2023-12-06'
title: Improved MQTT connections performance
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-53819
version: 10.18.157.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The performance of MQTT connections has been improved.  MQTT devices can now connect or reconnect faster, especially if the platform already has a large number of MQTT devices connected.
