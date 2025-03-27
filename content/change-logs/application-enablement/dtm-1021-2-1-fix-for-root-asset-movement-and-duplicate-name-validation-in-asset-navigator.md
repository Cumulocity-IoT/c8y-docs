---
date: ""
title: "Added support for moving root assets and duplicate name validation in the asset navigator"
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
In the asset navigator, root-level assets can now be moved under groups created in the Cockpit application. Additionally, validation has been added to prevent moving assets or groups to locations where assets or groups with identical names already exist, ensuring consistency and avoiding naming conflicts.