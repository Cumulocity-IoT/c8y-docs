---
date: '2026-04-09'
title: >-
  Asset API now handles device groups as assets and offers the includeGroups
  query parameter
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
ticket: CTM-2772
version: 1025.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-14'
  - label: apj.cumulocity.com
    date: '2026-04-22'
  - label: jp.cumulocity.com
    date: '2026-04-22'
  - label: emea.cumulocity.com
    date: '2026-04-23'
  - label: us.cumulocity.com
    date: '2026-04-23'
  - label: cumulocity.com
    date: '2026-04-23'
---
The Asset API has been changed to treat groups as assets. Previously, an
asset was identified solely by the presence of the `c8y_IsAsset` fragment. 
Now, the presence of `c8y_IsDeviceGroup` is also sufficient
to classify an entity as an asset.

A new query parameter `includeGroups` (default: `false`) has been
introduced for the `/assets` and `/assets/count` endpoints:

- When set to true, the results include entities with either `c8y_IsAsset` or
`c8y_IsDeviceGroup`.
- When set to false, the results are limited to entities with `c8y_IsAsset` only.
