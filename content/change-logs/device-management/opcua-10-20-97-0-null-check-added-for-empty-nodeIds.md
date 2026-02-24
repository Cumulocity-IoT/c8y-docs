---
date: '2026-03-31'
title: >-
  Creating OPC UA device type without the matchedNodeIds list for
  applyConstraints
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
ticket: DM-3216
version: 10.20.97.0
---
Previously, the device type creation via the OPC UA management service API failed when `matchedNodeIds` list was not defined for `applyConstraints`. This issue 
has now been resolved, and apply constraints can now be set without defining a 
`matchedNodeIds` list.
