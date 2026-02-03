---
date: 2023-12-06T10:39:59.721Z
title: Improved query behavior
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-52969
version: 10.18.54.0
---
REST APIs no longer return the <code>totalPages</code> value if no query criteria are provided.
