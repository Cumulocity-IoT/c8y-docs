---
date: ""
title: "Restrict adding groups under an asset in Subassets page [CTM-2269]"
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
ticket: "CTM-2269"
version: "1022.1.0"
---
Previously, the "Add Group" button in the shell application (Cockpit, DM) appeared on the Sub-assets page for assets, allowing groups to be added under them incorrectly. It now appears only for groups.