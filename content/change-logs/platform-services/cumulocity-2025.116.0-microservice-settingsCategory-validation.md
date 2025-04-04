---
date: 2025-03-31T11:11:24.832Z
title: Added microservice manifest "settingsCategory" validator
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Application enablement & solutions
component:
  - value: component-rlV-4nEfO
    label: Microservice Hosting
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62711
version: 2025.116.0
---
A validation mechanism has been added to the microservice manifest to ensure the correctness of the `settingsCategory` field. [This field](https://cumulocity.com/docs/microservice-sdk/java/#microservice-settings) is used to define a custom category for tenant options where the microservice stores its configuration. The validation enforces that the category must be unique within the context of a tenant.
