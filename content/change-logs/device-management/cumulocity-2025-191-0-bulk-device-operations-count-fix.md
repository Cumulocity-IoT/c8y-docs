---
date: '2025-06-26'
title: Fixed multiple creation of bulk device operations
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device management & connectivity
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-4670
version: 2025.191.0
---
The mechanism that ensures that scheduled bulk operations are resumed after failure scenarios was unintentionally picking up ongoing bulk operations. This resulted in multiple operations being created for individual devices in some scenarios. This issue has been resolved by adjusting the conditions under which a bulk operation must be resumed.  
