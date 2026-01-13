---
date: ""
title: Data point graph now renders properly when no data exists.
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
ticket: MTM-65429
version: 1023.14.24
---
Previously, selecting a time range with no measurement data caused the graph widget to render a completely empty area, without any message or placeholder indicating the absence of data. This has been fixed, and the graph now renders properly, providing a consistent display even when no data is available.