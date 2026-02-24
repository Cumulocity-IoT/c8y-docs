---
date: '2026-03-31'
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
---
The asset property list component had a stylesheet that unintentionally made the device protocol creation modal for OPC UA non-functional. The stylesheet has now been targeted more precisely to the asset property list component only. This change ensures that the device protocol creation modal is no longer impacted by the asset property list styles and will function as expected.
