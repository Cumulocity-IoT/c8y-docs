---
date: ""
title: "Improved examples & added missing response code in the API documentation for creating Asset Definitions"
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
ticket: "CTM-3210"
version: "1025.17.0"
---
The example in the Asset Definition API documentation referenced
definitions that do not exist on new tenants, causing HTTP 409 errors
when users tried to follow the example. The example now creates the
Asset Definition for `c8y_Windturbine` first and uses only library
Property Definitions, ensuring the example succeeds on any tenant.

The documentation now also includes the HTTP 409 response code and
additional request examples for the POST
`/service/dtm/definitions/assets` endpoint. These improvements help you
understand the full range of responses and successfully create Asset
Definitions without encountering unexpected errors.