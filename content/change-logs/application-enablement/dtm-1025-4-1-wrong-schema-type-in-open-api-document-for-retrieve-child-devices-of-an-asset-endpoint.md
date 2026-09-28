---
date: '2026-05-19'
title: >-
  Fixed schema type for retrieval of child devices of an asset in OpenAPI
  documentation
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
ticket: CTM-2682
version: 1025.4.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-19'
  - label: apj.cumulocity.com
    date: '2026-05-18'
  - label: jp.cumulocity.com
    date: '2026-05-18'
  - label: us.cumulocity.com
    date: '2026-05-19'
  - label: cumulocity.com
    date: '2026-05-19'
---
The OpenAPI specification for the retrieval of child devices of an asset previously displayed an incorrect schema type that did not match the actual response structure. The [endpoint](https://cumulocity.com/api/dtm/#tag/Assets/operation/getChildDevices) now correctly shows a paginated list of devices as the response schema, providing accurate documentation that reflects the actual data returned.

This fix ensures that developers using the OpenAPI specification to generate client code or understand the API response structure receive accurate type information. Your existing API calls continue to work without any changes, and the corrected documentation now matches the actual behavior of the endpoint.
