---
date: '2024-11-11'
title: >-
  Values for registers and coils in the "Fieldbus device" widget can be modified
  properly
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
ticket: DM-4002
version: 1020.40.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the "Fieldbus device" widget, modifying registers and coils by clicking the **Set** button did not work properly. This issue has been fixed and an operation to update the values will be triggered as intended.
