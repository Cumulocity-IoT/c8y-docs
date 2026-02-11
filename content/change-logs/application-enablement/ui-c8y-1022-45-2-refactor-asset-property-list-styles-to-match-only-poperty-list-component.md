---
date: '2025-10-30'
title: >-
  Refactored asset property list styles to avoid affecting device protocol
  creation
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64972
version: 1022.45.2
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The asset property list component had a stylesheet that unintentionally made the device protocol creation modal for OPC UA non-functional. The stylesheet has now been targeted more precisely to the asset property list component only. This change ensures that the device protocol creation modal is no longer impacted by the asset property list styles and will function as expected.
