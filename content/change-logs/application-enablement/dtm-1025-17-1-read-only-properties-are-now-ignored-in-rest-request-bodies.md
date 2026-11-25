---
date: '2026-11-23'
title: Read-only properties are now ignored in REST request bodies
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
ticket: CTM-3338
version: 1025.17.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-23'
  - label: apj.cumulocity.com
    date: '2026-11-24'
  - label: jp.cumulocity.com
    date: '2026-11-24'
  - label: us.cumulocity.com
    date: '2026-11-25'
  - label: cumulocity.com
    date: '2026-11-25'
---
Previously, the Asset API accepted read-only properties like `id`, `creationTime`, and `lastUpdated` in request bodies, even though these properties were documented as read-only in the API specification. This caused unnecessary processing overhead and created inconsistency between the documented API contract and actual runtime behavior. The Asset API now ignores these properties when received in requests while continuing to include them in responses, aligning the implementation with the specification.

If your applications currently send read-only properties when creating or updating assets, your requests continue to work without modification. The fields are silently ignored rather than processed, which eliminates the performance overhead. Your existing installations and applications are not affected by this change, as it only prevents unnecessary processing of malformed requests.
