---
date: ""
title: "Prevent deletion of Default Generic Asset model during bulk deletion"
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
ticket: "CTM-2726"
version: "1024.2.0"
---
Previously, users could delete the default generic asset model when
using bulk delete. Since this model is default and is required, it
shouldn't be deleted. This update ensures the default generic asset
model cannot be deleted during bulk deletion.