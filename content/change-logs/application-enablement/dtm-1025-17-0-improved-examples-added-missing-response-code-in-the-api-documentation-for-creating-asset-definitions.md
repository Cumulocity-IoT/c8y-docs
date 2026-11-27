---
date: '2026-11-19'
title: >-
  Improved examples & added missing response code in the API documentation for
  creating asset definitions
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
ticket: CTM-3210
version: 1025.17.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-19'
  - label: apj.cumulocity.com
    date: '2026-11-20'
  - label: jp.cumulocity.com
    date: '2026-11-20'
  - label: us.cumulocity.com
    date: '2026-11-23'
  - label: cumulocity.com
    date: '2026-11-23'
---
Previously, the example in the Asset API documentation referenced definitions (for example,
`c8y_Windturbine`) that do not exist on new tenants, causing HTTP 409 errors when users tried to follow the example. Now, the example creates the asset definition for `c8y_Windturbine` first and uses only existing library property definitions, ensuring the example succeeds on any tenant.

The Asset API documentation now also includes the HTTP 409 response code and additional request examples for the POST `/service/dtm/definitions/assets` endpoint. These improvements help you understand the full range of responses and successfully create asset definitions without encountering unexpected errors.
