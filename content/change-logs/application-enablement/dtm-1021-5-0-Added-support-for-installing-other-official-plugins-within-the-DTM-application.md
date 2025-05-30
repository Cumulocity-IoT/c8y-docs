---
date: ''
title: Added support for installing other official plugins within the DTM application
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
Previously, integrating Subassets with other tab-based plugins led to action-related errors during tab switching. This has been resolved. Path to access subassets is now changed from /asset/:id/subassets to /group/:id/subassets
