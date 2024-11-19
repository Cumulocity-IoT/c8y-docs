---
date: '2024-10-24'
title: Removed unintended SubassetsModule import from AddAssetModule
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-1597
version: 1.2.0
---
The `AddAssetModule` automatically imported the `SubassetsModule`, creating an unwanted dependency. This caused the `SubassetsModule` to remain active even after its plugin was uninstalled from DTM. With this change the automatic import of the `SubassetsModule`has been removed from the `AddAssetModule`.
