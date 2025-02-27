---
date: ""
title: Improved Device Availability Monitoring
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-61506
version: 20.25.76.0
---
Enhancing device availability monitoring by adding a safeguard when transitioning into or out of the MAINTENANCE state. Preventing stale lastMessage entries to ensure accurate status tracking and improved data integrity.