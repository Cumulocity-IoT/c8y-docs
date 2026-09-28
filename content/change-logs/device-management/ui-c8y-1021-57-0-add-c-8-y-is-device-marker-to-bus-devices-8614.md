---
date: '2025-04-24'
title: >-
  c8y_IsDevice fragment now added to Modbus, Profibus, CANBus, and CANopen
  devices
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
ticket: DM-4557
version: 1021.57.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the past, Modbus, Profibus, CANBus, and CANopen devices created in the Device Management application were missing the `c8y_IsDevice` fragment which identifies them as devices in the inventory. This change adds the `c8y_IsDevice` fragment to all such devices created going forward. This improvement makes such devices easier to find and filter in the inventory when querying for devices. Existing Modbus, Profibus, CANBus, and CANopen devices in the inventory are not modified and will still be missing the parameter. 
