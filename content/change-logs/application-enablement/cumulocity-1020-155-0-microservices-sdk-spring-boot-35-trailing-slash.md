---
date: 2025-01-31
title: Trailing slash usage in requests deprecated after Spring Boot update in Microservices SDK
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
ticket: MTM-61583
---
As previously [announced](https://cumulocity.com/docs/change-logs/?change-type=.change-type-announcement%2C.change-type-api-change#cumulocity-undefined-microservices-sdk-spring-boot3-announcement), starting with version **10.20.150.0**, the microservices SDK uses Spring Boot 3. The Spring Boot update introduced numerous changes to the microservices SDK and subsequently to the microservices using it. Among these changes is the deprecation of the trailing slash when requesting a microservice. 

This change affects not only custom microservices, but also Cumulocity provided microservices and the way they are accessed, for example smartrule.

**CHANGES** REST calls to microservices, including Cumulocity provided microservices (e.g., smartrule), must remove the undocumented usage of a trailing slash, if any. Until now such REST calls have been tolerated by Cumulocity, but with the Spring Boot update, this behavior has changed and similar requests are now rejected.

For details refer to the [Spring Boot 3.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide#spring-mvc-and-webflux-url-matching-changes).

