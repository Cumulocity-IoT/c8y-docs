---
date: ""
title: "Create and assign sub-assets in a single request"
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
ticket: "CTM-3027"
version: "1025.8.0"
---
The Asset API previously required separate requests to create a
sub-asset and then assign it to a parent asset. You can now create and
assign a sub-asset in a single operation by providing the complete
sub-asset representation during assignment, streamlining your asset
management workflows.

This change reduces the number of API calls required for sub-asset
operations, improving performance and simplifying integration logic.
Existing code that uses separate create and assign operations continues
to work without modification, so you can adopt this new capability at
your own pace.