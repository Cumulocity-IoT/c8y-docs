---
date: '2025-01-16'
title: Fixed default LWM2M firmware update reset mechanism
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
ticket: DM-4251
version: 10.20.443.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In recent LWM2M agent versions, the default firmware update reset mechanism was always set to PACKAGE even if the device only supported the PULL delivery method. Now the default reset method is selected based on the firmware delivery method supported by the device.     
