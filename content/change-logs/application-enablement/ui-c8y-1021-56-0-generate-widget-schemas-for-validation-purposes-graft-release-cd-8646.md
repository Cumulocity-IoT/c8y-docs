---
date: ""
title: Generate schemas from types and interfaces in build process
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62204
version: 1021.56.0
---
This feature allows to generate schema from types and interfaces from project and then import them later in runtime. It is possible thanks to custom webpack plugin that collects all the types imported with prefix `c8y-schema-loader` during app build process. It opens possibility to e.g. validating widget configuration in runtime (Typescript types are not present in built app).