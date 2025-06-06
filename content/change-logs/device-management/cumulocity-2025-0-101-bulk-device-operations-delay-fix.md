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
version: 2025.0.101
---
When bulk device operation is resumed after a failure scenario the mechanism previously scheduled the remaining operations from the original scheduling date. This meant that the configured delay was no longer respected in these scenarios and the operations were created as quickly as possible. This has been corrected by scheduling remaining operations with the configured form the time the operation is resumed instead.