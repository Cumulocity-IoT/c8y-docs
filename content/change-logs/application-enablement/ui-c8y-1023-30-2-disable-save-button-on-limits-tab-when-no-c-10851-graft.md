---
date: '2026-02-11'
title: Save button on Limits tab only enabled when changes have been made
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
ticket: MTM-62148
version: 1023.30.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-11'
  - label: apj.cumulocity.com
    date: '2026-02-12'
  - label: jp.cumulocity.com
    date: '2026-02-12'
  - label: emea.cumulocity.com
    date: '2026-02-13'
  - label: us.cumulocity.com
    date: '2026-02-13'
  - label: cumulocity.com
    date: '2026-02-13'
---
The **Save** button on the **Limits** tab in the tenant details was enabled even when no changes were made. It is now disabled until the user modifies a value, preventing accidental saving of unchanged data.
