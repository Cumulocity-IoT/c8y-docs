---
date: 2024-06-10T14:53:24.832Z
title: Removal of Microservice API version 1 in Cumulocity SaaS instances and next yearly release 2025
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Application enablement & solutions
component:
  - value: component-rlV-4nEfO
    label: Microservice Hosting
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-45788
version: 10.20.423.0    
---
As published earlier (in the release notes for release 10.15), {{< company-c8y >}} has announced the availability of Microservice API version 2 and the deprecation of API version 1 to comply with new security requirements. Microservice API version 2 provides an improved microservice container security context restricting the invocation of privileged Linux Kernel APIs. Today {{< company-c8y >}} announces the creation of alarms when subscribing a tenant to microservices still using API version 1. In Q3 2024 Microservice API version 1 will be removed from {{< product-c8y-iot >}} SaaS instances and in the yearly 2025 release. If not done yet migrate your microservices to API version 2. Refer to [Microservice migration to API version 2](/microservice-sdk/general-aspects/#migration) in the user documentation to understand how to accomplish this. Otherwise your microservices in {{< product-c8y-iot >}} SaaS instances may stop functioning in Q3 2024 or in environments using the yearly 2025 release.
