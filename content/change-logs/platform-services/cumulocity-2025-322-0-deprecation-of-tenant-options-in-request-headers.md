---
date: '2025-10-02'
title: >-
  Deprecating the attachment of tenant options as headers to microservice
  requests
product_area: Platform services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-64123
version: 2025.341.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Until now, tenant options were attached to each microservice request. The microservice proxy added the tenant options to the request headers and forwarded the request to the respective microservice.
For example, when creating a tenant option in a category that matches the application context path, the value has been passed to the microservice by the microservice proxy on the platform as a header (key => value). 

This functionality is now deprecated. Tenant options will no longer be attached as headers to requests to microservices. The removal is planned for Q1 2026 in CD versions and in the 2027 annual release. The retrieval of the tenant options will remain possible through the endpoint `<TENANT_DOMAIN>/application/currentApplication/settings`.

This change is still disabled by default and can be enabled via a feature toggle `core.ms-proxy.no-tenant-options-in-headers`.

{{< c8y-admon-important >}}
In Q1 2026 for the CD versions and in 2027 for the yearly releases, this change will become **mandatory**. 
{{< /c8y-admon-important >}}
