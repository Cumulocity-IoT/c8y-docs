---
date: ""
title: "Query parameter withSubAssets deprecated in favor of dedicated endpoint"
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
ticket: "CTM-2796"
version: "1025.3.0"
---
The `withSubAssets` query parameter has been deprecated to simplify the
API and provide a more focused approach to retrieving subasset data.
Previously, you could append `withSubAssets=true` to asset queries to
include subasset information in the response. The system now provides a
dedicated `/assets/{id}/subAssets` endpoint that explicitly retrieves
subassets for a specific asset, offering clearer intent and better
performance. Furthermore new endpoints `/assets/subAssets` and
`/assets/externalId/{externalId}/subAssets` will be introduced soon.

Existing applications using the `withSubAssets` parameter will continue
to function, but you should migrate to the dedicated endpoints to align
with current API standards. Update your requests to use the
`/assets/{id}/subAssets` endpoint instead of relying on the deprecated
query parameter to ensure long-term compatibility with future versions.
After a grace period the `withSubAssets` parameter will be removed in
the future.