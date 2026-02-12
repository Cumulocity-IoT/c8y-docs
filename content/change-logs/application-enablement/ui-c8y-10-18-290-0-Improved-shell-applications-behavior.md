---
date: '2023-12-06'
title: Improved shell applications behavior
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-53695
version: 10.18.290.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Shell applications now wait with their initial navigation until all plugins have been loaded. This allows,
 for example, to directly navigate via a link to a route which is provided by a plugin.
