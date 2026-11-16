---
date: '2026-08-05'
title: Create and assign subassets in a single request
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-3027
version: 1025.8.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-05'
  - label: apj.cumulocity.com
    date: '2026-08-05'
  - label: jp.cumulocity.com
    date: '2026-08-05'
  - label: us.cumulocity.com
    date: '2026-07-29'
  - label: cumulocity.com
    date: '2026-07-29'
---
The Asset API previously required separate requests to create a
subasset and then assign it to a parent asset. You can now create and
assign a subasset in a single operation by providing the complete
subasset representation during assignment, streamlining your asset
management workflows.

This change reduces the number of API calls required for subasset
operations, improving performance and simplifying integration logic.
Existing code that uses separate create and assign operations continues
to work without modification, so you can adopt this new capability at
your own pace.
