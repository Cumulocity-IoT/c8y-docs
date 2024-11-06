---
date: ""
title: "Removed unintended SubassetsModule import from AddAssetModule"
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
ticket: "CTM-1597"
version: "1.2.0"
---
The SubassetsModule is imported into the AddAssetModule, making it functional even when its plugin is not installed in the DTM. This unintended behavior occurs because installing the AddAssetModule implicitly includes the SubassetsModule.