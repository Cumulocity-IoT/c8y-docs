---
date: 
title: Improved OPC UA operation ProcessMappingsForDeviceValues
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-4085
version: 10.20.96.0
---

In previous versions, the operation `c8y_ua_command_ProcessMappingsForDeviceValues` would fail entirely if any single mapping failed. The new behavior allows the operation to continue reading nodes even if some cannot be read due to bad status codes. Although the operation will still be marked as failed, all readable nodes will be mapped. Additionally, the result and failure messages have been improved to indicate which nodes failed and which were successful.