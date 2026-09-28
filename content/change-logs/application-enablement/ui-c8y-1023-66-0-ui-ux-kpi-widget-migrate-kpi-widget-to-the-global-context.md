---
date: '2026-04-13'
title: KPI widget now supports global context and history mode
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66258
version: 1023.66.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-13'
  - label: apj.cumulocity.com
    date: '2026-04-14'
  - label: jp.cumulocity.com
    date: '2026-04-14'
  - label: emea.cumulocity.com
    date: '2026-04-15'
  - label: us.cumulocity.com
    date: '2026-04-15'
  - label: cumulocity.com
    date: '2026-04-15'
---
Previously, the KPI widget configuration lacked a global time context section, preventing users from setting a time range, auto-refresh interval, or history mode from the widget configuration panel. With this change, the KPI widget has been migrated to the shared time context, and the time context section has been added to its configuration. Users can now select a time range and auto-refresh interval, and enable history mode to display KPI values over a selected historical date range.
