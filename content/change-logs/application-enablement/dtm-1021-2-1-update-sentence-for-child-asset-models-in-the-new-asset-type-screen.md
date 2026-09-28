---
date: '2025-04-03'
title: Improved info message when no child asset models are selected
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
ticket: CTM-1051
version: 1021.2.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, if no child asset models were selected while creating or updating an asset model, the message "No allowed child assets" was displayed, which was misleading. To enhance clarity, the message has been updated to "No allowed child asset models selected", ensuring better alignment with the field's purpose and reducing potential confusion.
