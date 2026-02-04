---
date: '2025-07-03'
title: New SmartREST template for creating parameter update events
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Device management & connectivity
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-4717
version: 2025.210.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
A new SmartREST template has been added. Using the template ID 408, it is now possible to create device parameter update events. The events created always have the type `c8y_ParameterUpdateEvent`. The template has a change detection functionality, so that events are only created if the given state in the event was not already known at the time. 
