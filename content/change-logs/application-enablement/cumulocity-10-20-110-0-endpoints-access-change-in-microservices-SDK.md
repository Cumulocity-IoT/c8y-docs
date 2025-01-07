---
date: 2024-06-27
title: Restricting access to Spring Boot actuator endpoints
product_area: Application enablement & solutions
change_type:
  - value: change-3BQrQ6adS
    label: API Change
component:
  - value: component-Sv2buFZ5I
    label: Microservice SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-58316
version: 1020.111.0
---
Improving the security for the Microservice SDK we have decided to restrict the initial configuration of the Spring Boot actuator endpoints (POST access to the `/loggers` endpoint) to the administrator roles only.
