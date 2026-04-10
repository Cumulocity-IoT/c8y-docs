---
date: ""
title: "Treat device groups as assets and add includeGroups query parameter. [CTM-2772] (#2783)"
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
ticket: "CTM-2772"
version: "1025.0.0"
---
The Asset API has been changed to treat groups as assets. Previously, an
asset was identified solely by the presence of the `c8y_IsAsset
fragment`. Now, the presence of `c8y_IsDeviceGroup` is also sufficient
to classify an entity as an asset.

A new query parameter `includeGroups` (default: `false`) has been
introduced for the `/assets` and `/assets/count` endpoints:

- When true, the results include entities with either `c8y_IsAsset` or
`c8y_IsDeviceGroup`.
- When false, the results are limited to entities with `c8y_IsAsset` only.