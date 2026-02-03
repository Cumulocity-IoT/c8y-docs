---
date: 2024-04-04
title: Fixed issue with large integer values
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2016
version: 10.20.108.0
---
When an LWM2M device sends data for an unsigned integer equal to or greater than 9223372036854775808, the LWM2M agent processes this number but cannot write it to the platform because the platform does not support such large integer values, but it can support scientific numeric values. This issue is now resolved as the LWM2M agent now converts the large unsigned integer values to scientific notation and then sends them to the platform. This may result in a loss of accuracy.
