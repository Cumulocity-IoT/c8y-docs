---
date: '2025-05-15'
title: Updated subassets and asset tree routes to avoid context issues in DTM
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
The subassets and asset tree contexts have been changed from `/asset/:id` to `/group/:id` to align with the Digital Twin Manager´s registered context. The previous `asset/:id` context was not recognized globally, leading to issues such as broken tab switching, especially when external plugins were integrated. Switching to the `group/:id` context ensures reliable routing, consistent context handling, and seamless plugin compatibility across the platform.
