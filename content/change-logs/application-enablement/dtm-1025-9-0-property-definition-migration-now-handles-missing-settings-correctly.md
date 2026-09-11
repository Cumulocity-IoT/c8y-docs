---
date: '2026-08-18'
title: Property definition migration now handles missing settings correctly
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-3083
version: 1025.9.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-18'
  - label: apj.cumulocity.com
    date: '2026-08-19'
  - label: jp.cumulocity.com
    date: '2026-08-19'
  - label: us.cumulocity.com
    date: '2026-08-20'
  - label: cumulocity.com
    date: '2026-08-20'
---
In specific scenarios, property library definitions failed to migrate
during startup when required settings were not present. The loading of
the settings at startup is fixed now, allowing property definitions to
migrate successfully without errors.

This fix ensures that existing installations with legacy property
definitions can upgrade without encountering startup errors. All tenants
and applications using property definitions benefit from improved
reliability during system initialization.
