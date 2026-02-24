---
date: '2026-03-31'
title: Enforced fixed 5-second auto-refresh interval for dashboards
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
ticket: MTM-65229
version: 1023.9.0
---
Previously, users could set different refresh intervals for dashboards. This led to inconsistent behavior across dashboards. To avoid this, the live mode now enforces a fixed refresh interval of 5 seconds or real-time updates, depending on the widget type. This improves the user experience as the dashboard refresh behavior is now consistent and predictable, with each widget refreshing either after 5 seconds or in real time based on its type.
