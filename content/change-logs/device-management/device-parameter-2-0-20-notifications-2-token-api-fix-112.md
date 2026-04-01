---
date: ""
title: Fixed failing JWT token refresh in Device Parameter microservice
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
version: 2.0.20
---
The Device Parameter microservice failed to refresh JWT tokens following periods of inactivity, preventing automatic recovery and requiring a manual service restart. This issue has been fixed.
