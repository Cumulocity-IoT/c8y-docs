---
date: '2025-05-15'
title: Improved subassets handling with multiple tabs in DTM plugins
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, integrating the subassets plugin from Digital Twin Manager with other tab-based plugins led to errors during tab switching. This issue has been resolved. The path to access subassets has been changed from `/asset/:id/subassets` to `/group/:id/subassets`. 
