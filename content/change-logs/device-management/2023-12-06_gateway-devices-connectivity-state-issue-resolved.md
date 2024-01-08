---
date: 2023-12-06T11:45:06.705Z
title: Gateway devices connectivity state issue resolved
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
technical_component:
  - value: tc-QHwMfWtBk7
    label: cumulocity
jira: DM-2037
version: 10.18.50.0
---
In case of bad connectivity or network delay gateway devices could go to a state where they were disconnected. This resulted in operation execution being suspended. This issue is now resolved.
