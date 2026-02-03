---
date: 2024-05-09
title: Improved configuration for OPC UA device gateway node scan retries
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
ticket: DM-2992
version: 10.20.42.0
---
The issue that the count of retries for the node scan (`gateway.scanAddressSpace.retries`) stored in the OPC UA device gateway property is being ignored has been resolved.
A new OPC UA device gateway property has been added that allows to configure the pause time between retries (`gateway.scanAddressSpace.pauseMillisForRetry`) during the address space scan.
