---
date: 2024-04-04
title: Modified behavior on creating an external ID without an existing
  associated global ID
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
ticket: MTM-56126
version: 10.20.131.0
---
Previously, when creating an external ID, if the associated global ID did not exist, it would incorrectly create a managed object with the global ID automatically. This has changed - now if the global ID does not exist when creating an external ID, a 404 error will be returned instead of implicitly creating a new managed object. This behavior can be reverted from the {{< management-tenant >}}.
