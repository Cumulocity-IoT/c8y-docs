---
date: ""
title: "Asset API now returns parent references for sub-assets"
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
ticket: "CTM-3031"
version: "1025.8.0"
---
The Asset API previously did not include parent references when querying
sub-assets of an individual asset. The Asset API now returns parent
references when you request sub-assets using the `withParents=true`
query parameter, eliminating the need for separate requests to build the
full asset structure.