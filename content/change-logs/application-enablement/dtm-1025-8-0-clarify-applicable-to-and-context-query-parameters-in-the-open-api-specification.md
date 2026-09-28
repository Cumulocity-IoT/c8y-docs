---
date: '2026-08-05'
title: Clarify applicableTo and context query parameters in the OpenAPI specification
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
ticket: CTM-3043
version: 1025.8.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-05'
  - label: apj.cumulocity.com
    date: '2026-08-05'
  - label: jp.cumulocity.com
    date: '2026-08-05'
  - label: us.cumulocity.com
    date: '2026-07-29'
  - label: cumulocity.com
    date: '2026-07-29'
---
The OpenAPI documentation for the Asset API now provides clearer
guidance on how the `applicableTo` and `context` query parameters affect
the property definition selection. Previously, the documentation did not
adequately explain the distinction between context-specific definitions
and definitions without context, which could lead to confusion when
querying properties.

The updated documentation now clearly describes how these parameters
work together to filter and select the appropriate property definitions
based on context criteria. This helps developers understand the expected
behavior when using these query parameters in their applications and
ensures they can correctly configure property definitions for their
specific use cases.
