---
date: "2024-02-06"
title: "Fixed an issue in the realtime API "
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-56910
version: 10.20.18.0
---
Fixed an issue in the realtime API where a subscription marked as "non-retriable" could still be re-subscribed after re-establishing the underlying connection to the server, for example, after a Cumulocity core restart or network outage.
