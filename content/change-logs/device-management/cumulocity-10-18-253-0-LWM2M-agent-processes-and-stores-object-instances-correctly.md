---
date: 2023-12-06T15:47:22.131Z
title: LWM2M agent processes and stores object instances correctly
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2426
version: 10.18.253.0
---
When reading an entire LWM2M object which contains multiple object instances in a simple read, observer or send operation, the LWM2M agent processed and stored only one of the resources of these object instances. This is now resolved and the LWM2M agent processes and stores all resource data from multiple object instances correctly.
