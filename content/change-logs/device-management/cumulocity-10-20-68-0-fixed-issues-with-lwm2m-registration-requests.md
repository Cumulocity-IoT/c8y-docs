---
date: "2024-02-06"
title: Fixed issues with LWM2M registration requests
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-3124
version: 10.20.68.0
---
A race condition encountered during simultaneous LWM2M client de-registration and new registration requests has been resolved, improving overall robustness in the registration process.