---
date: "2026-04-21"
title: "Improved deletion of assets in hierarchies"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2713"
version: "1025.1.0"
---
Previously, the deletion of an asset caused cascaded deletion of all
subassets and assigned devices, even if they were still used in a
different asset or hierarchy. This could cause unwanted side effects to
other parts of the asset hierarchy. This behavior has been improved and now only
subassets that are exclusively used in the hierarchy of the asset are
removed. Other subassets will remain unchanged, and the whole hierarchy will
stay intact.

Furthermore, a new query parameter `deleteDevices` has been added to control
the deletion of assigned devices. If set to `true`, all exclusively
assigned devices will be removed. Devices that are still assigned to
other assets, will not be removed. If set to `false`, no devices will be
removed.