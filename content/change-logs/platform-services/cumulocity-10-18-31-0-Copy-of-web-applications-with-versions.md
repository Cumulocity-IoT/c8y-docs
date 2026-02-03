---
date: '2023-12-06'
title: Copy of web applications with versions
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Platform services
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-47717
version: 10.18.31.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
It is now possible to copy web applications with versions (packages) and web applications with SHARED availability. For applications with versions, by default the application with the “latest” tag is copied. The new application has a single version and no tags. If you want to copy different versions of an application, you can specify the query parameters “tag” or “version” (only a single version). For details, refer to the [{{< openapi >}}](http://cumulocity.com/api/).
