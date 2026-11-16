---
date: '2026-08-25'
title: Icon selector now supports custom SVG icons and per-asset selection
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
ticket: CTM-2989
version: 1025.10.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-25'
  - label: apj.cumulocity.com
    date: '2026-08-26'
  - label: jp.cumulocity.com
    date: '2026-08-26'
  - label: us.cumulocity.com
    date: '2026-08-27'
  - label: cumulocity.com
    date: '2026-08-27'
---
The icon selector now supports custom SVG icons, allowing users to upload their own icons in addition to the built-in collections.

Icons can be configured at the asset definition level and inherited by its assets, or overridden for an individual asset from the subassets view.

When an asset is displayed, the icon is resolved in the following order:

1. Asset icon – used when an icon is configured directly on the asset.
2. Asset definition icon – used when no asset-level icon is configured.
3. Default icon – used when neither is configured.

The resolved icon is applied consistently wherever the asset is displayed across applications and dashboards.
