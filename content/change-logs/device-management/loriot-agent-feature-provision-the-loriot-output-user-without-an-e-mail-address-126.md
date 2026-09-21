---
date: ""
title: A new Loriot output user is created without an e-mail address
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
The Loriot agent used to create its output user with an e-mail address at a domain that was never registered. The user is now created through the device registration flow, which needs no e-mail address, so the account is more secured. Existing tenants are migrated automatically when the agent starts: every Loriot cumulocity output is re-pushed with the new credentials before the previous user is removed, so uplinks keep arriving throughout. No action is required.
