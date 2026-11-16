---
date: '2026-06-17'
title: >-
  New REST endpoint for reconciling the opposite child additions of all linked
  series of an asset
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
ticket: CTM-2695
version: 1025.6.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-06-17'
  - label: apj.cumulocity.com
    date: '2026-06-18'
  - label: jp.cumulocity.com
    date: '2026-06-18'
  - label: us.cumulocity.com
    date: '2026-06-19'
  - label: cumulocity.com
    date: '2026-06-19'
---
When an asset links to a measurement source on a device, the platform
maintains a reverse index (`c8y_LinkedSeriesReverseIndex`) on the device
that tracks which assets reference it. Previously, if this index became
out of sync with the asset-side configuration, there was no dedicated
API endpoint to correct it.

The Digital Twin Manager REST API now includes a new endpoint to
reconcile the opposite `ChildAddition` of all `LinkedSeries` of an asset
(also known as `MeasurementSourceLink`): `PUT
/assets/{assetId}/opposite`. The endpoint updates the
`c8y_LinkedSeriesReverseIndex` managed object on the device sides to
accurately reflect the asset-side source references. The optional query
parameter `removeMissingSourceId` removes the `source.id` if any linked
device no longer exists. If the device is not found and the parameter is
not set, the endpoint returns a 422 error.

Developers and administrators can use this endpoint to programmatically
correct synchronization issues in linked data point configurations
without manual intervention.
