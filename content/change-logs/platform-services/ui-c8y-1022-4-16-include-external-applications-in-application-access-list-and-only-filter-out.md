---
date: '2025-07-10'
title: External applications included in application access list
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64065
version: 1022.4.16
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, the application access list in the Administration application only showed hosted applications, but not external applications. This change now includes external applications in that list as well. This allows administrators to review and manage access rights for external applications in the same way as for hosted applications.
