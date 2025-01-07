---
date: 2024-09-19
title: LWM2M agent changes external microservice properly
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
ticket: DM-2674
version: 10.20.319.0
---

In the custom action configuration of LWM2M device protocol resources, the exchange to another external decoder microservice
was not effective. This issue is now resolved.
