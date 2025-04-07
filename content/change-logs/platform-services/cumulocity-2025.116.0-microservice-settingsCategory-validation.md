---
date: 
title: Added microservice manifest "settingsCategory" validator
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
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
A validation mechanism has been added to the microservice manifest to ensure the correctness of the `settingsCategory` field. [This field](https://cumulocity.com/docs/microservice-sdk/java/#microservice-settings) defines a custom category for tenant options where the microservice stores its configuration. The validation enforces that the category must be unique within the context of a tenant. This enhancement is part of a broader security improvement: it ensures that only the microservice user who owns a category can read and decrypt the matching tenant options. By enforcing uniqueness, the platform prevents potential overlaps or conflicts between microservices, strengthening isolation and access control of sensitive configuration data.
