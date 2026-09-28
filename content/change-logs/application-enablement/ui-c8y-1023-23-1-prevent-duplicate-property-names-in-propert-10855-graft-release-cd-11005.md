---
date: '2026-02-05'
title: >-
  Duplicate name validation added to prevent duplicate tenant custom property
  names
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
ticket: MTM-65556
version: 1023.23.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-05'
  - label: apj.cumulocity.com
    date: '2026-02-05'
  - label: jp.cumulocity.com
    date: '2026-02-05'
  - label: emea.cumulocity.com
    date: '2026-02-06'
  - label: us.cumulocity.com
    date: '2026-02-06'
  - label: cumulocity.com
    date: '2026-02-06'
---
Previously, users could save multiple properties with the same name in the property library (tenant custom properties), resulting in only one property with that name being displayed on the tenant's **Custom properties** tab. Duplicate name validation has been added to the name field, showing an error when a property with the same name already exists and disabling the save button until a unique name is provided.
