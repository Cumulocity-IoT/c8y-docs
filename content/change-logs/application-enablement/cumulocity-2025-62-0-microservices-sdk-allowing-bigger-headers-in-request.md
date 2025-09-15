---
date: 2025-15-09
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
To allow the usage of larger headers in the requests, in microservices SDK we have set the property server.max-http-request-header-size to 24KB. Previous value was 8KB.
