---
date: 
title: Creating a device type with auto-apply constraints now works without the matchedNodeIds List
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
When creating a device type with "ApplyConstraints" and any properties, 
but without the "matchedNodeIds" list, the service would fail. This issue 
has now been resolved, and "ApplyConstraints" can now be used without the 
"matchedNodeIds" list.