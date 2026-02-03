---
date: '2025-09-18'
title: Increase of max request header size
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Sv2buFZ5I
    label: Microservice SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-64421
version: 2025.62.0
---
To allow the usage of larger headers in requests, the property `server.max-http-request-header-size` has been increased to 24KB in the Microservice SDK. Previously, the value was 8KB.
