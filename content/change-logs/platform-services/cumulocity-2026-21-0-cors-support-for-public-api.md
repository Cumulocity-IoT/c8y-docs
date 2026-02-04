---
date: '2026-01-29'
title: CORS support added for public API endpoints
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
ticket: MTM-65672
version: 2026.21.0
environment_availability:
  - label: eu-latest.cumulocity.com
---
CORS (Cross-Origin Resource Sharing) has been enabled for unauthenticated REST API endpoints by adding the `Access-Control-Allow-Origin` HTTP response header. This ensures consistency with authenticated APIs and allows browser-based applications to access unauthenticated REST API endpoints like public platform metadata.

