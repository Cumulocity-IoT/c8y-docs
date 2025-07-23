---
date: '2025-03-20'
title: Improved device availability monitoring
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
Previously, when turning on or off the maintenance mode in the device status, **Last Communication** could show a wrong date. To fix this issue, the device availability monitoring has been enhanced by adding a safeguard when transitioning into or out of the maintenance mode. This prevents stale ´lastMessage´ entries and ensures accurate status tracking and improved data integrity.
