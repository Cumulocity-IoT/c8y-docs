---
date: '2024-05-21'
title: Replace device functionality available as plugin
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3546
version: 1019.24.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The "Replace device" functionality is now delivered as a self-hosted plugin by the Device Management application. This way, the functionality can easily be removed from the application if not needed.

Additionally, the device replace wizard was made more extensible by introducing hookable interfaces (`hookDataGridActionControls` and `hookService`).
