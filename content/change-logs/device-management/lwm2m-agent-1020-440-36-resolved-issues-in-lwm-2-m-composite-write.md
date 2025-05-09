---
date: ""
title: LWM2M Composite Write operation correctly displays multiple resource values
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
ticket: DM-4560
version: 1020.440.36
---
Fixed an issue where a LWM2M Composite Write operation, although correctly writing multiple resource values to the device, incorrectly displayed them as a single consolidated resource object.
