---
date: ""
title: Fixed memory leaks when navigating between views
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
version: 1023.97.6
---
Dashboard and widget DOM, subscriptions, and legacy scopes were retained after navigating away from a view, causing memory usage to grow until a full page reload. They are now released on navigation.