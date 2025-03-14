---
date: ""
title: Fixed LWM2M "Event processing failed" issue when external decoder sent device data fragment targeting OPAQUE-type resource
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
version: 1020.440.13
---
The LWM2M external decoders are capable of updating device data fragments. Previously, when a data fragment was of type OPAQUE and the requested fragment value was plain text, the execution would crash with "Event processing failed" message instead of updating the specified fragment. This issue has now been resolved, and data fragments are updated as intended.