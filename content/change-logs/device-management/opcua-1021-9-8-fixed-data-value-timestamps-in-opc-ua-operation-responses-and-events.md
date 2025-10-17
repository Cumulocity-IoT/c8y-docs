---
date: ""
title: Fixed data value timestamps in OPC UA operation responses and events
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-4757
version: 1021.9.8
---
In previous OPC UA Gateway versions, data values source and server timestamps were not serialized correctly to epoch time. This problem is now fixed in the OPC UA operation responses and the data value events.