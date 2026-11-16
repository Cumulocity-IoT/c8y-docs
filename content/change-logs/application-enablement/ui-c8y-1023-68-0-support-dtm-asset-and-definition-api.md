---
date: '2026-04-13'
title: >-
  Digital Twin Manager Asset and Definition API support in asset properties
  selector
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
ticket: MTM-64674
version: 1023.68.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-13'
  - label: apj.cumulocity.com
    date: '2026-04-14'
  - label: jp.cumulocity.com
    date: '2026-04-14'
  - label: emea.cumulocity.com
    date: '2026-04-14'
  - label: us.cumulocity.com
    date: '2026-04-14'
  - label: cumulocity.com
    date: '2026-04-14'
---
Digital Twin Manager enables schema-based modeling in {{< product-c8y-iot >}} by allowing you to create asset definitions that define the structure and constraints for asset instances. The Asset API lets you manage asset instances based on these predefined asset definitions. When you use the asset properties selector, the system now requests the relevant definition for any asset created with Digital Twin Manager and displays the properties from that definition. This ensures that asset instances created from an asset model inherit and display the correct structure and constraints defined in the model. For more information about the Digital Twin Manager API, refer to the [{{< openapi >}}](https://cumulocity.com/api/).
