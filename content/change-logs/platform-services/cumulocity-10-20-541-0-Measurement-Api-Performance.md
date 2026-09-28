---
date: '2024-09-11'
title: Improved performance of Measurement API
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-60142
version: 10.20.541.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

The performance of the `GET /measurement/measurements` endpoint when filtering by both `valueFragmentType` and `valueFragmentSeries` has been improved.
