---
date: '2023-12-06'
title: Creation of measurement fragments with not allowed characters prevented
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2782
version: 10.18.494.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In device protocols, users can no longer create measurement fragments (<b>Measurement type</b> and <b>Measurement series</b> fields) which contain characters that are not allowed by the Measurements API.
