---
date: ""
title: "New endpoint to get direct subassets for an asset identified by its external ID"
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
ticket: "CTM-2900"
version: "1025.4.0"
---
The Dtm microservice now includes a new endpoint
`/assets/externalIds/{externalId}/subAssets` that allows you to fetch
direct subassets using an asset's external ID. Previously, you could
only retrieve subassets by using the asset's ID, which required an
additional lookup step if you were working with external identifiers.
This new endpoint streamlines workflows by enabling direct queries based
on external IDs, eliminating the need for intermediate ID resolution.

With this addition, applications and integrations that manage assets
through external identifiers can now access subasset hierarchies more
efficiently. Your existing code using internal IDs continues to work
without changes, and you can adopt the new endpoint at your own pace to
improve performance and reduce complexity in asset management
operations.