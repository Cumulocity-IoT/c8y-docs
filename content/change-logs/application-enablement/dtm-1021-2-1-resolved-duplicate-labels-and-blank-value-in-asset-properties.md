---
date: ""
title: "Resolved issue with complex property updates causing duplicate labels and empty values"
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
ticket: "CTM-1899"
version: "1021.2.1"
---
Two issues related to complex properties have been fixed:
- Complex properties containing file-type fields now retain their values during updates instead of being cleared.
- Date fields within complex properties no longer show duplicate labels when creating or editing assets