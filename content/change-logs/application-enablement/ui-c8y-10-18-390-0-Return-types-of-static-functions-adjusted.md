---
date: '2023-12-06'
title: Return types of static functions adjusted
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-54674
version: 10.18.390.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The return types of several static functions of Angular modules have been adjusted. In certain cases this previously caused an error message like "Unable to evaluate this expression statically". This is now resolved.
