---
date: '2026-03-31'
title: Upgraded Jetty in Java SDK to version 12
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: QWPx3rFfn
    label: Java SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62874
version: 2025.72.0
---

The Jetty library version in the Java SDK was upgraded from version 11.0.24 to the most recent version 12.0.25. 
This version is compatible with the current Spring Boot version 3.5.5 in the Java SDK.
No impact is expected on microservice code using standard Microservice SDK features.
For microservices that use advanced customization of the Jetty server configuration we would advise referring to the official 
 [migration guide from Jetty 11.0.x to Jetty 12.0.x ](https://jetty.org/docs/jetty/12.1/programming-guide/migration/11-to-12.html).


