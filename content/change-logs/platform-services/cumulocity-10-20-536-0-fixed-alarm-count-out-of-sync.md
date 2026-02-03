---
date: 2024-09-11
title: Alarms counts in managed objects in sync with alarm counts in the database
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-54655
version: 10.20.536.0
---

The alarm count in managed objects could get out of sync with the actual count of alarms in the database. This issue has been fixed and alarms counts in managed objects are now in sync with alarm counts in the database.