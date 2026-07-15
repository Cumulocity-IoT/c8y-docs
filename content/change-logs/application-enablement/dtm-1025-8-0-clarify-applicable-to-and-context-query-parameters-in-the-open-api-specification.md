---
date: ""
title: "Clarify applicableTo and context query parameters in the OpenAPI specification"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3043"
version: "1025.8.0"
---
The OpenAPI documentation for the Asset API now provides clearer
guidance on how the `applicableTo` and `context` query parameters affect
Property definition selection. Previously, the documentation did not
adequately explain the distinction between context-specific definitions
and definitions without context, which could lead to confusion when
querying properties.

The updated documentation now clearly describes how these parameters
work together to filter and select the appropriate Property Definitions
based on context criteria. This helps developers understand the expected
behavior when using these query parameters in their applications and
ensures they can correctly configure property definitions for their
specific use cases.