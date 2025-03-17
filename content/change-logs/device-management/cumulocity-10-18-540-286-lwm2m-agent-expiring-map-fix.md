---
date: "" 
title: Fixed an issue with expired LWM2M device operation realtime subscriptions
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
In previous versions it was possible that an expired realtime subscription was considered active by the LWM2M agent. This could lead to issues like disconnecting from an already disconnected channel or not being able to connect again. As a result, the LWM2M device operations were not taken in realtime for the device. This issue has now been fixed.
