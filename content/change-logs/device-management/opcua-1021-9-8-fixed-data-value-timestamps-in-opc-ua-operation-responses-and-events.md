---
date: '2025-10-30'
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
In previous OPC UA gateway versions, the source and server timestamps for data values were not serialized correctly to epoch time. This issue is now resolved in the OPC UA operation responses and data value events.
