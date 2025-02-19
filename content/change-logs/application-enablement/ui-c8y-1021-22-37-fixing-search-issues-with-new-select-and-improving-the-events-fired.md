---
date: ""
title: Search is no longer triggered on pressing the space key
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
ticket: MTM-62404
version: 1021.22.37
---
Previously, there were some issues with the search functionality when using the new select component. These issues have been fixed. The search is no longer triggered when pressing the space key in the select component, so that spaces can be used in search terms in the usual way.