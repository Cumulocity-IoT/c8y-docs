---
date: ""
title: "linked series preserved when sending explicit null value during asset updates"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3175"
version: "1025.12.0"
---
When updating an asset using PUT `/assets/{id}` or upserting using POST
`/assets` with an explicit `"c8y_LinkedSeries": null` value, the Asset
API previously deleted all existing linked series. This behavior
contradicted the documented contract, which specifies that linked series
can only be removed through dedicated DELETE endpoints. The Asset API
now correctly preserves all linked series when you send an explicit null
value, aligning the actual behavior with the documented API contract.

This fix ensures your existing linked series relationships remain intact
during asset updates, even when you explicitly pass null values in the
request payload. Applications and integrations that perform bulk asset
updates no longer risk unintended data loss of linked series
associations.