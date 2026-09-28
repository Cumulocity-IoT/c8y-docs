---
date: '2026-02-05'
title: Dropdowns now appear on top of other content as expected
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
ticket: MTM-65613
version: 1023.22.14
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-05'
  - label: apj.cumulocity.com
    date: '2026-02-05'
  - label: jp.cumulocity.com
    date: '2026-02-05'
  - label: emea.cumulocity.com
    date: '2026-02-05'
  - label: us.cumulocity.com
    date: '2026-02-05'
  - label: cumulocity.com
    date: '2026-02-05'
---
Dropdowns that were configured to be attached to the body element were appearing behind other page elements due to incorrect z-index layering. This has been fixed so that dropdowns now display with the correct stacking order and appear on top of other content as expected, ensuring they are always visible and interactive when opened.
