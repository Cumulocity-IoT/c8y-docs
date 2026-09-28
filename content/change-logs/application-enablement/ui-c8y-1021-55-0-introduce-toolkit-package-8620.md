---
date: '2025-04-10'
title: Introduced new toolkit package
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
ticket: MTM-62797
version: 1021.55.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
As part of our ongoing efforts to improve the developer experience, we have published a new [@c8y/toolkit npm package](https://www.npmjs.com/package/@c8y/toolkit). This package for now only provides functionality for deploying applications or packages to a {{< product-c8y-iot >}} instance, but might be extended further. 
The advantage of this package over the already existing `ng deploy` command is that is does not come with a dependency on Angular, making it more lightweight and ideal to use in, for example, a CI/CD pipeline.
