---
date: ""
title: "Improved the error message from the API when trying to (un)assign a non-device to an asset"
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
ticket: "CTM-2739"
version: "1024.2.0"
---
Previously, the error message returned from the RestAPI when attempting to assign or unassign a non-device to an asset was inconsistent. The error message format has been standardized. This fix improves error handling consistency.