---
date: 2024-05-16
title: Support for OPC UA operations directly on generated devices
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-401
version: 10.20.62.0
---
It is now possible to directly create operations for generated OPC UA devices. This does not apply to all OPC UA operations. Only node-specific operations can be executed on that level. General operations such as address-space scan are still only allowed on the OPC UA Server. An additional configuration (`gateway.operation.validateDeviceOperationNodes`) has been added to enable/disable a validation check if the node-specific operation is done on a node which belongs to the device. If the check is enabled the opcua-device-gateway executes the operation after validation. If the node doesn't belong to the device node list an alarm is created.