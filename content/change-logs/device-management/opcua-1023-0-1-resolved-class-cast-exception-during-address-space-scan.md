---
date: ""
title: Resolved ClassCastException during OPC UA device gateway address space scan
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
ticket: DM-5160
version: 1023.0.1
---
Previously, scanning the device gateway address space on certain OPC UA servers caused a ClassCastException when reading the root node data. The issue has been resolved by upgrading the core OPC UA library to a higher version.