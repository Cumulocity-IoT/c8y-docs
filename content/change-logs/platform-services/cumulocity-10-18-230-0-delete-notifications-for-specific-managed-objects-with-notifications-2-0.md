---
date: 2023-12-06
title: DELETE notifications for specific managed objects with Notifications 2.0
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
ticket: MTM-54097
version: 10.18.230.0
---
DELETE notifications for Notifications 2.0 subscriptions to specific managed objects - that is, subscriptions to the <code>managedObjects</code> API in the <code>mo</code> context - are now always sent. Previously, these notifications were not reliably sent in all cases.
