---
date: '2026-06-17'
title: DTM OpenAPI is available in the API Documentation app
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2841
version: 1025.6.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-06-17'
  - label: apj.cumulocity.com
    date: '2026-06-18'
  - label: jp.cumulocity.com
    date: '2026-06-18'
  - label: us.cumulocity.com
    date: '2026-06-19'
  - label: cumulocity.com
    date: '2026-06-19'
---
The OpenAPI of DTM is now available in the API Documentation application which
shows all known OpenAPI documentations in the current tenant.
Previously, the OpenAPI was only visible in a specific OpenAPI
Documentation plugin within the DTM application.

If the API Documentation application is not visible in your
application switcher, you can deploy it through **Administration** >
**Ecosystem** > **Extensions** > **api-doc** by selecting the **Deploy application**
button. This change improves discoverability and reduces the setup time
needed to access API documentation across all tenants and users. The
required version of the `api-doc` is 1023.82.1.

The OpenAPI Documentation plugin in the DTM application will be deprecated in
the future and users should migrate to the API Documentation application.
