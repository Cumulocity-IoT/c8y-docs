---
date: 
title: lastUpdated fragment of a group is updated correctly when a device is added upon registration
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-55525
version: 10.20.559.0
---
Each device registration request includes information on the group that the device will be assigned to once the registration is successful.
Previously, the group's "lastUpdated" fragment was not updated correctly. With this change, the "lastUpdated" fragment is updated to show the current date when the new device has been added successfully.