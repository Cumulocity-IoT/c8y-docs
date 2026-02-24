---
date: '2026-03-31'
title: Notifications 2.0 SDK 'deleteByFilter' method is deprecated
product_area: Application enablement & solutions
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: QWPx3rFfn
    label: Java SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63058
version: 2025.45.0
---

The Notifications 2.0 SDK `deleteByFilter()` method takes a `NotificationSubscriptionFilter` parameter that specifies which subscriptions should be deleted.
Previously, it was possible to create a filter that would result in more subscriptions being deleted than was intended.

To resolve this issue, extra safeguards have been added to reject filters that should not be processed by the underlying platform API.
In addition, the `deleteByFilter()` method has been deprecated and clients should use the existing `delete()`, `deleteById()` and `deleteBySource()` methods instead.
