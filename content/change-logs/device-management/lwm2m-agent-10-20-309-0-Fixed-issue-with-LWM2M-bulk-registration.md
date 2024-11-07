---
date: 2024-09-19
title: LWM2M agent processes large LWM2M bulk registration reliably
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management & Connectivity
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-3141
version: 10.20.309.0
---
LWM2M bulk registrations and removals processed by the LWM2M agent were unreliable due to a race condition. This issue has been fixed and bulk registrations are now processed reliably.
