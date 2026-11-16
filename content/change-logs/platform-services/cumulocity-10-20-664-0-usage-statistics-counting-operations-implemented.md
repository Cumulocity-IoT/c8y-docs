---
date: '2025-01-30'
title: Implemented operation creation and update counters for usage statistics
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Two new request counters for usage statistics `operationsCreatedCount`, `operationsUpdateCount`, introduced for REST endpoints in an earlier version (10.20.611.0), are now fully implemented. These counters are incremented in the following way:
* operationsCreated: When operations are created via REST by POST request on a single operations API (`/devicecontrol/operations`) or the bulk operations API (`/devicecontrol/bulkoperations`).
  * Creating bulk operations leads to asynchronously creating individual operations in the background, and {{< product-c8y-iot >}} is counting each created operation individually.
* operationsUpdated: When a single operation is updated via REST, or via MQTT standard SmartREST static templates (501-507), or via MQTT custom SmartREST templates.
  * Template 507 can cause multiple operations updates, so each updated operation is counted separately.
