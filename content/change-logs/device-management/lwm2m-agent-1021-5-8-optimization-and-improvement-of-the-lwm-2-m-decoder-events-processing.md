---
date: ""
title: Optimization and improvement of the LWM2M decoder events processing engine
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
ticket: DM-4026
version: 1021.5.8
---
Description:  
- Improved the processing of external decoder events in the LWM2M agent by transitioning from a single-threaded per-tenant approach to a multi-threaded implementation.
- Enhanced scalability and performance, enabling faster processing of millions of decoder events.
