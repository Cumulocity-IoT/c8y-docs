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
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-4363
version: 10.18.540.286
---
In previous versions it was possible that expired realtime subscription was considered active by LWM2M agent. It could lead to issues like disconnecting from already disconnected channel or not being able to connect again. This caused the LWM2M device operations not taken in realtime for the device. This issue is now fixed.
