---
date: ''
title: CORS Support Added for Public API Endpoints
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
---
Enabled CORS (Cross-Origin Resource Sharing) for unauthenticated REST API endpoints by adding the `Access-Control-Allow-Origin` HTTP response header. This ensures consistency with authenticated APIs and allows browser-based applications to access unauthenticated REST API endpoints like public platform metadata.

