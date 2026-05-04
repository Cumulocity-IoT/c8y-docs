---
date: ""
title: "Devices can now be assigned to assets with LINKING_UPDATE permission"
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
ticket: "CTM-2854"
version: "1025.3.0"
---
Previously, assigning devices to assets required the ASSETS_ADMIN and
the INVENTORY_UPDATE permission, which was overly restrictive for users
who only needed to manage asset linking and relationships. The Asset API
now allows users with the LINKING_UPDATE permission to assign devices to
assets if the `assets.permission.mode` is set to either `ALL`, or
`EXTERNAL` and the asset is an external Asset. An Asset is considered
external if it has the marker fragment `c8y_ExternalAsset`.