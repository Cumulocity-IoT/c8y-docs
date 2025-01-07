---
date: 2024-09-19
title: LWM2M agent fully supports firmware update using firmware images hosted by external parties
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-3080
version: 10.20.371.0
---
In previous versions, defining external firmware images was limited to per-device configuration changes. Now, it is possible to use a standard firmware definition that points to an external URL instead of containing a binary.