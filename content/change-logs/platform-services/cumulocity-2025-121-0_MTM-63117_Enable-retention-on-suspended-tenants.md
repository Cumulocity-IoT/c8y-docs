---
date: '2025-04-24'
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The retention scheduler has been updated to execute retention rules for tenants with the status SUSPENDED in addition to active tenants. This makes sure that data cleanup and storage rules still apply, even if a tenant is not currently active.
