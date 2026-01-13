---
date: ""
title: "Ensure Asset API tolerates invalid or mis-encoded characters."
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
ticket: "CTM-2632"
version: "1023.3.2"
---
Previously, some control characters or unencoded special characters in the JSON body of a request caused failures in the Asset API. This had been fixed and such characters are now stripped from the body.
