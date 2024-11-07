---
date: 2024-10-15
title: Microservice SDK updating to Java 17  
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
version: 10.20.134.0
ticket: MTM-59860
---
This is a follow-up on a recent [announcement](https://cumulocity.com/docs/change-logs/?change-type=.change-type-announcement%2C.change-type-api-change#cumulocity-undefined-microservices-sdk-spring-boot3-announcement) about migrating Microservice SDK to Spring Boot 3.
As a first step of this process, starting from version **10.20.134.0**, the Java SDK
and Microservice SDK are now both using Java 17 both on the source as well as the runtime level.
This means that using Java 17 is now a minimum requirement for using the Microservie SDK.
