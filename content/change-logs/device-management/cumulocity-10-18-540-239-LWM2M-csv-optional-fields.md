---
date: 
title: Improved LWM2M CSV bulk device registration
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
ticket: DM-4150
version: 10.18.540.239
---
In previous versions of the LWM2M service, optional registration fields were treated as required if they appeared in the imported CSV file. This issue has now been resolved, and empty values in these fields are correctly ignored.  
