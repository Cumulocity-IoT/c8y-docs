---
date: ""
title: "Added permission check when Creating/Updating/Deleting an Asset based on c8y_ExternalAsset & assets.permission.mode"
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
ticket: ""
version: "1023.0.0"
---
The digital twin manager application user will need additional
permissions based on a new tenant option "assets.permission.mode".It
supports 3 different modes: external (default), all and none. The user
always requires the corresponding ROLE_INVENTORY_* permission
irrespective of the mode and the DIGITAL_TWIN_ASSETS permission set.