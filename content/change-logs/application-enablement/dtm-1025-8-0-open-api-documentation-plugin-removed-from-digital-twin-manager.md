---
date: ""
title: "OpenAPI documentation plugin removed from Digital Twin Manager"
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
ticket: "CTM-2840"
version: "1025.8.0"
---
The OpenAPI of DTM is now available in the API Documentation application
which shows all known OpenAPI documentations in the current tenant. The
OpenAPI Documentation plugin in the DTM application is now removedand
users should migrate to the API Documentation application.
If the API Documentation application is not visible in your application
switcher, you can deploy it through **Administration** > **Ecosystem** >
**Extensions** > **api-doc** by selecting the **Deploy application**
button.