---
date: 2024-09-19
title: LWM2M agent can now cancel observations using the "GET with observe option" method
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-2936
version: 10.20.350.0
---
Previously, the LWM2M agent could only cancel observations using the "reset" method. With this change, the LWM2M agent can now also use "GET with observe" method to cancel observations.  