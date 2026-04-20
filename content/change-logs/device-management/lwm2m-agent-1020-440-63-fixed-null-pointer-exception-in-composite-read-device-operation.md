---
date: 2026-04-02
title: Fixed LWM2M composite read and observe operation failure when it contains a non existing object/resource
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
version: 1020.440.63
---
Previously, an error occurred when performing composite read operations on LWM2M resources or objects that did not exist on the device. This issue has been resolved.
