---
date: ""
title: enforce fixed 5-second auto-refresh interval for dashboards
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
Context: Previously, live mode allowed users to set different refresh intervals, which led to inconsistent behavior across dashboards. Change: Based on initial feedback, live mode now enforces a fixed refresh interval of 5 seconds or realtime updates, depending on the widget type. Impact: Dashboard refresh behavior is now consistent and predictable, with each widget refreshing at either 5 seconds or realtime based on its type.