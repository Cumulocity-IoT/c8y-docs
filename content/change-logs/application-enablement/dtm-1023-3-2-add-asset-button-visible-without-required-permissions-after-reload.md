---
date: '2026-01-13'
title: Add Asset button only visible with required permissions after reload
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
ticket: ''
version: 1023.3.2
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
    date: '2026-02-04'
  - label: jp.cumulocity.com
    date: '2026-02-04'
  - label: emea.cumulocity.com
    date: '2026-02-09'
  - label: us.cumulocity.com
    date: '2026-02-09'
---
Previously, after reloading the Home page, the **Add asset** button was also displayed if the user lacked the required permissions. This issue has been resolved. The **Add asset** button is now only shown if the user has the appropriate permissions, both on initial load and after reload.
