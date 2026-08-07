---
date: '2026-08-05'
title: Asset API now returns parent references for subassets
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-3031
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
The Asset API previously did not include parent references when querying
subassets of an individual asset. The Asset API now returns parent
references when you request subassets using the `withParents=true`
query parameter, eliminating the need for separate requests to build the
full asset structure.
