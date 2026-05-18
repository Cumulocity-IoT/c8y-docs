---
date: ''
title: Added support for device routing references in ThingPark Enterprise connections
product_area: Device management & connectivity
change_type:
    - value: change-QHu1GdukP
      label: Feature
component:
    - value: component-TCiiCOknp5
      label: LPWAN
build_artifact:
    - value: tc--fVxjY7du
label: actility-agent
ticket: DM-6019
version: 3.1.4
---
The Actility Agent now supports device routing for both ThingPark Wireless and Enterprise connections.
When registering a device in {{< product-c8y-iot >}} that already exists in ThingPark, the agent automatically updates its routing configuration using routing profiles for Wireless connections and route references for Enterprise connections. 
It also creates the necessary routes in ThingPark if they do not yet exist.
