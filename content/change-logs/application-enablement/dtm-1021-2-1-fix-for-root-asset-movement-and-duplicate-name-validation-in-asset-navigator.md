---
date: ""
title: "Fix for root asset movement and duplicate name validation in Asset Navigator"
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
ticket: "CTM-1938"
version: "1021.2.1"
---
Previously, root-level assets could not be moved under groups created in Cockpit. This has been resolved, allowing such movements. Additionally, validation has been introduced to prevent moving assets or groups into a location where an asset or group with the same name already exists, ensuring consistency and avoiding naming conflicts.