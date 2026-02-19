---
date: '2026-01-13'
title: Asset API tolerates invalid or mis-encoded characters
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
ticket: CTM-2632
version: 1023.3.2
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
    date: '2026-02-04'
  - label: jp.cumulocity.com
    date: '2026-02-04'
  - label: emea.cumulocity.com
    date: '2026-02-09'
  - label: us.cumulocity.com
    date: '2026-02-09'
  - label: cumulocity.com
    date: '2026-02-10'
---
Previously, some requests to the Asset API failed due to mis-encoded characters in the JSON request body. This issue has been fixed and such characters are now stripped from the body.
