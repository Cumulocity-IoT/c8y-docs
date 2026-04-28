---
date: '2026-04-24'
title: Full export disabled for users with inventory rights only
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
ticket: MTM-66010
version: 1023.74.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-24'
  - label: apj.cumulocity.com
    date: '2026-04-27'
  - label: jp.cumulocity.com
    date: '2026-04-27'
---
The `Full export` option is now disabled for users who only have inventory rights. Previously, data could be exported without even an error message being displayed in the UI. This issue is now fixed.
