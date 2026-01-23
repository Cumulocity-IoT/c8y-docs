---
date: ""
title: Resolved ClassCastException during address space scan
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
Addressed an issue where scanning the address space on certain OPC-UA servers caused a ClassCastException when reading the root node data. Upgraded the core OPC-UA library to a version that resolves this problem.