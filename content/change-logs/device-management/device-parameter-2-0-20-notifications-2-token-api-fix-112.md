---
date: ""
title: Fixed an issue with notifications token refresh in device-parameter microservice
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
Fixed an issue where the microservice would fail to refresh JWT tokens following periods of inactivity, preventing automatic recovery and requiring a manual service restart.
