---
date: ""
title: Fix widget resolver errors on typed dashboards for users with limited permissions
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64730
version: 1022.44.6
---
Fixed an issue where widgets on typed dashboards (e.g., c8y_Device) would display resolver errors when users with limited permissions accessed the dashboard. The resolver was checking access to the original device configured in the widget before the context device override could occur. The fix ensures that for typed dashboards, widget configs are updated with the current context device (replacing both device and __target in datapoint objects) before resolvers are triggered, preventing unnecessary permission checks against inaccessible devices.