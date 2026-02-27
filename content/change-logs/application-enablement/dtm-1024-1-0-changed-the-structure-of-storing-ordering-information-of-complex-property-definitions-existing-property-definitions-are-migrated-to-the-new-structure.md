---
date: '2026-02-19'
title: Changed the storage of ordering information of complex property definitions
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-1918
version: 1024.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-19'
  - label: apj.cumulocity.com
    date: '2026-02-25'
  - label: jp.cumulocity.com
    date: '2026-02-25'
---
Previously, the field ordering information for complex property definitions was stored in the `c8y_Order` array. With this update, the ordering is defined directly within each field using the `order` property in the JSON schema. Existing property definitions are automatically migrated to the new structure when the subscribed microservice is updated.
