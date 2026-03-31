---
date: ""
title: notifications2 tokenAPI fix (graft 2026) (#113)
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--LJtTuzaN
    label: Device Parameter
build_artifact:
  - value: tc-wfTX6sxsr
    label: device-parameter
ticket: DM-5704
version: 1.3.23
---
--- Change Logs Title: Fixed an issue with notifications token refresh in device-parameter microservice Description: Fixed an issue where the microservice would fail to refresh JWT tokens following periods of inactivity, preventing automatic recovery and requiring a manual service restart.