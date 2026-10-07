---
date: ""
title: Operations for sleeping LWM2M queue mode devices stay pending
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
ticket: DM-7457
version: 1022.7.15
---
Previously, operations for an LWM2M device in queue mode could fail with the reason "The destination client is sleeping, request cannot be sent." This happened when the device had already missed an earlier request and was considered sleeping. Now these operations stay pending and are delivered when the device connects again.
