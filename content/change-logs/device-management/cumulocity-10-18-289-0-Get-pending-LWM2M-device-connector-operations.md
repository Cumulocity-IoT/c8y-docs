---
date: '2023-12-06'
title: Get pending LWM2M device connector operations
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2652
version: 10.18.289.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
A fail-safe mechanism to regularly get pending LWM2M device connector operations from the platform has been added in addition to the real-time mechanism in the LWM2M agent. This mechanism is beneficial when real-time connections between the LWM2M agent and the platform are unstable.
