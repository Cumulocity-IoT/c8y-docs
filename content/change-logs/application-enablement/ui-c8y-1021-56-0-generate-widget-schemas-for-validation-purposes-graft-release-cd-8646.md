---
date: '2025-04-10'
title: >-
  Generating schemas from TypeScript types and interfaces in application build
  process
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
It is now possible to generate schemas from TypeScript types and interfaces in your project, which can then be imported during runtime. A custom webpack plugin makes this functionality possible by collecting all types imported with the `c8y-schema-loader` prefix during the application build process. The enhancement enables runtime validation capabilities, such as validating widget configurations (since TypeScript types are not retained in the built application). This supports upcoming advanced features such as dashboard export and import.
