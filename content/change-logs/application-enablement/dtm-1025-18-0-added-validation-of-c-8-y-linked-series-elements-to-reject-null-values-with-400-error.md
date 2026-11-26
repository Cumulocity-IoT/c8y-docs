---
date: ""
title: "Added validation of c8y_LinkedSeries elements to reject null values with 400 error"
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
ticket: "CTM-3353"
version: "1025.18.0"
---
Previously, null elements in `c8y_LinkedSeries` (such as `[null]`)
passed initial validation but caused a `NullPointerException` later,
which resulted in a 500 internal server error for clients. The Asset API
now validates `c8y_LinkedSeries` elements during create, upsert, and
update operations to catch null values early.

With this change, the Asset API rejects requests containing null
elements in `c8y_LinkedSeries` with a 400 bad request response and the
message "Linked Series must not contain null elements." This provides
clearer feedback about the invalid input and prevents unexpected server
errors.

Clients sending requests with null elements in `c8y_LinkedSeries` must
now remove those null values before resubmitting. This change improves
error handling consistency across the platform and helps developers
identify and fix invalid data structures more quickly.