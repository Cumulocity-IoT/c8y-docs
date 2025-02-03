---
date: ""
title: Improved performance when setting geofence on smart rule for large device groups
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
ticket: MTM-62001
version: 1021.22.27
---
Previously, setting a geofence on a smart rule for a group with many devices was slow and cumbersome, impacting the user experience. With this change, the performance has been significantly improved, making the process faster and more responsive. Users can now set geofences on smart rules for large device groups without experiencing delays or unwieldy behavior.