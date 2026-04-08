---
date: '2026-04-06'
title: Fixed LWM2M operation execution delay
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
ticket: DM-5841
version: 1022.1.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-06'
  - label: apj.cumulocity.com
    date: '2026-04-08'
  - label: jp.cumulocity.com
    date: '2026-04-08'
---
The LWM2M agent failed to execute operations immediately after their creation. This issue has been fixed.
