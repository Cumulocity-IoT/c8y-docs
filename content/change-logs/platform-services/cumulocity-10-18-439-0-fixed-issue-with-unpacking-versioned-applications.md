---
date: '2023-12-06'
title: Fixed issue with unpacking versioned applications
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-53724
version: 10.18.439.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Resolved the issue that versioned applications might not be unpacked upon core startup, which resulted in a 404 error for some requests.
