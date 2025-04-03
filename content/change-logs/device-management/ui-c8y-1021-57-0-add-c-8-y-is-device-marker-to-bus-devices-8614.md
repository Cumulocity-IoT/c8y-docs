---
date: ""
title: Modbus, Profibus, CANBus, and CANopen devices are now marked with c8y_IsDevice fragment
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
---
In the past, Modbus, Profibus, CANBus, and CANopen devices created by the device management application were missing the c8y_IsDevice marker which identifies them as devices in the inventory. This change adds the c8y_IsDevice fragment to all bus devices created going forward. Existing bus devices in the inventory are not modified and will still be missing the marker. This improvement makes these devices easier to find and filter in the inventory when querying for devices.