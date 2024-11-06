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
The AddAssetModule was automatically importing the SubassetsModule, creating an unwanted dependency. This caused the SubassetsModule to remain active even after its plugin was uninstalled from DTM. With this change we have removed the automatic import of SubassetsModule from AddAssetModule.