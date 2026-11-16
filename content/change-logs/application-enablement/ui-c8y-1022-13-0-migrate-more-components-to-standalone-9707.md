---
date: '2025-08-14'
title: Migrated additional Angular components to standalone mode
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
ticket: MTM-64389
version: 1022.13.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
As part of our ongoing efforts to improve the modularity and maintainability of the Web SDK, we have migrated more components to operate in standalone mode. This change involves updating the architecture and dependencies of these components. Users should not experience any functional differences, as the migrated components will continue to operate as before. Developers using the Web SDK are now able to import more components directly without having to import the whole module.

The angular modules provided by the Web SDK will continue to exist. A future release might deprecate them in favor of using the standalone components directly.
