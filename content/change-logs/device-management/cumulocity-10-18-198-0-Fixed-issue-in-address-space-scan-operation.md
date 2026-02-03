---
date: 2023-12-06T16:11:18.279Z
title: Fixed issue in address space scan operation
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2365
version: 10.18.198.0
---
In OPC UA device gateway nodes, expected but missing information prevented the completion of the address space scan operation. This is now fixed by skipping these nodes and adding an error message in the opcua-device-gateway log files.
Additionally, the overall scanning speed has been improved for the full and partial address space scan operations.
