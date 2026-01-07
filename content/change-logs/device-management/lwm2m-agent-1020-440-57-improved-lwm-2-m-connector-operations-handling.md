---
date: ""
title: Improved LWM2M connector operations handling
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
ticket: DM-5103
version: 1020.440.57
---
For the LWM2M connector device, any operation created without a command is immediately marked as failed.