---
date: '2025-09-04'
title: >-
  Fixed broken edit button in Asset Properties widget when displaying nested
  properties
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61692
version: 1022.21.6
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when adding a nested property containing a dot in its name to the "Asset properties" widget configuration, the edit button was broken, preventing users from modifying the asset properties. This issue has been resolved. The "Asset properties" widget correctly displays nested properties, and the edit button remains functional, enabling users to edit asset properties as expected.
