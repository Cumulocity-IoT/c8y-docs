---
date: '2026-07-21'
title: Tenant options are not attached as request headers by microservices proxy 
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
ticket: MTM-66671 
version: 2026.230.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The deprecation of attaching microservices' tenant options as request headers by the microservices proxy was under [Public Preview](/change-logs/?change-type=.change-type-announcement#cumulocity-2025-322-0-deprecation-of-tenant-options-in-request-headers), and is now Generally Available (GA) for CD versions 2026.230.0 and higher, and will be present in the 2027 annual release.

Until now, tenant options were attached to each microservice request unless this functionality was explicitly disabled via a feature toggle. The microservice proxy added the tenant options to the request headers and forwarded the request to the respective microservice. This functionality is now disabled per default. Tenant options are longer be attached as headers to requests to microservices. The retrieval of the tenant options remains possible through the endpoint <TENANT_DOMAIN>/application/currentApplication/settings.

This change is now available by default. The old behaviour can still be enabled via the feature toggle `core.ms-proxy.no-tenant-options-in-headers`.

{{< c8y-admon-caution >}}
Migration from Public Preview to General Availability - action required.
If you are relying on the attachment of tenant options as headers to the microservice requests, you need to change this behaviour respectively for cumulocity core CD versions higher than 2026.230.0 and 2027 annual release.
{{< /c8y-admon-caution >}}
