---
date: '2026-09-03'
title: >-
  Asset API now validates that linked series sources cannot have custom
  properties
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
ticket: CTM-3133
version: 1025.11.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-09-03'
---
The Asset API previously allowed custom fragments in the source of a
linked series, which was inconsistent with the documentation and OpenAPI
specification. The API now validates this constraint at runtime to
ensure data consistency and prevent invalid configurations.

When you create or update a linked series, the API rejects any request
that includes custom properties in the source object. Existing linked
series with custom properties in their sources will continue to
function, but when you modify existing sources with custom properties,
those custom properties will be removed.
