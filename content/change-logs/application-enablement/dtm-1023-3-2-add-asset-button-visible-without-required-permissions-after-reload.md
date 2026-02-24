---
date: 2026-03-31
title: Add Asset button only visible with required permissions after reload
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: ''
version: 1023.3.2
---
Previously, after reloading the homepage, the **Add asset** button was also displayed if the user lacked the required permissions. This issue has been resolved. The **Add asset** button is now only shown if the user has the appropriate permissions, both on initial load and after reload.