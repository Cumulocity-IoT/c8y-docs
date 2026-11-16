---
date: '2024-10-31'
title: >-
  LWM2M agent skips null entries in supported content format reported by LWM2M
  devices
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
ticket: DM-4048
version: 10.20.392.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The LwM2M agent previously didn't process requests when a faulty device sent a supported content format list containing null values. This issue has now been resolved - the agent skips the null values and continues with the device communication.
