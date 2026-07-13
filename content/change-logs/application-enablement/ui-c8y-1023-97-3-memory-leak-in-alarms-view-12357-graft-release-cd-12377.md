---
date: '2026-07-13'
title: Memory leak in alarms view fixed
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
ticket: MTM-67019
version: 1023.97.3
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-07-13'
  - label: apj.cumulocity.com
    date: '2026-07-13'
  - label: jp.cumulocity.com
    date: '2026-07-13'
  - label: us.cumulocity.com
    date: '2026-07-10'
  - label: cumulocity.com
    date: '2026-07-10'
---
The alarms view was consuming increasing amounts of memory over time due to event listeners and subscriptions not being properly cleaned up when the view was closed or navigated away from. This memory leak could cause performance degradation and eventual application slowdown, especially for users who frequently accessed the alarms view. The underlying cause has been fixed by ensuring all event listeners and subscriptions are properly removed when the alarms view is destroyed. Users will now experience consistent performance when using the alarms view repeatedly without memory accumulation over time.
