---
date: ""
title: Fixed an issue with notifications token refresh in LWM2M agent
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
ticket: DM-5841
version: 1021.11.28
---
Fixed an issue where the agent would fail to refresh JWT tokens following periods of inactivity, preventing automatic recovery and requiring a manual service restart.
