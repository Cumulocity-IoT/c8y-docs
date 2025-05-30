---
date: 
title: Fixed bulk device operations delay
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
When bulk device operation was executed later than expected (i.e. because of core restart), it was executed on all devices at once not respecting configured delay time. This problem is now fixed.