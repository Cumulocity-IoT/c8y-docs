---
date: '2024-11-28'
title: Terminate the firmware update process if an unexpected situation is detected
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
ticket: DM-4050
version: 1021.4.2
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, if a device reported an unexpected status or result during a firmware update,
the process simply waited for a valid state. Now, you can configure LWM2M devices to fail the firmware update
process when an unexpected situation is detected. For more details see [LWM2M configuration](/device-integration/lwm2m/#lwm2m-configuration).

