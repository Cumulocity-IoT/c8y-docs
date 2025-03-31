---
date: 2025-03-31T12:00:00.000Z
title: Improved LWM2M decoder event execution
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
ticket: DM-3891
version: 10.20.380.0
---
The synchronization mechanism has been improved to prevent the LWM2M agent from processing duplicate external decoder events.