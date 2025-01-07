---
date: 2024-09-19
title: LWM2M agent now always stores data from multi-instance resources correctly
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
ticket: DM-2770
version: 10.20.353.0
---
When a device sends values from multi-instance resources (via read, composite read, observe or composite observe), the LWM2M agent must decide whether it overwrites the previous data set or updates it (for example, by adding a new value to an existing array). Previously, in some edge cases the decision taken by the agent was not correct. This issue is now fixed and the agent always stores data from multi-instance resources correctly.  
