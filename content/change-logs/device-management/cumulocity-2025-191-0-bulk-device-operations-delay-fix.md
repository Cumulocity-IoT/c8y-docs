---
date: '2025-06-26'
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
version: 2025.191.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when a bulk device operation was resumed after a failure scenario, the mechanism scheduled the remaining operations from the original scheduling date. This meant that any configured delay was not respected but the operations were created as quickly as possible. This has been corrected by scheduling the remaining operations with the configured delay from the time the operation is resumed.
