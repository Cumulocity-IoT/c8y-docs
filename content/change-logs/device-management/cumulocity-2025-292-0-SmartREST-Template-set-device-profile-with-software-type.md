---
date: '2025-09-18'
title: New SmartREST template for setting device profiles with software type
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Device management & connectivity
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-4285
version: 2025.295.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
A new static SmartREST 2 response template (ID 531) has been added for device profile operations with software type. This template extends the existing functionality by including the software type as the third value in the software 5-set. The template triggers independently when at least one software element in the software list contains a type, regardless of ASM support or subscription. The existing 527 template will continue to trigger alongside the new template where applicable.
