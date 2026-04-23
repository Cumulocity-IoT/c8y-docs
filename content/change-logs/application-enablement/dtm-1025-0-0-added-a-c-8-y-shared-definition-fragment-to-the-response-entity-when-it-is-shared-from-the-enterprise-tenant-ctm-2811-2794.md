---
date: '2026-04-09'
title: >-
  c8y_SharedDefinition fragment added when a definition is shared from the
  Enterprise tenant
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2811
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
the fragment `c8y_SharedDefinition` is added to the response entity to
indicate this to the caller.
