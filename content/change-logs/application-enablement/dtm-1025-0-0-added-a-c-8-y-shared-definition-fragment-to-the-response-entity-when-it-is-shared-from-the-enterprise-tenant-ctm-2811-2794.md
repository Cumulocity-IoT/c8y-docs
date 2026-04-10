---
date: ""
title: "When a definition is shared from the enterprise tenant, the c8y_SharedDefinition fragment is added [CTM-2811]"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2811"
version: "1025.0.0"
---
When the sharing mode is enabled, all definitions are shared from the
{{< enterprise-tenant >}}. When a definition is requested from a subtenant,
the fragment `c8y_SharedDefinition` is added to the response entity to
indicate this to the caller.
