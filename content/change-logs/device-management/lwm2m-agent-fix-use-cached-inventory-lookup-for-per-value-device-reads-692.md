---
date: ""
title: [Fix] Use cached inventory lookup for per-value device reads (#692)
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
ticket: DM-7764
version: 
---
Change Logs

Title: Reduced inventory requests when processing LwM2M device data

Description: The LwM2M agent now reuses cached device data when creating events, measurements and alarms from mapped resources, reducing the number of inventory requests and improving data processing throughput under high load.