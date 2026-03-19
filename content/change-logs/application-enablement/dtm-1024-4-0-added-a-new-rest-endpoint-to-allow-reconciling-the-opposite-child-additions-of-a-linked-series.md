---
date: ""
title: "Added a new REST endpoint to allow reconciling the Opposite ChildAdditions of a LinkedSeries"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: ""
version: "1024.4.0"
---
Added a new endpoint in the REST API to reconcile the Opposite
ChildAddition of a LinkedSeries (also known as `MeasurementSourceLink`):
`PUT /assets/{assetId}/linkedSeries/{fragment}/{series}/opposite`.
The endpoint ensures that the device-side `c8y_LinkedSeriesReverseIndex`
managed object accurately reflects the asset-side LinkedSeries source
reference. The optional query parameter `removeMissingSourceId` can be
used to remove the `source.id`, if the linked device no longer exists.
Otherwise, it responds with 422 if the device is not found.