---
date: '2025-12-11'
title: New Device to Asset plugin to create assets from devices
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
ticket: CTM-2293
version: 1023.2.0
---
A new **Device-to-Asset** plugin is now available in dtm-plugins, providing an easy way to add the c8y_IsAsset fragment to existing devices and explore asset modeling capabilities. Using a guided two-step workflow, users can keep the c8y_IsDevice fragment intact, add the required c8y_IsAsset fragment, optionally assign asset types and parent assets, and immediately integrate devices into the asset hierarchy and modeling already supported for assets created via Digital Twin Manager.

While devices can also be migrated to assets via APIs, this plugin offers a simple UI dialog to create an asset from a device, automatically adding the required information to the device managed object.
