---
date: '2026-09-03'
title: Retrieve asset definitions for multiple assets with a single REST API call
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
ticket: CTM-3149
version: 1025.11.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-09-03'
  - label: apj.cumulocity.com
    date: '2026-09-04'
  - label: jp.cumulocity.com
    date: '2026-09-04'
---
Previously, retrieving the corresponding asset definitions for a set of
assets required a separate REST API call after collecting all `type`s of
those assets. Furthermore you needed the `INVENTORY_READ` permission to
access the endpoint `/assets/definitions`. A new REST API endpoint GET
`/definitions/assets/resolve` now allows you to retrieve asset
definitions for a given list of asset IDs in a single request, reducing
the number of API calls and network overhead. The new endpoint also
works with inventory roles, so you no longer need the `INVENTORY_READ`
permission if your role grants access to the specific assets.

The new endpoint accepts multiple asset IDs as input and returns the
corresponding asset definitions in one response. This streamlines
workflows that need to fetch definitions for several assets at once,
improving performance and reducing network overhead for applications and
integrations. You must have permission to read all assets in the list
(either through `INVENTORY_READ` permission or through Inventory Roles),
otherwise an exception is thrown.
