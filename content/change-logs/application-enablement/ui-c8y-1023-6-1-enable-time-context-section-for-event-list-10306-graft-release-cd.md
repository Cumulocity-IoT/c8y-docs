---
date: '2025-12-09'
title: Enabled global time context section for Event list widget
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
ticket: MTM-65196
version: 1023.6.1
---
The Event List widget configuration was missing the global time context section, preventing users from configuring time range, auto-refresh, and other global context settings in the widget configuration panel. With this change, the time context section has been added to the Event List widget. Users can now access and configure all time context options directly within the widget configuration panel.
