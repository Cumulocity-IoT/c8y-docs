---
date: '2025-12-11'
title: Enabled fine-grained permissions for managing assets
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2525
version: 1023.0.0
---
The Digital Twin Manager now supports fine-grained permission control for managing assets by introducing a new tenant option `assets.permission.mode`.  
This tenant option supports three modes:
- external (Default): Digital twin assets permissions are only enforced for assets marked with the **c8y_ExternalAsset** key. Users require the Digital twin assets UPDATE or ADMIN permission to modify or delete these assets.
- all: Digital twin assets permissions are strictly required for all assets. Users must possess the Digital twin assets CREATE permission for creation, the UPDATE permission for modification, and the ADMIN permission for full management (create, update, or delete) of any asset.
-none: Digital twin assets permissions are not applicable to any assets. Asset control defaults to standard Inventory permissions.
