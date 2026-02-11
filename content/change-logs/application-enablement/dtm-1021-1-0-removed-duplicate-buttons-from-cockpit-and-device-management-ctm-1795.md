---
date: '2025-02-27'
title: Asset properties widget plugin no longer causes duplicate navigation elements
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
ticket: 'CTM-1782,CTM-1795'
version: 1021.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Fixed a user interface issue where navigation elements appeared twice after installing the "Asset properties" widget plugin. This issue caused duplicate menu items, such as **Add dashboard** in the Cockpit application and **Home** in the Device Management application. The fix ensures navigation elements appear only once, improving the user interface clarity and navigation experience.
