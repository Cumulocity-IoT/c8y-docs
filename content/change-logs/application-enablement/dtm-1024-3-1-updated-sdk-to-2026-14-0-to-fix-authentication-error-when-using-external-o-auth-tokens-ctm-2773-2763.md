---
date: ""
title: "Updated SDK to 2026.14.0 to fix authentication error when using external OAuth tokens [CTM-2773] (#2763)"
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
ticket: "CTM-2773"
version: "1024.3.1"
---
Previously, the REST API returned the error `Invalid Credentials!` when
accessed with an external OAuth token. This has been fixed now.