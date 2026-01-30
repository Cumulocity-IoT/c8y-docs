---
date: '2025-09-04'
title: Delete child references from parents of deleted attachment
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-64344
version: 2025.284.0
---

When an attachment is deleted, the references to this attachment are now also removed from the parent managed objects. This ensures that no leftover references are pointing to non-existent managed objects.
