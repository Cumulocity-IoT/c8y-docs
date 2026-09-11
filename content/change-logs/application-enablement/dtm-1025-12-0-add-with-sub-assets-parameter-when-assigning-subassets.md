---
date: ""
title: "Add withSubAssets parameter to sub-asset assignment endpoint"
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
ticket: "CTM-3204"
version: "1025.12.0"
---
The sub-asset assignment endpoint now provide a `withSubAssets` query parameter to optimize response handling. Previously, assignment operations always returned the complete sub-asset collection for the parent object, which caused performance issues when parents had large numbers of sub-assets or child devices requiring multiple inventory reads.

With this change, you can now control whether the parent's full sub-asset collection is included in the response by setting the `withSubAssets` parameter. This allows you to skip the costly expansion of the sub-asset collection when you don't need this information, improving performance for assignments on parents with large sub-asset hierarchies.

Existing integrations continue to work without changes, as the parameter is optional and maintains backward-compatible behavior by default. Applications managing assets with extensive sub-asset relationships benefit from faster response times when performing assignments.
