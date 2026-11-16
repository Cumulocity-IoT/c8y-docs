---
date: '2024-03-14'
title: >-
  Editing smart rules from the application context no longer displays alert
  message
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-53381
version: 10.19.6.11
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Fixed an UI error that occurred when editing a smart rule from the application context. This fix prevents sending a request with a wrong managed object ID and then displaying an alert message.
