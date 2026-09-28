---
date: '2023-12-06'
title: Refresh interval keeps configured value in map widget configuration
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-55280
version: 10.18.483.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
When opening a map widget configuration, the refresh interval was accidentally reset to 5s. This has been fixed and the refresh interval keeps the value previously configured.
