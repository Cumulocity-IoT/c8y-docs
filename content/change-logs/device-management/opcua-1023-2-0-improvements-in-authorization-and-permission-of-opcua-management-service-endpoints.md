---
date: '2026-05-04'
title: >-
  Improvements in authorization and permission of OPCUA management service
  endpoints
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-5342
version: 1023.2.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-04'
  - label: apj.cumulocity.com
    date: '2026-05-06'
  - label: jp.cumulocity.com
    date: '2026-05-06'
  - label: us.cumulocity.com
    date: '2026-05-11'
---
To improve security and access control for the OPC UA management service, permission requirements have been clarified and enforced for all management API endpoints. Users now need specific OPC UA permissions to interact with the service. To view OPC UA resources — such as device types, OPC UA server configurations, address space nodes, and search results — users require the OPC UA READ permission. To create, update, or delete device types, server configurations, or device type mapping entries, users require the OPC UA ADMIN permission. Administrators can assign the necessary OPC UA permissions to users under **Administration > Accounts > Users, Roles**.
