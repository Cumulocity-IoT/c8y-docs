---
date: '2026-04-09'
title: >-
  AvailableActions fragment indicates the read-only status for definitions
  shared from an Enterprise tenant
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2809
version: 1025.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-14'
  - label: apj.cumulocity.com
    date: '2026-04-22'
  - label: jp.cumulocity.com
    date: '2026-04-22'
---
When the sharing mode is enabled, all definitions are shared from the
{{< enterprise-tenant >}}. When a definition is requested from a subtenant,
it is read-only. Therefore all actions in the `AvailableActions`
fragment must be set to false to indicate that they cannot be altered or
deleted.
