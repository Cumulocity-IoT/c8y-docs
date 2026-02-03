---
date: 2024-09-19
title: Object mapping actions no longer executed multiple times on LWM2M 1.1 send request
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
ticket: DM-3620
version: 10.20.336.0
---
When a LWM2M 1.1 send request that includes multiple timestamps has been received, the object resource mapping actions have in some cases been processed multiple times by the LWM2M agent. This issue has been resolved to ensure that mapping actions get only triggered once.