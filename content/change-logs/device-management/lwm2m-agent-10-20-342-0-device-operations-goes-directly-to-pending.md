---
date: '2024-09-19'
title: LWM2M device operations directly go to Pending state
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
ticket: DM-3601
version: 10.20.342.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously,
the execution of LWM2M device operations was limited to a specific timeframe following the device's registration with the platform.
However, this timeframe remained static even after the device underwent registration updates,
despite the previous operational window not yet expiring.
This limitation has now been addressed,
ensuring that each LWM2M device registration update extends the device operations timeframe.
