---
date: ""
title: "Integrate the DTM OpenAPI into the API documentation app"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2841"
version: "1025.6.0"
---
The OpenAPI of DTM is now available in the `API Documentation` app which
shows all known OpenAPI documentations in the current tenant.
Previously, the OpenAPI was only visible in a specific `OpenAPI
Documentation` plugin within the DTM app.

If the `API Documentation` application is not visible in your
Application Switcher, you can deploy it through Administration >
Ecosystem > Extensions > Api-doc by selecting the Deploy Application
button. This change improves discoverability and reduces the setup time
needed to access API documentation across all tenants and users. The
required version of the `api-doc` is 1023.82.1.

The `OpenAPI Documentation` plugin in the DTM app will be deprecated in
the future and users should migrate to the `API Documentation` app.