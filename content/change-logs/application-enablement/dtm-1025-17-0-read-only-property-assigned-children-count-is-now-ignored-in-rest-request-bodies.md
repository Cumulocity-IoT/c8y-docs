---
date: ""
title: "Read-only property assignedChildrenCount is now ignored in REST request bodies"
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
ticket: "CTM-3339"
version: "1025.17.0"
---
The `assignedChildrenCount` property on assets was documented as
read-only in the API specification but was still accepted from request
bodies at runtime, potentially causing performance issues. The Asset API
now ignores this property when received in requests while continuing to
include it in responses, aligning runtime behavior with the documented
API contract.

If your applications currently send the `assignedChildrenCount` field
when creating or updating assets, your requests continue to work without
modification. The field is silently ignored rather than processed, which
prevents unnecessary performance overhead. Your existing installations
and applications are not affected by this change, as it only prevents
the malformed requests from impacting system performance.