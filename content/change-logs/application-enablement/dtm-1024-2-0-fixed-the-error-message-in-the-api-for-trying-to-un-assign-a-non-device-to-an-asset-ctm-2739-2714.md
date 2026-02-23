---
date: ""
title: "Fixed the error message in the API for trying to (un)assign a non-device to an Asset"
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
Previously, there was an inconsistency in the error message of the REST
API when trying to assign or unassign a non-device to/from an Asset.
This has been fixed now.