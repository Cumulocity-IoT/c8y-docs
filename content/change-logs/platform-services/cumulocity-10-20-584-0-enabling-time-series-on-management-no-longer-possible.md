---
date: 
title: Enabling time series support on the Management tenant is no longer possible
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
ticket: MTM-61027
version: 10.20.584.0
---

Enabling [time series support](https://cumulocity.com/docs/enterprise-tenant/enhanced-time-series-support/) on the {{< management-tenant >}} is no longer possible to prevent time series from being enabled on subtenants by tenant option inheritance.
