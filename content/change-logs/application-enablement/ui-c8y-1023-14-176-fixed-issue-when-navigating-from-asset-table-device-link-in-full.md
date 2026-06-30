---
date: 2026-06-30
title: Fixed navigation issue when using device links from an asset table in full-screen mode
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66941
version: 1023.14.176
---
When users clicked a device link in the asset table while in full-screen mode and then navigated to another dashboard, the view was sometimes empty, causing unexpected behavior. This issue has been fixed so that users, when in full-screen mode, can now seamlessly navigate from a device link in the asset table to another dashboard without any issues.