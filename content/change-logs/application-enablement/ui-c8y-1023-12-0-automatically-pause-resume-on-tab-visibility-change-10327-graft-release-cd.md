---
date: '2025-12-12'
title: Auto-refresh is automatically paused and resumed on tab visibility change
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
ticket: MTM-65227
version: 1023.12.0
---
The global context now pauses auto-refresh updates when the browser tab is hidden, and resumes updates when the browser tab is visible. This optimizes resource usage while ensuring the data is refreshed upon return.
