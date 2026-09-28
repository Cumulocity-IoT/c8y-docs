---
date: '2024-10-31'
title: Prepare to update Microservice SDK to Spring Boot 3
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
version: 10.20.140.0
ticket: MTM-58822
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
This is a follow-up on a recent [announcement](https://cumulocity.com/docs/change-logs/?change-type=.change-type-announcement%2C.change-type-api-change#cumulocity-undefined-microservices-sdk-spring-boot3-announcement) about migrating the Microservice SDK to Spring Boot 3.

As a second step of this process, starting from version **10.20.140.0**, the Microservice SDK is now using Spring Security 5.8. This change enabled a migration preparing for Spring Security 6.0 to be performed in the Microservice SDK following [these changes](https://github.com/spring-projects/spring-security/releases/tag/5.8.0). We recommend all users of the Microservice SDK to also follow that guide when updating their applications using the updated version of the SDK.

Note that following the changes in the <code>MethodSecurityExpressionHandler</code> configuration, the methods provided by <code>com.cumulocity.microservice.security.service.SecurityExpressionService</code> that were previously configured using a custom <code>SecurityExpressionRoot</code> extension, are now available via an independent bean definition named <code>c8yAuthz</code>. This means that, for example, the expression <code>isCurrentTenantManagement()</code> will no longer resolve and needs to be prefixed by the bean name instead <code>@c8yAuthz.isCurrentTenantManagement()</code>. This allows customers to easily add their own security expression extensions, if needed.
