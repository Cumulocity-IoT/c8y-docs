---
date:
title: Implemented counting operations creation and updates for usage statistics
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-9vjGQz8Ag
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-60232
version: 10.20.664.0
---
Two new request counters for usage statistics `operationsCreatedCount`, `operationsUpdateCount`, introduced for REST endpoints in an earlier version (10.20.611.0), are now fully implemented. This means that these counters are incremented 
* in case of operationsCreated: when operations are created via REST by POST request on single operation API (`/devicecontrol/opeartions`) or bulk operations API (`/devicecontrol/bulkoperations`).
  * creating bulk operation leads to asynchronously creating individual operations in the background, and {{< product-c8y-iot >}} is counting each created operation individually.
* in case of operationsUpdated: when single operation is updated via REST, or via MQTT standard smartRest static templates (501-507), or via MQTT custom smartRest templates.
  * template 507 can cause multiple operations updates, so each updated operation is counted separately.
