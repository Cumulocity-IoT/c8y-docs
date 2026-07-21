---
date: '2026-07-20'
title: Support assigning legacy child devices without c8y_IsDevice marker to assets
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
ticket: CTM-2964
version: 1025.8.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-07-20'
---
The Asset API previously rejected child devices that lacked the
`c8y_IsDevice` marker fragment, even if they were already registered as
child devices in the system. The API now validates legacy child devices
by checking the `deviceParents` reference to confirm device status.

This change enables to work with existing child devices that may not
have the `c8y_IsDevice` marker.
