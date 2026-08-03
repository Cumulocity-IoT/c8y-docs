---
date: ""
title: "Asset deletion modal displays info message for unclassified managed objects"
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
version: "1025.8.4"
---
When deleting managed objects from the sub-assets list, the confirmation dialog previously showed only the title and action buttons for items without a device, asset, or device group classification. The deletion modal now displays a clear info message explaining that only the selected object will be deleted, providing users with better context before confirming the action.
This change improves the user experience when managing assets by ensuring all deletion confirmations include meaningful information, regardless of the managed object's classification. Users can now make informed decisions about which objects will be affected by the deletion.
