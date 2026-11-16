---
date: '2024-12-02'
title: Microservice SDK updated to Spring Boot 3.3
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
ticket: MTM-61583
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
This is a follow-up on a recent [announcement](https://cumulocity.com/docs/change-logs/?change-type=.change-type-announcement%2C.change-type-api-change#cumulocity-undefined-microservices-sdk-spring-boot3-announcement) about migrating the Microservice SDK to Spring Boot 3.

Starting from version **10.20.155.0**, the Microservice SDK is now using Spring Spring Boot 3.3.x, which marks the end of the recent dependency updates published in quick succession. Notice that along Spring Boot, most other dependencies were also updated to eliminate all security vulnerabilities those dependencies had.

Because of the amount of changes we also published intermediate versions to help with the upgrade process of all the applications using the SDK.

Version **10.20.150.1** contains a fix for the previously announced version **10.20.150.0** for applications configuring additional servlets. Use this version when updating your application to Spring Boot 3.0. For details refer to the [Spring Boot 3.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide#upgrade-to-spring-boot-3).

Version **10.20.151.1** is based on Spring Boot 3.1 and is recommended as an intermediate step to limit the amount of changes done at once. For details refer to the [Spring Boot 3.1 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.1-Release-Notes).

Version **10.20.153.1** is based on Spring Boot 3.2 and is another recommended intermediate step. For details refer to the [Spring Boot 3.2 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.2-Release-Notes).


Finally, when upgrading to version **10.20.155.0** based on Spring Boot 3.3, refer to the [Spring Boot 3.3 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.3-Release-Notes).
