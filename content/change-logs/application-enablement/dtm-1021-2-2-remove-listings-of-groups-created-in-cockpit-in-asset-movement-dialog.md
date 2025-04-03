---
date: ""
title: "Remove listings of groups created in Cockpit in Asset movement dialog"
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
ticket: "CTM-1972"
version: "1021.2.2"
---
Previously, when selecting an asset and clicking **Move Selected**, the dialog listed groups created in both DTM and Cockpit. The fix ensures that only groups created in DTM are shown.