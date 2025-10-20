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
On typed dashboards like `c8y_Device`, widgets previously displayed resolver errors when accessed by users with limited permissions. The issue occurred because the resolver checked access to the originally configured device before the context device override took place. With this fix, widget configurations on typed dashboards are updated with the current context device, replacing both device and __target in datapoint objects, before resolvers are triggered. This prevents unnecessary permission checks against inaccessible devices, allowing the widgets to display correctly for users with limited permissions.