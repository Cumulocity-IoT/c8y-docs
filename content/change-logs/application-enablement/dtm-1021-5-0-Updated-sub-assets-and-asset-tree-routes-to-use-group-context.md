---
date: ''
title: Updated sub-assets and asset tree routes to use '/group/:id' context
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-1997
version: 1021.4.0
---
Refactored route paths from /asset/:id to /group/:id for subassets and related tabs to align with DTM’s registered context. The previous asset/:id context was not recognized globally, leading to issues such as action dispatch errors and broken tab switching—especially when external plugins were integrated. Switching to the existing group/:id context ensures reliable routing, consistent context handling, and seamless plugin compatibility across the platform.
