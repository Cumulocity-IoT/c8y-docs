---
date: '2024-10-17'
title: >-
  Support self-scoped plugins for applications cloned to a different context
  path
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
ticket: MTM-60850
version: 1020.26.3
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when cloning an application to a different context path, the self-scoped plugins within that application would not load. With this change, the self-scoped plugins are now loading as expected.
