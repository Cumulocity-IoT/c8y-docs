---
date: 
title: Measurement series can no longer be created without value
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-60356
version: 10.20.566.0
---

Previously, it was possible to create a measurement series without value. This issue has been fixed as the value is mandatory. Now a value must be provided on measurement creation. 
