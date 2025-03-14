---
date: ""
title: Fixed a rare condition where LWM2M device operation realtime subscription considered active for already expired subscription in LWM2M service
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
ticket: DM-4363
version: 1020.440.11
---
In previous versions it was possible that expired realtime subscription was considered active by LWM2M agent. It could lead to issues like disconnecting from already disconnected channel or not being able to connect again. This caused the LWM2M device operations not taken in realtime for the device. This issue is now fixed.