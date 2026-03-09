---
date: ""
title: "Improved error message returned from the REST API on creating or updating asset definitions from a subtenant
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
ticket: "CTM-2740"
version: "1024.2.0"
---
Previously, the error message returned from the REST API when trying to create or update asset definitions on a subtenant of an {{< enterprise-tenant >}} was generic and did not include tenant IDs. The error message now includes the relevant tenant IDs.