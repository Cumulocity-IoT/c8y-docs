---
date: 2024-09-19
title: LWM2M agent processes all multiple resource instance IDs correctly
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
ticket: DM-3311
version: 10.20.308.0
---
When a LWM2M device sends a composite request with multiple resource instance IDs from the same resource ID and this resource ID has an additional action defined, only one of these resource instance values was sent to this additional action for processing. The same behavior was observed when you try to do a composite read (`cread`) device operation with a row of resource instance IDs. These issues are resolved and all requested resource instance IDs are now processed.
