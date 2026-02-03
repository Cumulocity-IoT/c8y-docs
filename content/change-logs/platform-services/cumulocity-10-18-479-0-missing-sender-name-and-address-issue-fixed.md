---
date: 2023-12-06
title: Missing sender name and address issue fixed
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-lWeHt1rgA
    label: SMS microservice
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-56027
version: 10.18.479.0
---
The sender name and address were missing when sending a request to the SMS gateway with the TFA code. This issue has been resolved. The sender name and address are now retrieved from the tenant option configuration.
