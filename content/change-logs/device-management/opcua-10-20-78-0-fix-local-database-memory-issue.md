---
date: 2024-09-02
title: Optimization of storage management for OPC UA gateway
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
ticket: DM-3800
version: 10.20.78.0
---
The OPC UA gateway creates a local database `cumulocity-opcua-gateway.db` to store essential data, including a list of executed operation IDs.
As this list expands, the database file consumes more disk space. This issue has been resolved by introducing an in-memory cache to store executed operation IDs with each entry set to auto-expire after 24 hours. 
The fix also includes a one-time cleanup process during the gateway startup to reduce the size of the existing file.