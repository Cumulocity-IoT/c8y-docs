---
date: 
title:  Improved migration of LWM2M devices to new data model
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
ticket: DM-4487
version: 10.18.540.287
---
While migrating LWM2M devices to the new (2024 release) data model, it was possible to end up with an invalid data structure in rare cases where legacy data had fragments with blank values. This problem is now fixed.     
