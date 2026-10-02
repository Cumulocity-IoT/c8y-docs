---
date: ""
title: Fixed stuck LWM2M observe operations when the device does not start the observation
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
ticket: DM-7469
version: 1021.11.44
---
Previously, when an LWM2M device answered an observe operation without starting the observation, the operation stayed in EXECUTING and never completed. Now the operation fails with the reason "Device did not establish the observation". This applies to both single and composite observe operations.
