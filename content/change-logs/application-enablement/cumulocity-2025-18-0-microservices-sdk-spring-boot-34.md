---
date: 2024-12-02
title: Microservice SDK updated to Spring Boot 3.4
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Application enablement & solutions
component:
  - value: component-Sv2buFZ5l
    label: Microservice SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
version: 10.20.155.0
ticket: MTM-62462
---
Starting from version **2025.18.0**, the Microservice SDK is now using Spring Boot 3.4.x. 
Notice that along Spring Boot, most other dependencies were also updated already to be consistent to 
the dependencies which Spring Boot uses.

We are pleased to announce an upcoming update to the Spring Boot version used in the Microservice SDK. 
The new version will be Spring Boot 3.4.2.
The version 2025.18.0 will also bring along updates to several third-party libraries and frameworks.
These changes will be included in the org.springframework.boot:spring-boot-dependencies:3.4.2 which comes 
as dependency to Microservice SDK.

**Impact**: Each of these updates may impact your microservices, potentially requiring code changes.

**Rollout**: The update will be available in Continuous Deployment (CD) versions starting in Q2 2025
and in versions of the next annual release 2025.

**Migration Resources**: Refer to the following guides for assistance with the changes:

* [Spring Boot 3.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.4-Release-Notes)

* [Spring Framework 6.2 What's New](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes)
