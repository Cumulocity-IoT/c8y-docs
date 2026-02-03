---
date: 2023-12-06
title: Fixed duplicate identity mappings
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
ticket: MTM-48399
version: 10.18.135.0
---
Fixed a possible race condition with duplicate identity mappings for devices by introducing a unique database index.