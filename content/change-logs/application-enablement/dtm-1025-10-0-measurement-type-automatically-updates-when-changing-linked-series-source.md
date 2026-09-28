---
date: '2026-08-25'
title: Measurement type automatically updates when changing linked series source
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
ticket: CTM-3105
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
The `type` field of a linked series source was not updated when you
changed the source device using the `/assets/{assetId}/linkedSeries`
endpoint, even if the `id` changed. This caused the linked series to
reference an outdated measurement type that might not exist on the new
source device.

Now when you update the `id`, `fragment`, or `series` fields of a linked
series source, the API automatically re-fetches and updates the type
field based on the new source device. The update behavior respects your
tenant configuration setting
`assets.linkedSeries.source.measurementType.mode`. This ensures that
linked series always reference valid measurement types from their
current source device, preventing data retrieval failures and
inconsistencies in your asset data.
