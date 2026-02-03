---
date: 2023-12-14
title: Rollback on assets import failure or runtime exception
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
ticket: CTM-655
version: 1019.0.0
---
In the event of a failure or a runtime exception during asset import, the system will automatically discard all assets created until the failure.