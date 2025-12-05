---
date: ""
title: "Data Points now require only DTM specific permissions [CTM-2568] (#2464)"
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
ticket: "CTM-2568"
version: "1023.2.0"
---
Previously, Data Points required both inventory and DTM permissions, but
this update removes the inventory-related permissions. Now, Data Points
now rely solely on the DTM permissions needed for its functionality.