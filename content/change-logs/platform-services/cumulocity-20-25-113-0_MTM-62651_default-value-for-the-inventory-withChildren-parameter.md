---
date: 
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
version: 2025.113.0
---

The default value of the `withChildren` parameter for the `GET /inventory/managedObjects` endpoint has changed from `true` to `false`. To continue receiving child assets, devices, and additions in the response, clients must explicitly include `?withChildren=true` in their requests. This change aligns with previous announcements and aims to improve performance and response clarity. For more details, see the announcement in the 10.18 release notes.
