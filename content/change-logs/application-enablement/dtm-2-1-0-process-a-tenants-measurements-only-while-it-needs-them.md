---
date: ""
title: "Process a tenant's measurements only while it needs them"
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
The DTM Data Service now processes a tenant's measurements only while the tenant has data points linked to a source device. It turns on within seconds of the first link and turns off a few minutes after the last link is removed. Measurements received while it is off are not propagated later. Administrators can check the state and turn it on or off in the Data Points plugin, see [Managing the service](/dtm/dtm-data-service/#enable-measurement-propagation).
