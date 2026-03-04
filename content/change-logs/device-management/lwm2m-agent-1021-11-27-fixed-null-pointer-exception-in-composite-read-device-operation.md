---
date: ""
title: Fixed NullPointerException in composite read device operation
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
ticket: DM-5791
version: 1021.11.27
---
Description: Fixed a NullPointerException that occurred when performing composite read operations on LWM2M resources or objects that do not exist on the device.