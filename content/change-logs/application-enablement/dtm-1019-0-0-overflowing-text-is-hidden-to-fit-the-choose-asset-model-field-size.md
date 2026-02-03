---
date: 2023-12-14
title: Overflowing text is hidden to fit the Choose Asset model field size
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-745
version: 1019.0.0
---
Lengthier asset model names in  **Choose Asset model** dropdown field are now truncated to fit to the field size. Hovering over the respective option shows the complete text.