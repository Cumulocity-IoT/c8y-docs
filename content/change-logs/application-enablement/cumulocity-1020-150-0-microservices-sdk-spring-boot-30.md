---
date: 2024-11-15
title: Microservice SDK updated to Spring Boot 3.0  
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
version: 10.20.150.0
ticket: MTM-58822
---
This is a follow-up on a recent [announcement](https://cumulocity.com/docs/change-logs/?change-type=.change-type-announcement%2C.change-type-api-change#cumulocity-undefined-microservices-sdk-spring-boot3-announcement) about migrating the Microservice SDK to Spring Boot 3.

Starting from version **10.20.150.0**, the Microservice SDK is now using Spring Spring Boot 3.0.x. Please follow the [Spring Boot 3.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide#upgrade-to-spring-boot-3) to upgrade your applications when updating to that or later versions of the SDK. To make the migration process easier we recommend first updating to version **10.20.134.0** with JDK 17 and later to version **10.20.140.0** with Spring Security configuration changes, if it was not already done.
