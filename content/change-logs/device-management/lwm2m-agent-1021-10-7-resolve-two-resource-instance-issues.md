---
date: '2025-05-06'
title: Resolved Issues in LWM2M Composite Write and Binary Data Read
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
ticket: DM-4560
version: 1021.10.7
---
A LWM2M composite write operation that correctly wrote multiple resource data to the device but incorrectly consolidated the values into a single LWM2M resource object in the displayed data, along with an issue where event's binary data in multiple resource instances was not properly represented during LWM2M read, have both been resolved.
