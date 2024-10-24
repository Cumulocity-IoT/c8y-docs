---
date: 2023-12-06T15:47:31.897Z
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
---
It is now possible to copy web applications with versions (packages) and web applications with SHARED availability. For applications with versions, by default the application with the “latest” tag is copied. The new application has a single version and no tags. If you want to copy different versions of an application, you can specify the query parameters “tag” or “version” (only a single version). For details, refer to the [{{< openapi >}}](http://cumulocity.com/api/).
