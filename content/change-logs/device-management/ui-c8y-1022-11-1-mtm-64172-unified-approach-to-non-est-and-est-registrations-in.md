---
date: ""
title: [MTM-64172] Unified approach to non-EST and EST registrations in general device registration which fixes issue with assigning devices to groups (#9574) [GRAFT][release/cd] (#9705)
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63966
version: 1022.11.1
---
This change fixes an issue with devices not being assigned to the group selected by user during device registration while using EST (Enrollment over Secure Transport) protocol (by unifying the way how device registrations with and without EST protocol are handled internally).