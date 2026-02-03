---
date: 2024-07-30
title: SmartREST template collection parsing no longer fails with response template   
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-veSW5rwrq
    label: device-simulator
ticket: DM-3677
version: 1.8.0
---
Device simulators configured to use a SmartREST template collection containing response templates had an internal issue that prevented data creation. This issue has been addressed by correctly parsing response templates so that processing is no longer interrupted.
