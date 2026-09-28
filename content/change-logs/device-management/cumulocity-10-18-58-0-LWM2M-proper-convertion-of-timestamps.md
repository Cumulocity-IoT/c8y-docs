---
date: '2023-12-06'
title: LWM2M proper convertion of timestamps
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
ticket: DM-2150
version: 10.18.58.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The LWM2M agent can now properly convert the timestamps from the SenML data reported by the LWM2M client to a platform compatible date-time format for performing respective resource actions.
