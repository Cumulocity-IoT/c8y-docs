---
date: ""
title: Http connection leak fix
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
ticket: DM-5067
version: 2.0.5
---
RestConnector response used without closing - similar to what we've experienced in lwm2m --- ## Change Logs Title: Resolved HTTP Connection Pool Exhaustion Description: Previously, each retrieval of a property definition initiated a new HTTP connection without proper closure, resulting in connection pool exhaustion over time. This update ensures that all HTTP connections are correctly closed after use, preventing resource leaks and improving system stability.