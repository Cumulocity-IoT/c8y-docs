---
date: 2023-12-06T15:53:08.842Z
title: New text index
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-54562
version: 10.18.344.0
---
A new text index has been introduced for the GET `/inventory/managedObjects` endpoint. By default it only includes the following fields:

`_id`, `type`, `name`, `owner`, `externalIds`
