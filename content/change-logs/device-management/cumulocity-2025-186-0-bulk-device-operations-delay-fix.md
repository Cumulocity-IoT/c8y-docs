---
date: 
title: Fixed issue in bulk device operations delay
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
version: 2025.186.0
---
If bulk device operations were executed later than expected (for example, due to a core restart), they were executed on all devices at once, not respecting the configured delay time. This issue has now been fixed.