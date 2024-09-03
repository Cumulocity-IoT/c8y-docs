---
date: 2024-09-02
title: OPC UA gateway no longer fails when attempting to call a missing 64-bit system function
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device management & connectivity
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-3867
version: 10.18.523.0
---
In certain ARM64-based environments, the OPC UA gateway may have failed when attempting to call a specific 64-bit system function that might be missing in some base Docker images. This issue has now been resolved. If this function is missing, the service will attempt to call a default system function instead.