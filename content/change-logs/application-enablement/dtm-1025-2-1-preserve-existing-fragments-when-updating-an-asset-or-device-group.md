---
date: ""
title: "Preserve existing fragments when updating an Asset or DeviceGroup"
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
ticket: "CTM-2789"
version: "1025.2.1"
---
The Digital Twin Manager now correctly preserves the existing fragments
when you update an asset or device group. Previously, updating either
object type would incorrectly add both `c8y_IsAsset` and
`c8y_IsDeviceGroup` fragments regardless of which fragments were
originally present. This caused pure Assets to gain the DeviceGroup
fragment and DeviceGroups to gain the Asset fragment during updates.

The system now inspects the existing managed object's fragments before
applying updates and only preserves the fragments that were already
there. This means updating a pure Asset keeps it as an Asset only, and
updating a DeviceGroup keeps it as a DeviceGroup only. The creation
workflow continues to add both fragments as expected for new objects.