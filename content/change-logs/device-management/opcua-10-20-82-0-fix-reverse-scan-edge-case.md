---
date: 2024-09-02
title: Fixed issue with OPC UA address space scanning
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
ticket: DM-3594
version: 10.20.82.0
---
In earlier versions of the OPC UA gateway, it rarely happened that a reverse address space scan unexpectedly 
failed if the last node processed wasn't a root node. This issue has been fixed. Also, if a scan encounters an issue 
with a single node, it will now log the error and move on to the next node, rather than stopping the entire scan.