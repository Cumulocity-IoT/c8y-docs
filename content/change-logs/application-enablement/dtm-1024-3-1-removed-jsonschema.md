---
date: '2026-03-19'
title: Improved JSON schema structure in asset models
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
ticket: ''
version: 1024.3.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-19'
  - label: apj.cumulocity.com
    date: '2026-03-25'
  - label: jp.cumulocity.com
    date: '2026-03-25'
  - label: emea.cumulocity.com
    date: '2026-03-30'
  - label: us.cumulocity.com
    date: '2026-03-30'
---
The unnecessary `$schema` elements have been removed from all properties in the asset definition and other type definitions. Properties now follow the correct JSON Schema structure, with the `$schema` declaration appearing only at the document level where appropriate. This ensures that asset models conform to proper JSON schema standards and eliminates potential validation errors.

Existing asset models and type definitions work correctly without any action required. The fix improves the structural integrity of your definitions and ensures compliance with JSON schema specifications.

For details, see [Asset models](/dtm/asset-types/).
