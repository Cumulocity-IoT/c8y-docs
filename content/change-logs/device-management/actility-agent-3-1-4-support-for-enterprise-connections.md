---
date: 2026-05-15
title: Fix routing issues for pre-existing Actility ThingPark Enterprise devices
product_area: Device management & connectivity
change_type:
    - value: change-VSkj2iV9m
      label: Fix
component:
    - value: component-TCiiCOknp5
      label: LPWAN
build_artifact:
    - value: tc--fVxjY7du
label: actility-agent
ticket: DM-6019
version: 3.1.4
---
The Actility agent now supports device routing for both ThingPark Wireless and Enterprise connections.
When registering a device in {{< product-c8y-iot >}} that already exists in the connected ThingPark Enterprise account, the agent automatically updates device's routing configuration in ThingPark to include the new route if it does not yet exist and preserve any previously assigned routes.
