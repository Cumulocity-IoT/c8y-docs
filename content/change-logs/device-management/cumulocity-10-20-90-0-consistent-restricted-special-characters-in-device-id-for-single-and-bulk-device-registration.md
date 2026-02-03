---
date: 2024-04-04
title: Consistent restriction of special characters in device ID for single and bulk
  device registration
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-42229
version: 10.20.90.0
---
The device ID verification in the single device registration and bulk device registration processes restricts several special characters. This was inconsistent and quite permissive. Now the verification works consistently in both processes, and the restricted characters are `/`, ` \`, `$` and space. Both registrations also still block control characters.
