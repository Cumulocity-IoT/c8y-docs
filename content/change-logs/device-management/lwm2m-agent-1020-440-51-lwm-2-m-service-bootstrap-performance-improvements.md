---
date: ""
title: LWM2M Service bootstrap performance improvements
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
ticket: DM-5045
version: 1020.440.51
---
Increased the degree of parallelism for LwM2M bootstrap processes to eliminate "head-of-line blocking" bottlenecks. Timed-out requests from unresponsive devices no longer delay or block the provisioning of active devices, ensuring a significantly faster, more reliable, and high-throughput bootstrap process.