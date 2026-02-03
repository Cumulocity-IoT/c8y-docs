---
date: 2024-09-11
title: Fix performance regression for count queries and inventory roles
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
ticket: MTM-60283
version: 10.20.520.0
---
The {{< product-c8y-iot >}} platform faced performance regression which could only be observed on a higher number of concurrent requests using inventory role-based access control or on performing counts via query parameters like `withTotalPages` or `withTotalElements`. This issue has been fixed and the performance has returned to normal.
