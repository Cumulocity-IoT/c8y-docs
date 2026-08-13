---
date: ""
title: "Delete asset modal now displays an info message for managed objects without a device, asset, or device group classification."
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
ticket: "CTM-3085"
version: "1025.9.0"
---
Fixed an issue where deleting certain items from the sub-assets list
opened an empty confirmation dialog that showed only the title and the
action buttons. It now displays an info message for managed objects that
have no device, asset, or device group classification, explaining that
only the selected object will be deleted.