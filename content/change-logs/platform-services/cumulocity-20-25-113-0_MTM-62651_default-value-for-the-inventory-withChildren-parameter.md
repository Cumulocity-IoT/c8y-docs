---
date: '2025-09-18'
title: Inventory API – change of the default value for the withChildren parameter
product_area: Platform services
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-JlFdtOPva
    label: Rest API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62651
version: 2025.303.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

The default value of the `withChildren` parameter for the `GET /inventory/managedObjects` endpoint has changed from `true` to `false`. To continue receiving child assets, devices, and additions in the response, clients must explicitly include `?withChildren=true` in their requests. This change aligns with previous announcements and aims to improve performance and response clarity. This behavior is controlled by the feature toggle `core.inventory.without.children`, which is enabled for all tenants by default. The toggle can be disabled, in which case the previous behavior is restored, where withChildren defaults to true unless explicitly set otherwise.
