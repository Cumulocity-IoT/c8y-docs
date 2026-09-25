---
date: ""
title: Hardened output user registration for Loriot uplinks
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
The Loriot agent now registers its output user through the platform's device registration flow, hardening how that account is provisioned. Existing tenants are migrated automatically when the agent starts: Every Loriot {{< product-c8y-iot >}} output is re-pushed with the new credentials before the previous user is removed, so uplinks keep arriving throughout. No action is required.
