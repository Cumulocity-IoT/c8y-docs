---
date: '2026-03-31'
title: Retention rules now also run for suspended tenants
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63117
version: 20.25.121.0
---
The retention scheduler has been updated to execute retention rules for tenants with the status SUSPENDED in addition to active tenants. This makes sure that data cleanup and storage rules still apply, even if a tenant is not currently active.
