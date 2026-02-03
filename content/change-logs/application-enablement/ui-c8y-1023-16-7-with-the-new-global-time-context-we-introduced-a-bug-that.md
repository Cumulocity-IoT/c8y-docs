---
date: '2026-01-07'
title: Filtering for types works correctly in the Event list widget
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
ticket: MTM-65606
version: 1023.16.7
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
With the introduction of the new global time context, the filtering for types was not correctly applied to the "Event list" widget. This resulted in the "Event list" widget displaying all event types, regardless of the filter settings. The fix ensures that the type filter is now correctly applied again, so that only the selected event types are shown in the event list widget when a filter is active.
