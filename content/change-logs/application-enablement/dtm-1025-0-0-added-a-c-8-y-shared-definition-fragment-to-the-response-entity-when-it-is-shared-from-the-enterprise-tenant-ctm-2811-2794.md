---
date: ""
title: "Added a c8y_SharedDefinition fragment to the response entity when it is shared from the enterprise tenant [CTM-2811] (#2794)"
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
When the SharingMode is enabled, all definitions are shared from the
enterprise tenant. When such a definition is requested from a subtenant,
the fragment `c8y_SharedDefinition` is added to the response entity to
indicate this to the caller.