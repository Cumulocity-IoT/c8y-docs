---
date: ""
title: "Write an audit record when a tenant's measurement processing changes"
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
ticket: "CTM-3292"
version: "2.1.0"
---
When an administrator changes the measurement processing of the DTM Data Service, the service writes a record to the tenant's audit log (Administration > Audit logs). The record has the activity "Measurement processing changed" and names the user and the previous and new setting.
