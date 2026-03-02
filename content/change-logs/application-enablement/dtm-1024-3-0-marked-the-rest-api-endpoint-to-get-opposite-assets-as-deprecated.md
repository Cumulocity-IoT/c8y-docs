---
date: ""
title: "Marked the REST API endpoint to get opposite assets as deprecated"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-2c7RdTdXo4"
      label: "Improvement"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2681"
version: "1024.3.0"
---
In the REST API, the endpoint to query the opposite assets using the
default 'Accept' header 'application/json' is deprecated and will be
removed in a future version. Please use the 'Accept' header
'application/vnd.com.nsn.cumulocity.linkedassetscollection+json' instead
which offers better performance and filter parameters.