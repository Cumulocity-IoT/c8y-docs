---
date: 2025-12-18
title: Global Time Context - Shared time context for dashboard widgets
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
ticket: MTM-62269
version: 1023.0.0
---

Widgets on a dashboard can now share time context. A global panel controls time range, auto-refresh, and aggregation for linked widgets. Each widget applies the settings it supports. Individual widgets can be unlinked for independent control.

Two modes are available: Live mode for rolling time windows with auto-refresh, and History mode for fixed date ranges with aggregation.

**Breaking change:** Custom widgets using the old Global Context API must migrate to the new components to maintain time context functionality.
