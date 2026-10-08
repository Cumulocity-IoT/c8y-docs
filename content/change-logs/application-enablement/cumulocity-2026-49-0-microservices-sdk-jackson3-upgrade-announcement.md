---
date:
title: Upcoming Jackson version 3 upgrade for Microservice SDK
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
ticket: MTM-67375
version: 2026.49.0
---

When the Microservice SDK was upgraded from Spring Boot 3 to Spring Boot 4, the Jackson library was kept at version 2 to minimize required changes to applications. 

Starting with Microservice SDK version **2026.49.0**, the Jackson library used in the SDK will be upgraded to version 3.1.4. Spring Boot 4 uses Jackson 3 by default.

When the SDK was upgraded from Spring Boot 3 to Spring Boot 4, Jackson was kept at version 2 to minimize required changes to applications.

**Impact**: The upgrade to Jackson 3 requires changes in existing microservices. Most notably, the Maven group ID and Java package names change from `com.fasterxml.jackson` to `tools.jackson`. Jackson annotations (`com.fasterxml.jackson.annotation`) keep their package name.

You do not need to declare Jackson versions explicitly. They are managed by Spring Boot's `tools.jackson:jackson-bom` and inherited through the `microservice-dependencies` BOM.

**Migration resources**: Refer to the [Jackson 3 Migration Guide](https://github.com/FasterXML/jackson/blob/main/jackson3/MIGRATING_TO_JACKSON_3.md) for detailed instructions.
