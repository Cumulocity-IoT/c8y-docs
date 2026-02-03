---
date: 2025-03-14
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
version: 2025.18.0
ticket: MTM-62462
---
Starting from version **2025.18.0**, the Microservice SDK is now using Spring Boot 3.4.2. 
Notice that along with Spring Boot, most other dependencies were also updated to be consistent to 
the dependencies which Spring Boot uses.

The version 2025.18.0 will also bring along updates to several third-party libraries and frameworks.
These changes will be included in the org.springframework.boot:spring-boot-dependencies:3.4.2 dependency 
which comes with Microservice SDK.

**Impact**: The update may impact your microservices, potentially requiring code changes.

**Migration Resources**: Refer to the following guides for assistance with the changes:

* [Spring Boot 3.4 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.4-Release-Notes)

* [Spring Framework 6.2 What's New](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-6.2-Release-Notes)
