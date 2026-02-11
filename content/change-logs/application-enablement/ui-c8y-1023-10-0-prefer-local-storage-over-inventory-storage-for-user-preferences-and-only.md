---
date: '2025-12-12'
title: User preferences now retrieved from local storage
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
ticket: MTM-65477
version: 1023.10.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, there was an issue in the retrieval logic of the user preferences. For affected users, the user preferences were correctly stored in the local storage, but the retrieval logic only looked for corresponding values in the inventory. This issue has been fixed, and user preferences are now retrieved from the local storage with the inventory storage as fallback.
This caused the stored user preferences to not take any effect for certain users.
