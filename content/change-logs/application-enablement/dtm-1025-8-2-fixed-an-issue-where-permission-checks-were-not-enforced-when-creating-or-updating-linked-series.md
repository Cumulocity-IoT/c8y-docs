---
date: ""
title: "Enforced permission checks when creating or updating linked series"
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
ticket: "CTM-3082"
version: "1025.8.2"
---
Permission checks have been enforced for linked series create and update
operations. Previously, permission checks were not performed, allowing
linked series to be created or updated without the required
authorization.