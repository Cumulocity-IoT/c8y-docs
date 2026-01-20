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
Added the `Access-Control-Allow-Origin` header to responses from unauthenticated API endpoints to ensure proper Cross-Origin Request support, aligning them with existing authenticated APIs.

