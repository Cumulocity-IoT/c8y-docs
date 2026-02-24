---
date: 2026-03-31
title: Added an alert when required plugins are not installed
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
ticket: CTM-1603
version: 1021.2.1
---
Previously, when logging into the Digital Twin Manager application, if required plugins were not installed, certain functionality failed without notifying the user. This lack of feedback made it unclear why certain features were not working.
This issue has now been addressed. An alert is displayed upon visiting the application if any required plugins are missing, ensuring users are informed and aware of the reason behind any functionality failures.
