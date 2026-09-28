---
date: '2024-12-12'
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

Enabling [time series support](https://cumulocity.com/docs/standard-tenant/enhanced-time-series-support/) on the {{< management-tenant >}} is no longer possible to prevent time series from being enabled on subtenants by tenant option inheritance.
