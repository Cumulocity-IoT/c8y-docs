---
date: '2025-04-03'
title: >-
  Fixed issue with LWM2M external decoders not updating device data fragments
  properly
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
ticket: DM-4423
version: 1021.7.3
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The LWM2M external decoders are capable of updating device data fragments. Previously, when a data fragment was of type OPAQUE and the requested fragment value was plain text, the execution crashed with an error message ("Event processing failed") instead of updating the specified fragment. This issue has now been resolved, and data fragments are updated as intended.
