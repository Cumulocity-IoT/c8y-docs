---
date: ""
title: "Per-tenant settings of the DTM Data Service kept in one managed object"
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
ticket: "CTM-3297"
version: "2.1.0"
---
The DTM Data Service now keeps the settings that apply to individual tenants, such as the fan-out limit per incoming measurement and whether a tenant's measurements are processed, in one managed object of type `c8y_DtmDataSettings` in the management tenant. All instances of the service read it every 30 seconds, so a change applies without a restart.
