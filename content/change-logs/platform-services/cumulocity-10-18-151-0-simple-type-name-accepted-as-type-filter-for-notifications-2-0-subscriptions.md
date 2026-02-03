---
date: 2023-12-06
title: Simple type name accepted as type filter for Notifications 2.0 subscriptions
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-53848
version: 10.18.151.0
---
Fixed a regression where a simple type name was not accepted as a type filter when creating a Notifications 2.0 subscription. For backwards compatibility with older releases, if the type filter value cannot be parsed as an OData expression, it is now assumed to be a simple type name.
