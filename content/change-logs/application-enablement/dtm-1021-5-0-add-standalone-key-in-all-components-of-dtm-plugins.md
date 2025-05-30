---
date: ""
title: "Add standalone key in all components of Dtm-plugins"
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
ticket: "CTM-2143"
version: "1021.5.0"
---
The forthcoming breaking change in Cumulocity UI has revealed a potential incompatibility with external plugins that use Angular modules. We are therefore advised to add standalone key to all the existing DTM-plugins components.