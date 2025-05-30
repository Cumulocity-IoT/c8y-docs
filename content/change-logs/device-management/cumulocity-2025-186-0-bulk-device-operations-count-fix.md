---
date: 
title: Fixed bulk device operations count
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
In specific conditions it was possible for bulk device operation to be executed more than once on a single device. This problem is now fixed.