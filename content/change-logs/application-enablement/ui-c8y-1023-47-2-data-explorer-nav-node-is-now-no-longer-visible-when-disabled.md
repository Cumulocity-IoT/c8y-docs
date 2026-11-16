---
date: '2026-02-25'
title: Data explorer navigation item is no longer visible when disabled
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66097
version: 1023.47.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-25'
  - label: apj.cumulocity.com
    date: '2026-02-24'
  - label: jp.cumulocity.com
    date: '2026-02-24'
  - label: emea.cumulocity.com
    date: '2026-02-25'
  - label: us.cumulocity.com
    date: '2026-02-25'
  - label: cumulocity.com
    date: '2026-02-25'
---
The data explorer navigation item was previously visible in the navigator even when it was disabled via the Cockpit configuration, which could confuse users who expected disabled items to be hidden. The data explorer navigation item is now properly hidden from the navigator when it is disabled, ensuring that only enabled navigation items are displayed to users.
