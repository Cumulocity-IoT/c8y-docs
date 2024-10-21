---
date: 2024-10-04
title: Upcoming Spring Boot version update for Microservice SDK  
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
---
We are pleased to announce an upcoming update to the Spring Boot version used in the Microservice SDK. The new version will be Spring Boot 3.3.3, which will also bring updates to several third-party libraries and frameworks. These mandatory changes will include:

* Minimum required Java version: **17** (currently Java 8)

* Jakarta EE 9+ baseline

* Spring Security: **6.3.3**

* Spring Framework: **6.1.12** (currently 5.3.24)

* HTTP Client: **5.3.1**

**Impact**: Each of these updates may impact your microservices, potentially requiring code changes.

**Rollout**: The update will be available in Continuous Deployment (CD) versions starting in Q4 2024 and in versions of the next annual release 2025. A separate announcement will be made to confirm the CD version containing the change.

**Migration Resources**: Refer to the following guides for assistance with the changes:

* [Spring Boot 3.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide)

* [Spring Security 6.0 Migration Guide](https://docs.spring.io/spring-security/reference/6.0/migration/index.html)

* [Spring Framework 6.x What's New](https://github.com/spring-projects/spring-framework/wiki/What%27s-New-in-Spring-Framework-6.x)

* [HTTP Client Migration Guide](https://hc.apache.org/httpcomponents-client-5.3.x/migration-guide/index.html)
