---
date: ""
title: "Improved error feedback when trying to create an Asset Definition on a subtenant of an enterprise tenant using the Assets REST API"
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
Previously, the error message returned from the RestAPI when creating or updating asset definitions on a subtenant of an enterprise tenant was generic and did not include tenant IDs. The error message now includes the relevant tenant IDs.