---
date: '2024-12-12'
title: >-
  Measurement series endpoint returns an error if the series contains more than
  one dot
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
ticket: MTM-59277
version: 10.20.591.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Property names used for fragment and series must not contain whitespaces nor special characters (https://cumulocity.com/api/core/#operation/postMeasurementCollectionResource).
Previously, the `/measurement/measurements/series` endpoint accepted a `series` query parameter which contained more than one dot, although it returned an empty response.
With this change the endpoint returns a `422` error if the `series` query parameter contains more than one dot.
