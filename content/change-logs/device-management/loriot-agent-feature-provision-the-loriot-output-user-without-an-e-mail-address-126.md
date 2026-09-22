---
date: ""
title: New Loriot output user now created without an email address
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-TCiiCOknp5
    label: LPWAN
build_artifact:
  - value: tc-ycWx1InI9
    label: loriot-agent
ticket: DM-6988
version: 
---
The Loriot agent used to create its output user with an email address at a domain that was never registered. The user is now created through the device registration flow, which doesn´t need an email address, so that the account is more secure. Existing tenants are migrated automatically when the agent starts: Every Loriot {{< product-c8y-iot >}} output is re-pushed with the new credentials before the previous user is removed, so uplinks keep arriving throughout. No action is required.
