---
date: 2026-03-31
title: Fixed legacy Data point widget integration with global context
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
ticket: MTM-65715
version: 1023.14.83
---
Previously, the legacy "Data point" widget did not correctly respond to global context changes when live mode was enabled, causing the time range not to update properly. With this change, the widget now correctly reflects time range and mode changes from the global context.