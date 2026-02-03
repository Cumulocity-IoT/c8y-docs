---
date: 2024-04-04
title: Fixed issue with SMS requests to Bics provider
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OwVpu2mA6
    label: SMS microservice
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-3176
version: 10.20.135.0
---
Outgoing SMS requests to the Bics SMS provider contained an incorrectly formatted request body. The content-type was corrected to "application/json" as required by the Bics API to be able to correctly send SMS with this provider.
